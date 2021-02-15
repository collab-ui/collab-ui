/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs, color, text, select } from "@storybook/addon-knobs";
import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import { html } from "lit-element";
import { PullResult } from "sortablejs";

export default {
  title: "Draggable",
  component: "md-draggable",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-draggable"
    },
    docs: {
      description: {
        component: `For more information please look: https://sortablejs.github.io/Sortable/`
      }
    }
  }
};

export const Draggable = () => {
  const darkTheme = boolean("Dark Mode", false);
  const lumosTheme = boolean("Lumos Theme", false);

  const leftSort = boolean("Allow sorting inside left draggable list", false, "Left List");
  const leftDisabled = boolean("Disables the left sortable", false, "Left List");
  const leftFiltered = text("Left list items that will filtered out", "md-draggable-item[disabled]", "Left List");
  const leftGroupName = text("Left group name", "shared-list", "Left List");
  const leftPutGroupName = boolean("Allow items to be put into this list", false, "Left List");
  const leftGroupPull = select(
    "Left group pull",
    { clone: "clone", groupNames: [leftGroupName] },
    "groupNames",
    "Left List"
  ) as PullResult;

  const rightSort = boolean("Allow sorting inside right draggable list", false, "Right List");
  const rightDisabled = boolean("Disables the right sortable", false, "Right List");
  const rightFiltered = text("Right list items that will filtered out", "md-draggable-item[disabled]", "Right List");
  const rightGroupName = text("Right group name", "shared-list", "Right List");
  const rightPutGroupName = boolean("Allow items to be put into this list", false, "Right List");
  const rightGroupPull = select(
    "Right group pull",
    { clone: "clone", groupNames: [rightGroupName] },
    "groupNames",
    "Right List"
  ) as PullResult;

  const ghostClass = color("Class name for the drop placeholder", "#c8ebfb");
  const chooseClass = color("Class name for the chosen item", "#ddc74e");

  return html`
    <style>
      md-draggable-item {
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        display: block;
        margin-bottom: -1px;
        padding: 0.5rem 1rem;
        position: relative;
        text-align: center;
        background: #dce0e0;
      }

      .custom-ghost {
        background-color: ${ghostClass};
      }

      .custom-choose {
        background-color: ${chooseClass};
      }

      .draggable-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }
    </style>
    <md-theme class="theme-toggle" ?darkTheme=${darkTheme} ?lumos=${lumosTheme}>
      <div class="draggable-wrapper">
        <md-draggable
          ?sort=${leftSort}
          ?disabled=${leftDisabled}
          .filter=${leftFiltered}
          .group=${{ name: leftGroupName, pull: leftGroupPull, put: leftPutGroupName }}
          ghost-class="custom-ghost"
          chosen-class="custom-choose"
          draggable-items="md-draggable-item"
        >
          <md-draggable-item slot="draggable-item">Sortable Item1</md-draggable-item>
          <md-draggable-item slot="draggable-item" disabled>Sortable Item2</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item3</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item4</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item5</md-draggable-item>
        </md-draggable>

        <md-draggable
          ?sort=${rightSort}
          ?disabled=${rightDisabled}
          .filter=${rightFiltered}
          .group=${{ name: rightGroupName, pull: rightGroupPull, put: rightPutGroupName }}
          ghost-class="custom-ghost"
          chosen-class="custom-choose"
          draggable-items="md-draggable-item"
        >
          <md-draggable-item slot="draggable-item">Sortable Item6</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item7</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item8</md-draggable-item>
          <md-draggable-item slot="draggable-item" disabled>Sortable Item9</md-draggable-item>
          <md-draggable-item slot="draggable-item">Sortable Item10</md-draggable-item>
        </md-draggable>
      </div>
    </md-theme>
  `;
};
