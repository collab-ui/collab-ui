/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/icon/Icon";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, color, select, text, withKnobs } from "@storybook/addon-knobs";
import { SelectTypeKnobValue } from "@storybook/addon-knobs/dist/components/types";
import { html } from "lit-element";
import { GroupOptions } from "sortablejs";
import mdx from "./Draggable.stories.mdx";

export default {
  title: "Components/Draggable",
  component: "md-draggable",
  decorators: [withKnobs, withA11y],
  parameters: {
    docs: {
      page: mdx
    },
    a11y: {
      element: "md-draggable"
    },
    parameters: {
      description: {
        component: "For more information please look: https://sortablejs.github.io/Sortable/"
      }
    }
  }
};

export const Draggable = () => {
  const darkTheme = boolean("Dark Mode", false);
  const lumosTheme = boolean("Lumos Theme", false);

  const leftSort = boolean("Allow sorting inside left draggable list", false, "Left List");
  const leftDisabled = boolean("Disables the left sortable", false, "Left List");
  const leftFiltered = text("Left list items that will be filtered out", "md-draggable-item[disabled]", "Left List");
  const leftGroupName = text("Group name", "shared-list", "Left List");
  const leftGroupPull = select(
    "Select pull option",
    {
      clone: "clone",
      TurnOn: (true as unknown) as SelectTypeKnobValue,
      TurnOff: (false as unknown) as SelectTypeKnobValue,
      GroupArray: [leftGroupName]
    },
    "clone",
    "Left List"
  );
  const leftGroupPut = select(
    "Select left put option",
    {
      TurnOn: (true as unknown) as SelectTypeKnobValue,
      TurnOff: (false as unknown) as SelectTypeKnobValue,
      GroupArray: [leftGroupName]
    },
    (true as unknown) as SelectTypeKnobValue,
    "Left List"
  );
  const leftHandle = text("Drag handle selector within left list items", "md-draggable-item", "Left List");

  const rightSort = boolean("Allow sorting inside right draggable list", false, "Right List");
  const rightDisabled = boolean("Disables the right sortable", false, "Right List");
  const rightFiltered = text("Right list items that will be filtered out", "md-draggable-item[disabled]", "Right List");
  const rightGroupName = text("Group name", "shared-list", "Right List");
  const rightGroupPull = select(
    "Select pull option",
    {
      clone: "clone",
      TurnOn: (true as unknown) as SelectTypeKnobValue,
      TurnOff: (false as unknown) as SelectTypeKnobValue,
      GroupArray: [rightGroupName]
    },
    "clone",
    "Right List"
  );
  const rightGroupPut = select(
    "Select right put option",
    {
      TurnOn: (true as unknown) as SelectTypeKnobValue,
      TurnOff: (false as unknown) as SelectTypeKnobValue,
      GroupArray: [rightGroupName]
    },
    (true as unknown) as SelectTypeKnobValue,
    "Right List"
  );
  const rightHandle = text("Drag handle selector within right list items", "md-draggable-item", "Right List");

  const ghostClass = color("Class name for the drop placeholder", "#c8ebfb");
  const chooseClass = color("Class name for the chosen item", "#ddc74e");

  return html`
    <style>
      md-draggable-item {
        border: 1px solid rgba(0, 0, 0, 0.125);
        display: flex;
        justify-content: center;
        padding: 0.5rem 1rem;
        position: relative;
      }

      md-draggable-item[disabled] {
        background-color: #dc3545;
      }

      .custom-ghost {
        background-color: ${ghostClass};
      }

      .custom-choose {
        border: 3px dashed ${chooseClass};
      }

      .draggable-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }

      md-icon[name="icon-drag_16"] {
        margin-right: 10px;
      }
    </style>
    <md-theme class="theme-toggle" ?darkTheme=${darkTheme} ?lumos=${lumosTheme}>
      <div class="draggable-wrapper">
        <md-draggable
          ?sort=${leftSort}
          ?disabled=${leftDisabled}
          .filter=${leftFiltered}
          .handle=${leftHandle}
          .group=${{
            name: leftGroupName,
            pull: leftGroupPull as unknown,
            put: leftGroupPut as unknown
          } as GroupOptions}
          ghost-class="custom-ghost"
          chosen-class="custom-choose"
          draggable-items="md-draggable-item"
        >
          <md-draggable-item slot="draggable-item"
            ><md-icon name="icon-drag_16"></md-icon>Sortable Item1 (Handle)</md-draggable-item
          >
          <md-draggable-item slot="draggable-item" disabled>Sortable Item2 (Disabled)</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item3</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item4</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item5</md-draggable-item>
        </md-draggable>

        <md-draggable
          ?sort=${rightSort}
          ?disabled=${rightDisabled}
          .filter=${rightFiltered}
          .handle=${rightHandle}
          .group=${{
            name: rightGroupName,
            pull: rightGroupPull as unknown,
            put: rightGroupPut as unknown
          } as GroupOptions}
          ghost-class="custom-ghost"
          chosen-class="custom-choose"
          draggable-items="md-draggable-item"
        >
          <md-draggable-item slot="draggable-item">Sortable Item6</md-draggable-item>
          <md-draggable-item slot="draggable-item"
            ><md-icon name="icon-drag_16"></md-icon>Sortable Item7 (Handle)</md-draggable-item
          >
          <md-draggable-item slot="draggable-item">Sortable Item8</md-draggable-item>
          <md-draggable-item slot="draggable-item" disabled>Sortable Item9 (Disabled)</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item10</md-draggable-item>
        </md-draggable>
      </div>
    </md-theme>
  `;
};
