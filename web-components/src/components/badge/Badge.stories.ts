/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { badgeColor } from "@/utils/enums";
import "@/components/icon/Icon";
import "@/components/badge/Badge";
import "@/components/theme/Theme";

export default {
  title: "Badge",
  component: "md-badge",
  decorators: [withKnobs, withA11y],
  argTypes: {
    renderBgColor: { table: { disable: true } },
    renderTextColor: { table: { disable: true } },
    renderHeight: { table: { disable: true } },
    renderWidth: { table: { disable: true } },
    getStyles: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-badge"
    }
  }
};

export const Badge = () => {
  const darkTheme = boolean("darkMode", false);
  const color = select("Color", badgeColor, "blue");
  const bgColor = text("BG Color Overrides", "blue");
  const textColor = text("Text Color Override", "white");
  const height = text("Height Override", "");
  const width = text("Width Override", "");
  const circle = boolean("Circle", false);
  const small = boolean("Small", false);
  const icon = boolean("With icon", false)

  return html`
  <md-theme class="theme-toggle" id="badge" ?darkTheme=${darkTheme}>
    <md-badge .color=${color} .bgColor=${bgColor} .small=${small} .textColor=${textColor} .height=${height} .width=${width} .circle=${circle}>
      ${icon ? html`<md-icon name="chat-active_16"></md-icon>` : html`Badge ${color}`}
    </md-badge>
  </md-theme>
  `;
};
