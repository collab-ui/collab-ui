/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/floating-modal/FloatingModal";
import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import mdx from "./Floating.stories.mdx";

export default {
  title: "Components/Floating Modal",
  component: "md-floating-modal",
  decorators: [withKnobs, withA11y],
  argTypes: {
    fixfull: {
      description: "fix modal position to the screen, not parent div"
    },
    onCornerClick: { table: { disable: true } },
    draggingWindow: { table: { disable: true } },
    draggingCorner: { table: { disable: true } },
    onCornerMove: { table: { disable: true } },
    resizeStyleMap: { table: { disable: true } },
    fullScreen: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-floating-modal"
    },
    docs: {
      page: mdx,
      description: {
        component: "some component description"
      }
    }
  }
};

export const FloatingModal = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const show = boolean("show", true);
  const full = boolean("full-screen", false);
  const fixed = boolean("fixed-strategy", false);
  const ascpectRatio = boolean("aspect ratio", false);
  const heading = text("heading", "Test Heading");
  const label = text("label", "Test label");

  return html`
    <md-theme class="theme-toggle" id="floating" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-floating-modal
        ?show=${show}
        ?full-screen=${full}
        ?fixed-strategy=${fixed}
        ?aspect-ratio=${ascpectRatio}
        heading=${heading}
        label=${label}
      >
        <md-radiogroup group-label="group_process">
          <md-radio slot="radio" value="Option 1">Option 1</md-radio>
          <md-radio slot="radio" value="Option 2">Option 2</md-radio>
          <md-radio slot="radio" value="Option 3">Option 3</md-radio>
          <md-radio slot="radio" value="Option 4">Option 4</md-radio>
        </md-radiogroup>
      </md-floating-modal>
    </md-theme>
  `;
};
