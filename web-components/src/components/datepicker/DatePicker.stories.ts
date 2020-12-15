import { now } from "@/utils/dateUtils";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs, select } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { weekStartDays } from "@/components/datepicker/DatePicker";

export default {
  title: "Date Picker",
  component: "md-datepicker",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-datepicker"
    }
  }
};

export const DatePicker = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const shouldCloseOnSelect = boolean("shouldCloseOnSelect", false);
  const value = text('value', "");
  const weekStart = select("weekStart", weekStartDays, "");
  const locale = text('locale', 'en-US');

  const minDate = text(
    "minimum date",
    now()
      .minus({ day: 5 })
      .toSQLDate()
  );
  const maxDate = text(
    "maximum date",
    now()
      .plus({ day: 30 })
      .toSQLDate()
  );
  return html`
    <md-theme class="theme-toggle" id="datepicker" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-datepicker
        ?should-close-on-select=${shouldCloseOnSelect}
        value=${value}
        weekStart=${weekStart}
        locale=${locale}
        minDate=${minDate}
        maxDate=${maxDate}>
      </md-datepicker>
    </md-theme>
  `;
};
