/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export const tooltipPlacement = [
  "auto",
  "auto-start",
  "auto-end",
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end"
] as const;

export const tooltipStrategy = ["fixed", "absolute"] as const;
export type TooltipEvent = {
  placement: Tooltip.Placement;
  reference: HTMLElement;
  popper: HTMLElement;
  slotContent?: Element[] | undefined | null;
};

export namespace Tooltip {
  export type Placement = typeof tooltipPlacement[number];
  export type Strategy = typeof tooltipStrategy[number];
}

@customElement("md-tooltip")
export class Tooltip extends FocusMixin(LitElement) {
  @property({ type: String }) message = "";
  @property({ type: String, reflect: true }) placement: Tooltip.Placement = "auto";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) opened = false;

  @query(".md-tooltip__popper") popper!: HTMLDivElement;
  @query(".md-tooltip__reference") reference!: HTMLDivElement;

  private slotContent: Element[] | null = null;

  protected handleFocusIn(event: Event) {
    if (super.handleFocusIn) {
      super.handleFocusIn(event);
    }
    this.notifyTooltipCreate();
  }

  protected handleFocusOut(event: Event) {
    if (super.handleFocusOut) {
      super.handleFocusOut(event);
    }
    this.notifyTooltipDestroy();
  }

  private notifyVirtualTooltip(eventName: string, detailArgs?: Pick<TooltipEvent, "slotContent">) {
    this.dispatchEvent(
      new CustomEvent<TooltipEvent>(eventName, {
        bubbles: true,
        composed: true,
        detail: {
          placement: this.placement,
          reference: this.reference,
          popper: this.popper,
          ...detailArgs
        }
      })
    );
  }

  notifyTooltipCreate() {
    if (!this.disabled) {
      this.opened = true;
    }
  }

  notifyTooltipDestroy() {
    if (!this.disabled) {
      this.opened = false;
    }
  }

  handleSlotContentChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    if (slot) {
      const slotContent = slot.assignedElements({ flatten: true });
      if (slotContent.length) {
        this.slotContent = slotContent;
        this.notifyVirtualTooltip("tooltip-slot", { slotContent });
      }
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("opened")) {
      if (this.opened) {
        this.notifyVirtualTooltip("tooltip-create", !this.message ? { slotContent: this.slotContent } : {});
      } else {
        this.notifyVirtualTooltip("tooltip-destroy");
      }
    }
    if (changedProperties.has("message")) {
      this.notifyVirtualTooltip("tooltip-message");
    }
  }

  private notifyTooltipRemoved() {
    document.dispatchEvent(new CustomEvent("tooltip-disconnected"));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.notifyTooltipRemoved();
  }

  private get tooltipClassMap() {
    return {
      "md-tooltip--disabled": this.disabled
    };
  }

  render() {
    return html`
      <div class="md-tooltip ${classMap(this.tooltipClassMap)}">
        <div class="md-tooltip__popper" role="tooltip">
          <div class="md-tooltip__content">
            ${this.message
              ? this.message
              : html`
                  <slot name="tooltip-content" @slotchange=${this.handleSlotContentChange}></slot>
                `}
          </div>
          <div id="arrow" class="md-tooltip__arrow" data-popper-arrow></div>
        </div>
        <div
          class="md-tooltip__reference"
          @mouseenter=${() => this.notifyTooltipCreate()}
          @mouseleave=${() => this.notifyTooltipDestroy()}
          aria-describedby="tooltip"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get styles() {
    return [reset, styles];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tooltip": Tooltip;
  }
}
