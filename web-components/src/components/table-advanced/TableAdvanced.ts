/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/menu-overlay/MenuOverlay";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusTrapMixin } from "@/mixins/FocusTrapMixin";
import reset from "@/wc_scss/reset.scss";
import { nothing, TemplateResult } from "lit-html";
import "@/components/button/Button";
import { html, internalProperty, LitElement, property, queryAll, PropertyValues } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { templateContent } from "lit-html/directives/template-content";
import Papa from "papaparse";
import styles from "./scss/module.scss";
import { debounce, Evt, evt, TemplateCallback, templateCallback, TemplateInfo } from "./src/decorators";
import { Filter } from "./src/filter";

const IMG = document.createElement("img");
IMG.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export namespace TableAdvanced {
  /**
   * @element md-table-advanced
   * @fires md-table-advanced-change
   */
  @customElementWithCheck("md-table-advanced")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    @property({ attribute: false }) config!: Config;
    @property({ attribute: false }) data!: Data;

    @evt() "md-table-advanced-change"!: Evt<ChangeEvent>;

    @internalProperty() private error = "";

    @internalProperty() private COLS: Col[] = [];
    @internalProperty() private ROWS: Cell[][] = [];
    private updCols = () => this.requestUpdate("COLS");
    private updRows = () => this.requestUpdate("ROWS");

    @internalProperty() private dragRow = -1;
    @internalProperty() private dropRow = -1;
    @internalProperty() private drops: [number, number][] = [];
    private dragRowElem: HTMLElement | null = null;

    @internalProperty() private dragCol = -1;
    @internalProperty() private dropCol = -1;

    private isResizing = false;
    private isSelectable = false;
    private selected: Record<number, boolean> = {};
    private expandedRowIdx: Record<number, boolean> = {};

    private dragover = (e: Event) => e.preventDefault();

    @queryAll("tr[tabindex]") tableRaws?: HTMLTableRowElement[];
    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("dragover", this.dragover);
    }

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("dragover", this.dragover);
      this.populateTable();
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("data")) {
         this.updateDataInTable();
      }
    }

    private populateColumns() {
      let index = 0;
      const pushCol = (col: ColOptions, group?: { name: string; length: number }) => {
        const f = col.filters || this.config.default?.col?.filters;
        const filters = f
          ? f == "forString"
            ? Filter.optionsString
            : f == "forNumber"
            ? Filter.optionsNumber
            : f.length
            ? f
            : null
          : null;

        this.COLS.push({
          options: { ...col },
          index: index++,
          group,
          sort: "default",
          sorter: col.sorter || this.config.default?.col?.sorter,
          isCollapsable: this.config.cols.collapse == col.id,
          filter: filters
            ? {
                list: filters,
                selectedIndex: 0,
                input: "",
                active: false,
                menuVisible: false
              }
            : undefined
        });
      };

      this.config.cols.define.forEach(col => {
        if ("children" in col) {
          col.children.forEach(c => pushCol(c, { name: col.groupName, length: col.children.length }));
        } else {
          pushCol(col);
        }
      });
      this.isSelectable = !!this.config.rows && this.config.rows?.selectable != "none";
    };

    private populateData() {
      const lenNodes = this.COLS.length;

      // data

      if ("csv" in this.data) {
        const parse = Papa.parse(this.data.csv, {
          skipEmptyLines: true,
          transform: x => x.trim()
        });
        if (parse.errors) {
          this.error = "PARSE ERROR:\n" + JSON.stringify(parse.errors, null, 2);
          return;
        } else {
          const data = parse.data as string[][];
          this.ROWS = data.map(x => x.map(text => ({ text })));
        }
      } else if ("list2d" in this.data) {
        this.ROWS = this.data.list2d.map(x => x.map(text => ({ text })));
      } else {
        while (this.data.list.length > lenNodes) {
          this.ROWS.push(this.data.list.splice(0, lenNodes).map(text => ({ text })));
        }
        if (this.data.list.length != 0) {
          this.ROWS.push(this.data.list.map(text => ({ text })));
        }
      }

      if (this.ROWS.length == 0) {
        this.error = "DATA ERROR: Data is empty";
        return;
      }
    }

    private validateData() {
      const lenNodes = this.COLS.length;
       // validate

       const lenData = this.ROWS.reduce((acc, d) => acc + d.length, 0);
       if (lenData % lenNodes != 0) {
         this.error = this.error =
           "DATA ERROR: Data length mismatch. You must provide (numberOfRows * numberOfColumns) amount of data values.";
         return;
       }

       this.ROWS.forEach((d, i) => {
         const len = d.length;
         if (len != lenNodes) {
           this.error = `DATA ERROR: Total number of cols (=${lenNodes}) and data[${i}] length (=${len}) mismatch`;
         }
       });
    }

    private populateTemplate() {
       // TEMPLATES
       const templates = this.config.cellTemplates;
       const templatesKeys = Object.keys(templates || {});
       if (templates && templatesKeys.length) {
         this.ROWS.forEach((row, iRow) => {
           row.forEach((cell, iCol) => {
             for (const k in templates) {
               const idx = cell.text.indexOf(k);
               if (idx != -1) {
                 const t = templates[k];
                 const template = this.querySelector<HTMLTemplateElement>(`#${t.templateName}`);
                 if (template == null) {
                   console.warn(`cellTemplates["${k}"]: Missing '${t.templateName}' template.`);
                   continue;
                 }

                 let text = cell.text.replace(k, "");
                 if (t.contentCb) {
                   text = t.contentCb({ col: iCol, row: iRow, content: text, insertIndex: idx });
                 }

                 this.ROWS[iRow][iCol] = {
                   text,
                   template: {
                     template,
                     templateCb: t.templateCb,
                     insertIndex: t.contentUse == "replace" ? -1 : idx
                   }
                 };
                 break;
               }
             }
           });
         });
       }

    }

    private setDefaultFilterAndSort() {
      const s = this.config.default?.sort;
      if (s) {
        const col = this.COLS.find(c => c.options.id == s.colId);
        if (col) {
          this.sort(col, s.order);
        } else {
          console.warn(`Cant find ${s.colId} col - for sorting`);
        }
      }

      const f = this.config.default?.filter;
      if (f) {
        const col = this.COLS.find(c => c.options.id == f.colId);
        if (col) {
          if (col.filter) {
            col.filter.selectedIndex = f.selectedIndex;
            col.filter.input = f.input;
            this.updCols();
            this.filter(col);
          } else {
            console.warn(`Cant find filters on ${f.colId} col`);
          }
        } else {
          console.warn(`Cant find ${f.colId} col - for filtering`);
        }
      }
    }

    private populateTable(){
      this.populateColumns();
      this.populateData();
      this.validateData();
      this.setDefaultFilterAndSort();
      this.populateTemplate();

    }

    private updateDataInTable() {
      this.populateData();
      this.validateData();
      this.populateTemplate();
    }

    // --------------

    private onDropRow() {
      if (this.dragRow != this.dropRow) {
        this.drops.push([this.dragRow, this.dropRow]);
      }

      this.dragRow = -1;
      this.dropRow = -1;
      if (this.dragRowElem) {
        this.dragRowElem.setAttribute("draggable", "false");
        this.dragRowElem = null;
      }
    }

    private onDropCol() {
      if (this.dragCol != this.dropCol) {
        const drag = this.COLS[this.dragCol];
        const drop = this.COLS[this.dropCol];
        const gDrag = drag.group;
        const gDrop = drop.group;
        const iDrag = drag.index;
        const iDrop = drop.index;
        drag.group = gDrop;
        drop.group = gDrag;
        drag.index = iDrop;
        drop.index = iDrag;
        this.COLS[this.dragCol] = drop;
        this.COLS[this.dropCol] = drag;

        this.ROWS.forEach(row => {
          const rDrag = row[this.dragCol];
          const rDrop = row[this.dropCol];
          row[this.dragCol] = rDrop;
          row[this.dropCol] = rDrag;
        });

        this.updCols();
        this.updRows();
      }

      this.dragCol = -1;
      this.dropCol = -1;
    }

    private sort(col: Col, order?: SortOrder) {
      if (!col.sorter) return;

      this.clearSelection();
      this.drops = [];

      this.COLS.forEach(c => {
        if (c.options.id == col.options.id) {
          c.sort = order ? order : c.sort == "default" ? "ascending" : c.sort == "ascending" ? "descending" : "default";
        } else {
          c.sort = "default";
        }
      });

      this.updCols();
      this.requestUpdate();

      this["md-table-advanced-change"].emit({
        type: "sort",
        order: col.sort
      });
    }

    @debounce(500)
    private filter(col: Col) {
      if (!col.filter) return;

      this.clearSelection();
      this.drops = [];

      const input = col.filter.input.trim();
      const filter = col.filter.list[col.filter.selectedIndex];

      col.filter.active = input ? true : false;
      this.requestUpdate();

      if (input) {
        this["md-table-advanced-change"].emit({
          type: "filter-on",
          filter,
          input
        });
      } else {
        this["md-table-advanced-change"].emit({
          type: "filter-off",
          filter: col.filter.list[col.filter.selectedIndex]
        });
      }
    }

    private selectRow(p: { row: Row; shiftKey: boolean; metaKey: boolean }) {
      const i = p.row.idx;
      const isSelected = this.selected.hasOwnProperty(i);
      if (this.config.rows?.selectable == "multiple") {
        if (p.metaKey) {
          if (isSelected) {
            delete this.selected[i];
          } else {
            this.selected[i] = true;
          }
        } else if (p.shiftKey) {
          // TODO - if we enable shift key we need to disable "native browser" text selection
          // and maybe user wants to select and copy more then 1 row content
        } else {
          this.selected = { [i]: true };
        }

        this["md-table-advanced-change"].emit({
          type: "multi-select",
          rows: Object.keys(this.selected).map(k => +k)
        });
      } else {
        if (isSelected) {
          this.clearSelection();
        } else {
          this.selected = { [i]: true };
          this["md-table-advanced-change"].emit({
            type: "select",
            index: i
          });
        }
      }

      this.requestUpdate("selected");
    }

    private clearSelection() {
      this.selected = {};
      this.requestUpdate("selected");
    }

    private collapseToggle(e: Event, row: number) {
      e.stopPropagation();
      if (this.expandedRowIdx[row]) {
        delete this.expandedRowIdx[row];
        this["md-table-advanced-change"].emit({
          type: "collapse",
          row
        });
      } else {
        this.expandedRowIdx[row] = true;
        this["md-table-advanced-change"].emit({
          type: "expand",
          row
        });
      }
      this.clearSelection();
      this.requestUpdate();
    }

    private eX = 0; // https://stackoverflow.com/a/33672982

    // RESIZE
    private onResize = (e: DragEvent, col: Col) => {
      if (this.dragCol != -1 || this.dragRow != -1) return;

      this.isResizing = true;

      const t = e.target as HTMLDivElement;
      e.dataTransfer?.setDragImage(IMG, 0, 0);

      const elems = this.COLS.map(c => this.shadowRoot!.querySelector<HTMLElement>(`th.col-index-${c.index}`)!);
      this.COLS.forEach((c, i) => (c.width = elems[i].offsetWidth + "px"));
      this.updCols();

      const orgX = e.x;
      this.eX = e.x;

      let posX = -1;
      let set = -1;
      let setLeft = -1;

      const colLeft = this.COLS[col.index - 1];

      const elem = elems[col.index];
      const elemLeft = elems[col.index - 1];
      const elemW = elem.offsetWidth;
      const elemLeftW = elemLeft.offsetWidth;

      const drag = () => {
        const eX = this.eX;
        if (posX != eX && eX != 0) {
          posX = eX;

          // TODO - With this I can catch if resize is stopped
          /*
          const real = elem.offsetWidth;
          console.log(set, real);
          const realLeft = elemLeft.offsetWidth;
          console.log(setLeft, realLeft);
          */

          const deltaX = posX - orgX;
          set = elemW - deltaX;
          setLeft = elemLeftW + deltaX;

          col.width = set + "px";
          colLeft.width = setLeft + "px";
          this.updCols();
        }
      };

      const dragOver = (evt: DragEvent) => (this.eX = evt.x);

      const dragEnd = () => {
        this.isResizing = false;
        t.removeEventListener("drag", drag);
        t.removeEventListener("dragend", dragEnd);
        document.removeEventListener("dragover", dragOver);
      };

      t.addEventListener("drag", drag);
      t.addEventListener("dragend", dragEnd);
      document.addEventListener("dragover", dragOver);
    };

    // RENDER
    // ----------------------------------

    render() {
      if (this.error)
        return html`
          <div>${this.error}</div>
        `;

      const { head } = this.config;
      const tableClass = classMap({
        "sticky-header": !!this.config.isStickyHeader
      });

      return html`
        <div class="md-table-advanced">
          <slot></slot>
          <table class=${tableClass} summary=${ifDefined(head?.summary)}>
            ${head?.caption
              ? html`
                  <caption>
                    ${head?.caption}
                  </caption>
                `
              : nothing}
            ${this.renderHead()} ${this.renderBody()}
          </table>
        </div>
      `;
    }

    private renderHead() {
      let groups = nothing;
      const hasGroup = this.COLS.reduce((acc, col) => (acc = col.group ? true : acc), false);
      if (hasGroup) {
        let gName = "";
        groups = html`
          ${this.COLS.map(c => {
            if (c.group) {
              if (gName != c.group.name) {
                gName = c.group.name;
                return html`
                  <colgroup span=${c.group.length}></colgroup>
                `;
              }
            } else {
              return html`
                <col />
              `;
            }
          })}
          <tr tabindex="0">
            ${this.COLS.map(col => {
              if (col.group) {
                if (gName != col.group.name) {
                  gName = col.group.name;
                  return html`
                    <th colspan=${col.group.length} scope="colgroup" title="${col.group.name}">
                      <div class="head-inner-cell">
                        <span>${col.group.name}</span>
                        ${this.renderColResize(col)}
                      </div>
                    </th>
                  `;
                }
              } else {
                return this.renderCol(col, 2);
              }
            })}
          </tr>
        `;
      }

      const heads = html`
        <tr tabindex="0">
          ${this.COLS.map(col => {
            if (hasGroup) {
              if (col.group) {
                return this.renderCol(col);
              }
            } else {
              return this.renderCol(col);
            }
          })}
        </tr>
      `;

      return html`
        <thead>
          ${groups} ${heads}
        </thead>
      `;
    }

    private renderCol(col: Col, rowspan?: number) {
      const input = col.filter?.list[col.filter.selectedIndex]?.input;
      const sortClass = classMap({
        ascending: col.sort == "ascending",
        descending: col.sort == "descending"
      });

      return html`
        <th
          rowspan=${ifDefined(rowspan)}
          width=${ifDefined(col.width ? col.width : col.options.width)}
          scope="col"
          part="head-col"
          title="${col.options.title}"
          class=${"col-index-" + col.index}
        >
          <!-- DRAG  -->
          ${this.renderColDrag(col)}

          <div class="head-inner-cell">
            <!-- SORT  -->
            ${col.sorter
              ? html`
                  <button class="sortable ${sortClass}" @click=${() => this.sort(col)}>${col.options.title}</button>
                `
              : html`
                  <span>${col.options.title}</span>
                `}

            <!-- FILTER -->
            ${col.filter
              ? html`
                  <div class="filter-wrap">
                    ${col.filter.active
                      ? html`
                          <md-icon class="filter-active" name="filter-adr_14"></md-icon>
                        `
                      : nothing}
                    <md-menu-overlay placement="bottom" class="filter" custom-width="188px">
                      <md-button class="filter-icon" slot="menu-trigger" color="color-none" size="size-none">
                        <md-icon slot="icon" name="filter_16"></md-icon>
                      </md-button>
                      <div class="filter-menu" style="width: 100%;">
                        <select
                          name="filter-type"
                          @change=${(e: Event) => {
                            col.filter!.selectedIndex = ((e.target! as HTMLSelectElement).value as unknown) as number;
                            this.updCols();
                            this.filter(col);
                          }}
                        >
                          ${col.filter.list.map(
                            (c, i) => html`
                              <option value=${i} ?selected=${col.filter!.selectedIndex == i}>${c.label}</option>
                            `
                          )}
                        </select>
                        <input
                          type="text"
                          placeholder=${input!.placeholder}
                          maxlength=${ifDefined(input!.maxlength)}
                          pattern=${ifDefined(input!.pattern)}
                          .value=${col.filter.input}
                          @input=${(e: InputEvent) => {
                            col.filter!.input = (e.target! as HTMLSelectElement).value;
                            this.updCols();
                            this.filter(col);
                          }}
                        />
                      </div>
                    </md-menu-overlay>
                  </div>
                `
              : nothing}

            <!-- RESIZE  -->
            ${this.renderColResize(col)}
          </div>
        </th>
      `;
    }

    private renderColDrag(col: Col) {
      return this.config.cols.isDraggable
        ? html`
            <div
              draggable="true"
              class="drag-area-col ${classMap({
                drag: this.dragCol != -1,
                over: this.dropCol == col.index && this.dropCol != this.dragCol
              })}"
              @dragstart=${(e: DragEvent) => {
                if (this.isResizing || this.dragRow != -1) return;
                this.dragCol = col.index;
                e.dataTransfer!.setDragImage((e.target! as Node).parentNode as Element, 0, 0);
              }}
              @dragenter=${() => {
                if (this.isResizing || this.dragRow != -1) return;
                this.dropCol = col.index;
              }}
              @dragend=${() => this.onDropCol()}
            ></div>
          `
        : nothing;
    }

    private renderColResize(col: Col) {
      return this.config.cols.isResizable
        ? html`
            ${col.index > 0
              ? html`
                  <div class="resize" draggable="true" @dragstart=${(e: DragEvent) => this.onResize(e, col)}></div>
                `
              : nothing}
          `
        : nothing;
    }

    private renderBody() {
      let rows: Row[] = this.ROWS.map((cells, idx) => ({
        cells,
        idx,
        idxDrag: idx,
        collapse: "none",
        first: idx === 0 ? true : false,
        isGhost: false,
        children: []
      }));

      // filter
      const len = this.COLS.length;
      rows = rows.filter(row => {
        for (let i = 0; i < len; i++) {
          const col = this.COLS[i];
          if (col.filter?.active) {
            const filter = col.filter.list[col.filter.selectedIndex];
            const isVisible = filter.predicate(row.cells[i].text, col.filter.input);
            if (!isVisible) return false;
          }
        }
        return true;
      });

      // sort
      const sortCol = this.COLS.find(c => c.sort != "default");
      if (sortCol) {
        const map = this.ROWS.map((r, i) => ({ v: r[sortCol.index].text, i }));
        const dir = sortCol.sort == "ascending" ? 1 : -1;

        let rowsSorted: SortNode[] = [];
        if (sortCol.sorter == "byNumber") {
          rowsSorted = map.sort((a, b) => (dir == 1 ? +a.v - +b.v : +b.v - +a.v));
        } else if (sortCol.sorter == "byString") {
          rowsSorted = map.sort((a, b) => (a.v == b.v ? 0 : a.v > b.v ? dir : -dir));
        } else if (typeof sortCol.sorter == "function") {
          const func = sortCol.sorter;
          rowsSorted = map.sort((a, b) => func(a.v, b.v, dir));
        }

        rows = rowsSorted.map(s => rows[s.i]);
      }

      // collapse
      const collapseCol = this.COLS.find(c => c.isCollapsable);
      if (collapseCol) {
        const colIdx = collapseCol.index;

        const groups = rows.reduce((acc, row) => {
          const key = row.cells[colIdx].text;
          const group = acc.find(x => x.key == key);
          if (group) {
            row.collapse = "child";
            group.children.push(row);
          } else {
            acc.push({ key, root: row, children: [] });
          }
          return acc;
        }, [] as { key: string; root: Row; children: Row[] }[]);

        rows = [];
        groups.forEach(g => {
          rows.push(g.root);
          g.root.collapse =
            g.children.length == 0 ? "none" : this.expandedRowIdx[g.root.idx] ? "expanded" : "collapsed";
          g.root.children = g.children;
        });
      }

      // drag drop
      this.drops.forEach(({ 0: drag, 1: drop }) => {
        rows.splice(drop, 0, rows.splice(drag, 1)[0]);
      });

      // drag realtime
      rows.forEach((r, i) => (r.idxDrag = i));
      if (this.dragRow != -1) {
        rows[this.dragRow].isGhost = true;
        if (this.dropRow != -1) {
          rows.splice(this.dropRow, 0, rows.splice(this.dragRow, 1)[0]);
        }
      }

      return html`
        <tbody>
          ${rows.map(row => {
            const len = rows.length;
            const isRenderChild = row.children.length > 0 && row.collapse == "expanded" && !row.isGhost;
            return html`
              ${this.renderRow(row, len)} ${isRenderChild ? row.children.map(c => this.renderRow(c, len)) : nothing}
            `;
          })}
        </tbody>
      `;
    }

    private renderRow(row: Row, rowsLen: number) {
      const isSelected = this.selected.hasOwnProperty(row.idx);
      const rowStyles = classMap({
        selected: isSelected,
        selectable: this.isSelectable && !isSelected,
        ghost: row.isGhost
      });

      return html`
        <tr
          class=${rowStyles}
          tabindex="0"
          part=${row.first ? "first-row" : "row"}
          @click=${({ shiftKey, metaKey }: MouseEvent) => {
            if (this.isSelectable) this.selectRow({ row, shiftKey, metaKey });
          }}
        >
          ${row.cells.map((cell, j) => {
            const col = this.COLS[j];

            // content
            let content: TemplateResult | string | unknown = cell.text;
            const t = cell.template;
            if (t) {
              content = t.templateCb
                ? html`
                    ${templateCallback({
                      cb: t.templateCb,
                      insertIndex: t.insertIndex,
                      template: t.template,
                      content: cell.text,
                      row: row.idx,
                      col: j
                    })}
                  `
                : html`
                    ${templateContent(t.template)}
                  `;
              if (t.insertIndex != -1) {
                content = html`
                  ${t.insertIndex > 0 ? cell.text.substring(0, t.insertIndex) : nothing} ${content}
                  ${t.insertIndex < cell.text.length - 1 ? cell.text.substring(t.insertIndex) : nothing}
                `;
              }
            }

            // drag
            const isDrag = this.config.rows?.isDraggable && row.collapse != "child";
            const isDragArea = isDrag && this.dragRow != -1 && this.dragRow != row.idxDrag;
            const isDragHandle = isDrag && j == 0;

            const cellRenderResult = html`
              <div
                class="inner-cell"
                draggable="false"
                @dragstart=${() => {
                  if (this.isResizing || this.dragCol != -1) return;
                  this.dragRow = row.idxDrag;
                }}
                @dragend=${() => this.onDropRow()}
              >
                ${isDragArea
                  ? html`
                      <div
                        class="drag-area top"
                        @dragenter=${() => {
                          if (this.dragRow == 0) {
                            const i = row.idxDrag - 1;
                            this.dropRow = i >= 0 ? i : 0;
                          } else {
                            this.dropRow = row.idxDrag;
                          }
                        }}
                      ></div>
                      <div
                        class="drag-area bottom"
                        @dragenter=${() => {
                          if (this.dragRow == 0) {
                            this.dropRow = row.idxDrag;
                          } else {
                            const i = row.idxDrag + 1;
                            this.dropRow = i < rowsLen ? i : rowsLen - 1;
                          }
                        }}
                      ></div>
                    `
                  : nothing}
                ${isDragHandle
                  ? html`
                      <md-icon
                        class="drag-handle"
                        @mousedown=${(e: MouseEvent) => {
                          if (this.isResizing || this.dragCol != -1) return;
                          this.dragRowElem = (e.target! as Node).parentNode as HTMLElement;
                          this.dragRowElem.setAttribute("draggable", "true");
                        }}
                        name="panel-control-dragger_16"
                      >
                      </md-icon>
                    `
                  : nothing}
                ${col.isCollapsable
                  ? html`
                      ${row.collapse == "expanded" || row.collapse == "collapsed"
                        ? html`
                            <md-button
                              class="row-collapsible"
                              size="size-none"
                              @click=${(e: Event) => this.collapseToggle(e, row.idx)}
                              outline
                              color="color-none"
                            >
                              ${row.collapse == "collapsed"
                                ? html`
                                    <md-icon slot="icon" name="plus_12"></md-icon>
                                  `
                                : html`
                                    <md-icon slot="icon" name="minus_12"></md-icon>
                                  `}
                            </md-button>
                          `
                        : nothing}
                      <span>${row.collapse == "child" ? nothing : content}</span>
                    `
                  : html`
                      <span>${content}</span>
                    `}
              </div>
            `;

            return col.options.isHeader
              ? html`
                  <th part="cell-ishead" scope="row" title="${cell.text}">${cellRenderResult}</th>
                `
              : html`
                  <td part=${j === 0 ? "first-cell" : "cell"} title="${cell.text}">${cellRenderResult}</td>
                `;
          })}
        </tr>
      `;
    }

    static get styles() {
      return [reset, styles];
    }
  }

  type ColId = string;

  export type Data = { csv: string } | { list: string[] } | { list2d: string[][] };

  export type Config = {
    isStickyHeader?: boolean;
    isInfiniteScroll?: boolean;

    cols: {
      define: (ColOptions | ColOptionsGroup)[];
      isDraggable?: boolean;
      isResizable?: boolean;
      collapse?: ColId;
    };

    rows?: {
      isDraggable?: boolean;
      selectable?: "none" | "single" | "multiple";
    };

    cellTemplates?: Record<string, CellTemplate>;

    default?: {
      col?: Pick<ColOptions, "filters" | "sorter">;

      sort?: {
        colId: ColId;
        order: SortOrder;
      };

      filter?: {
        colId: ColId;
        input: string;
        selectedIndex: number;
      };
    };

    head?: {
      caption?: string;
      summary?: string;
    };
  };

  type ColOptions = {
    id: string;
    title: string;
    width?: string;
    sorter?: "byString" | "byNumber" | SortComparator;
    filters?: "forString" | "forNumber" | Filter.Options[];
    isHeader?: boolean;
  };

  type ColOptionsGroup = { groupName: string; children: ColOptions[] };
  type SortOrder = "default" | "ascending" | "descending";
  type SortComparator = (a: string, b: string, direction: 1 | -1) => number; // -number, 0, number
  type SortNode = { v: string; i: number };

  type Cell = { text: string; template?: CellTemplateProcessed };
  type CellTemplate = {
    templateName: string;
    contentUse?: "insert" | "replace";
    contentCb?: CellContentCallback;
    templateCb?: TemplateCallback;
  };
  type CellTemplateProcessed = { insertIndex: number; template: HTMLTemplateElement; templateCb?: TemplateCallback };
  type CellContentCallback = (p: TemplateInfo) => string;
  type Row = {
    cells: Cell[];
    idx: number;
    idxDrag: number;
    isGhost: boolean;
    first: boolean;
    collapse: "none" | "collapsed" | "expanded" | "child";
    children: Row[];
  };

  type Col = {
    index: number;
    sort: SortOrder;
    sorter: ColOptions["sorter"];
    width?: string;
    group?: { name: string; length: number };
    filter?: { list: Filter.Options[]; selectedIndex: number; input: string; active: boolean; menuVisible: boolean };
    options: ColOptions;
    isCollapsable: boolean;
  };

  export type ChangeEvent = {
    detail:
      | { type: "filter-on"; filter: Filter.Options; input: string }
      | { type: "filter-off"; filter: Filter.Options }
      | { type: "sort"; order: SortOrder }
      | { type: "select"; index: number }
      | { type: "multi-select"; rows: number[] }
      | { type: "expand"; row: number }
      | { type: "collapse"; row: number };
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table-advanced": TableAdvanced.ELEMENT;
  }
}
