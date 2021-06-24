/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { action } from "@storybook/addon-actions";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { buttonColor, buttonRoles, buttonSize, buttonTag, buttonType, buttonVariant } from "./Button"; // Keep type import as a relative path
import mdx from "./Button.stories.mdx";

export default {
  title: "Components/Button",
  component: "md-button",
  decorators: [withKnobs, withA11y],
  argTypes: {
    renderWidth: { table: { disable: true } },
    renderMaxWidth: { table: { disable: true } },
    buttonClassMap: { table: { disable: true } },
    iconTemplate: { table: { disable: true } },
    textTemplate: { table: { disable: true } },
    slottedText: { table: { disable: true } },
    getStyles: { table: { disable: true } },
    keyboardKey: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-button"
    },
    docs: {
      page: mdx,
      description: {
        component: "Button Documentation"
      }
    }
  }
};

export const Button = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const variant = select("Variant", buttonVariant, "secondary");
  const color = select("Color", buttonColor, "");
  const disabled = boolean("Disabled Mode", false);
  const circle = boolean("Circle", false);
  const loading = boolean("Loading State", false);
  const size = select("Size", buttonSize, 32);
  const tag = select("Tag", buttonTag, "button");
  const type = select("type", buttonType, "button");
  const ariaLabel = text("AriaLabel", "Button Storybook");
  const ariaLabelledBy = text("AriaLabelledBy", "");
  const ariaExpanded = boolean("AriaExpanded", false);
  const ariaHaspopup = boolean("AriaHaspopup", false);
  const ariaPressed = boolean("AriaPressed", false);
  const containerLarge = boolean("Container Large", false);
  const href = text("href", "");
  const label = text("label", "");
  const value = text("value", "");
  const outline = boolean("outline", false);
  const hasRemoveStyle = boolean("hasRemoveStyle", false);
  const role = select("role", buttonRoles, "button");

  return html`
    <md-theme class="theme-toggle" id="button" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-button
        @button-click=${action("ditail")}
        variant=${variant}
        .color=${color}
        .disabled=${disabled}
        .circle=${circle}
        .loading=${loading}
        .size=${size}
        .tag=${tag}
        .type=${type}
        .ariaLabel=${ariaLabel}
        .ariaLabelledBy=${ariaLabelledBy}
        .ariaExpanded=${ariaExpanded}
        .ariaHaspopup=${ariaHaspopup}
        .ariaPressed=${ariaPressed}
        .containerLarge=${containerLarge}
        .href=${href}
        .label=${label}
        .value=${value}
        .outline=${outline}
        .hasRemoveStyle=${hasRemoveStyle}
        role=${role}
      >
        ${circle
          ? html`
              <md-icon slot="icon" name="icon-search_12"></md-icon>
            `
          : html`
              <span slot="text">Button</span>
            `}
      </md-button>
    </md-theme>
  `;
};

Button.parameters = {
  backgrounds: {
    values: [
      { name: "Light", value: "#fff" },
      { name: "Dark", value: "#000" }
    ]
  }
};
