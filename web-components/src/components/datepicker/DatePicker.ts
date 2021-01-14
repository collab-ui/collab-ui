import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { MenuOverlay } from "@/components/menu-overlay/MenuOverlay";
import { addDays, addWeeks, DayFilters, isDayDisabled, now, subtractDays, subtractWeeks } from "@/utils/dateUtils";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { DateTime } from "luxon";
import { ifDefined } from "lit-html/directives/if-defined";

export namespace DatePicker {}
export const weekStartDays = ["Sunday", "Monday"];
@customElement("md-datepicker")
export class DatePicker extends LitElement {
  @property({ type: Boolean, attribute: "should-close-on-select" }) shouldCloseOnSelect = false;
  @property({ type: String }) maxDate: string | undefined = undefined;
  @property({ type: String }) minDate: string | undefined = undefined;
  @property({ type: String, reflect: true }) value: string | undefined = undefined;
  @property({ type: String }) weekStart: typeof weekStartDays[number] = "Sunday";
  @property({ type: String, reflect: true }) placeholder: string | undefined = undefined;
  @property({ type: String }) locale = "en-US";

  @internalProperty() selectedDate: DateTime = now();
  @internalProperty() focusedDate: DateTime = now();
  @internalProperty() filterDate: Function | undefined = undefined;
  @internalProperty() maxDateData: DateTime | undefined = undefined;
  @internalProperty() minDateData: DateTime | undefined = undefined;

  @query("md-menu-overlay") menuOverlay!: MenuOverlay;

  connectedCallback() {
    super.connectedCallback();
    if (this.minDate) {
      this.minDateData = DateTime.fromISO(this.minDate, { locale: this.locale });
    }
    if (this.maxDate) {
      this.maxDateData = DateTime.fromISO(this.maxDate, { locale: this.locale });
    }
  }

  async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    if (!this.value) {
      this.value = this.selectedDate?.toISODate();
    }
  }

  handleDateInputChange = (event: CustomEvent) => {
    if (event?.detail?.value) {
      this.value = event?.detail?.value;
    }
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.value && changedProperties.has("value")) {
      this.selectedDate = DateTime.fromISO(this.value, { locale: this.locale });
      this.setPreSelection(this.selectedDate);
    }
    if (changedProperties.has("locale")) {
      this.render();
    }
    if ((this.minDate && changedProperties.has("minDate"))) {
      this.minDateData = DateTime.fromISO(this.minDate, { locale: this.locale });
    }
    if (this.maxDate && changedProperties.has("maxDate")) {
      this.maxDateData = DateTime.fromISO(this.maxDate, { locale: this.locale });
    }
  }

  setOpen = (open: boolean) => {
    this.menuOverlay.isOpen = open;
  };

  handleSelect = (e: CustomEvent) => {
    const date = e.detail.date;
    const event = e.detail.sourceEvent;
    this.setPreSelection(date);
    this.setSelected(date, event);
    this.shouldCloseOnSelect && this.setOpen(false);
  };

  setSelected = (date: DateTime, event: Event) => {
    const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
    if (!isDayDisabled(date, filters)) {
      const dateString = date.toISODate();
      this.selectedDate = date;
      this.value = dateString;
    }
    this.dispatchEvent(
      new CustomEvent("date-selection-change", {
        bubbles: true,
        composed: true,
        detail: {
          sourceEvent: event,
          data: date
        }
      })
    );
  };

  setPreSelection = (date: DateTime) => {
    const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
    if (!isDayDisabled(date, filters)) {
      this.focusedDate = date;
    }
  };

  handleKeyDown = (e: CustomEvent) => {
    const event = e.detail.sourceEvent;
    let flag = false;
    const copy = this.focusedDate;

    switch (!event.shiftKey && event.code) {
      case "Space":
      case "Enter":
        this.handleSelect(e);
        flag = true;
        break;

      case "Escape":
        this.setOpen(false);
        break;
      case "ArrowUp":
        this.setPreSelection(subtractWeeks(copy, 1));
        flag = true;
        break;
      case "ArrowLeft":
        this.setPreSelection(subtractDays(copy, 1));
        flag = true;
        break;

      case "ArrowRight":
        this.setPreSelection(addDays(copy, 1));
        flag = true;
        break;

      case "ArrowDown":
        this.setPreSelection(addWeeks(copy, 1));
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  chosenDateLabel = () => {
    return this.selectedDate
      ? `, Selected date is ${this.selectedDate.weekdayLong} ${this.selectedDate.monthLong} ${this.selectedDate.day}, ${this.selectedDate.year}`
      : null;
  };

  render() {
    const placeholder = this.placeholder || this.selectedDate?.toISODate();

    return html`
      <md-menu-overlay custom-width="248px">
        <md-input
          class="date-input"
          slot="menu-trigger"
          placeholder=${ifDefined(this.placeholder)}
          value=${ifDefined(this.value)}
          aria-label=${`Choose Date` + this.chosenDateLabel()}
          auxiliaryContentPosition="before"
          @input-change="${(e: CustomEvent) => this.handleDateInputChange(e)}"
        >
          <md-icon slot="input-section" name="calendar-month_16"></md-icon>
        </md-input>
        <div class="date-overlay-content">
          <md-datepicker-calendar
            @day-select=${(e: CustomEvent) => this.handleSelect(e)}
            @day-key-event=${(e: CustomEvent) => this.handleKeyDown(e)}
            .datePickerProps=${{
              locale: this.locale,
              selected: this.selectedDate,
              focused: this.focusedDate,
              weekStart: this.weekStart
            }}
            .filterParams=${{ minDate: this.minDateData, maxDate: this.maxDateData, filterDate: this.filterDate }}
          ></md-datepicker-calendar>
          <slot name="time-picker"></slot>
        </div>
      </md-menu-overlay>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker": DatePicker;
  }
}
