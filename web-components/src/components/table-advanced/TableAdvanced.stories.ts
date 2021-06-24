/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/table-advanced/TableAdvanced";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { TableAdvanced as TableAdvancedType } from "./TableAdvanced"; // Keep type import as a relative path
import mdx from "./TableAdvanced.stories.mdx";

export default {
  title: "Components/Table Advanced",
  component: "md-table-advanced",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-table-advanced"
    },
    docs: {
      page: mdx
    }
  }
};

export const TableAdvanced = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const stickheader = boolean("Sticky Header", false);
  const resize = boolean("Column Resize", false);
  const dragRow = boolean("Row Draggable", false);
  const dragCol = boolean("Column Draggable", false);
  const collapse = boolean("Collapse Row", false);
  const caption = text("Table Caption", "");
  const sum = text("Table Summary", "");
  const customize = boolean("Use custom template for replace", false);

  const DefaultAdvancedTable: { config: TableAdvancedType.Config; data: TableAdvancedType.Data } = {
    config: {
      isStickyHeader: stickheader,

      rows: {
        isDraggable: dragRow,
        selectable: "single"
      },

      head: {
        caption: caption,
        summary: sum
      },

      cellTemplates: { "00:52": { templateName: "tmp1" } },

      cols: {
        isDraggable: dragCol,
        isResizable: resize,
        define: [
          { id: "col-ani", title: "ANI", sorter: "byString" },
          { id: "col-stage", title: "Abandoment Statge", filters: "forString" },
          { id: "col-transfer", title: "Transfer", sorter: "byNumber" },
          { id: "col-wait", title: "Total Wait Time" },
          { id: "col-back", title: "Call Back Received", filters: "forString" },
          { id: "col-time", title: "Call Back Time" }
        ]
      }
    },
    data: {
      list2d: [
        ["12345670", "IRV", "0", "00:45", "Yes", "12:34 PM"],
        ["12345671", "QWT (1-5 min)", "0", "00:20", "No", "Follow-up"],
        ["12345672", "QWT (5-10 min)", "1", "01:15", "Yes", "09:30 AM"],
        ["12345673", "QWT > 10 min", "2", "00:35", "No", "11:25 PM"],
        ["12345674", "QWT > 10 min", "1", "00:15", "Yes", "Follow-up"],
        ["12345675", "IRV", "2", "00:23", "Yes", "Follow-up"],
        ["12345676", "QWT (1-5 min)", "0", "00:52", "No", "10:16 AM"],
        ["12345677", "IRV", "1", "00:25", "Yes", "Follow-up"],
        ["12345678", "QWT (1-5 min)", "2", "01:05", "No", "03:34 PM"],
        ["12345679", "QWT (5-10 min)", "2", "00:35", "Yes", "02:12 AM"],
        ["12345680", "QWT (1-5 min)", "1", "00:41", "No", "Follow-up"]
      ]
    }
  };

  const ColapseData: { config: TableAdvancedType.Config; data: TableAdvancedType.Data } = {
    config: {
      isStickyHeader: stickheader,

      rows: {
        isDraggable: dragRow,
        selectable: "single"
      },

      cols: {
        isDraggable: dragCol,
        isResizable: resize,
        collapse: "col-ani",
        define: [
          { id: "col-ani", title: "ANI", sorter: "byString" },
          { id: "col-stage", title: "Abandoment Statge", filters: "forString" },
          { id: "col-transfer", title: "Transfer", sorter: "byNumber" },
          { id: "col-wait", title: "Total Wait Time" },
          { id: "col-back", title: "Call Back Received", filters: "forString" },
          { id: "col-time", title: "Call Back Time" }
        ]
      }
    },
    data: {
      list2d: [
        ["12345670", "IRV", "0", "00:45", "Yes", "12:34 PM"],
        ["12345671", "QWT (1-5 min)", "0", "00:20", "No", "Follow-up"],
        ["12345672", "QWT (5-10 min)", "1", "01:15", "Yes", "09:30 AM"],
        ["12345673", "QWT > 10 min", "2", "00:35", "No", "11:25 PM"],
        ["12345674", "QWT > 10 min", "1", "00:15", "Yes", "Follow-up"],
        ["12345675", "IRV", "2", "00:23", "Yes", "Follow-up"],
        ["12345675", "IRV", "2", "00:23", "Yes", "Follow-up"],
        ["12345675", "IRV", "2", "00:23", "Yes", "Follow-up"],
        ["12345676", "QWT (1-5 min)", "0", "00:52", "No", "10:16 AM"],
        ["12345677", "IRV", "1", "00:25", "Yes", "Follow-up"],
        ["12345678", "QWT (1-5 min)", "2", "01:05", "No", "03:34 PM"],
        ["12345679", "QWT (5-10 min)", "2", "00:35", "Yes", "02:12 AM"],
        ["12345680", "QWT (1-5 min)", "1", "00:41", "No", "Follow-up"]
      ]
    }
  };

  const CONF = DefaultAdvancedTable.config;
  CONF.cellTemplates = {
    "00:52": {
      templateName: "tmp1"
    }
  };

  if (customize) {
    return html`
      <md-theme class="theme-toggle" id="table" ?darkTheme=${darkTheme} ?lumos=${lumos}>
        <div style="${stickheader ? `height: 350px; overflow: hidden; overflow-y: auto;` : ``}">
          <md-table-advanced
            .style="${collapse ? `display: block;` : `display: none;`}"
            .config=${ColapseData.config}
            .data=${ColapseData.data}
          >
          </md-table-advanced>
          <md-table-advanced
            .style="${collapse ? `display: none;` : `display: block;`}"
            .config=${DefaultAdvancedTable.config}
            .data=${DefaultAdvancedTable.data}
          >
            <template id="tmp1">
              <div style="background: yellow">
                [OK]
              </div>
            </template>
          </md-table-advanced>
        </div>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="table" ?darkTheme=${darkTheme} ?lumos=${lumos}>
        <div style="${stickheader ? `height: 350px; overflow: hidden; overflow-y: auto;` : ``}">
          <md-table-advanced
            .style="${collapse ? `display: block;` : `display: none;`}"
            .config=${ColapseData.config}
            .data=${ColapseData.data}
          >
          </md-table-advanced>
          <md-table-advanced
            .style="${collapse ? `display: none;` : `display: block;`}"
            .config=${DefaultAdvancedTable.config}
            .data=${DefaultAdvancedTable.data}
          >
          </md-table-advanced>
        </div>
      </md-theme>
    `;
  }
};
