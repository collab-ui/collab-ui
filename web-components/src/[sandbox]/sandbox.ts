import "@/components/sass-stats/SassStats";
import "@/components/theme/Theme";
import reset from "@/wc_scss/reset.scss";
import styles from "@/[sandbox]/sandbox.scss";
import "elix/define/ListExplorer.js";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import {
  accordionTemplate,
  alertBannerTemplate,
  alertTemplate,
  avatarTemplate,
  badgeTemplate,
  breadcrumbTemplate,
  buttonGroupTemplate,
  buttonTemplate,
  cardTemplate,
  chatMessageTemplate,
  checkboxTemplate,
  chipTemplate,
  coachTemplate,
  codeEditorTemplate,
  colorTableTemplate,
  comboBoxTemplate,
  datePickerTemplate,
  dateRangePickerTemplate,
  dateTimePickerTemplate,
  draggableTemplate,
  dropdownTemplate,
  editableField,
  favoriteTemplate,
  floatingModalTemplate,
  formTemplate,
  iconTemplate,
  inputFileTemplate,
  inputTemplate,
  labelTemplate,
  linkTemplate,
  listTemplate,
  loadingTemplate,
  meetingAlertTemplate,
  menuItemTemplate,
  menuOverlayTemplate,
  modalTemplate,
  paginationTemplate,
  phoneInputTemplate,
  progressBarTemplate,
  radioGroupTemplate,
  sliderTemplate,
  spinnerTemplate,
  tableAdvancedTemplate,
  tableTemplate,
  tabsTemplate,
  taskItemTemplate,
  timePickerTemplate,
  toggleSwitchTemplate,
  tooltipTemplate
} from "./examples";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  @property({ type: Boolean }) darkTheme = false;
  @property({ type: Boolean }) lumos = false;

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.darkTheme) {
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }

  toggleSetting(event: MouseEvent) {
    const composedPath = event.composedPath();
    const target = (composedPath[0] as unknown) as HTMLOrSVGElement;
    const { aspect } = target.dataset;
    if (aspect === "lumos") {
      this.lumos = !this.lumos;
    } else if (aspect === "darkTheme") {
      this.darkTheme = !this.darkTheme;
    } else {
      console.error("Invalid data-aspect input");
      return;
    }
  }

  themeToggle() {
    return html`
      <div class="toggle-container">
        <label class="switch">
          <input
            type="checkbox"
            id="theme-switch"
            class="theme-switch"
            data-aspect="darkTheme"
            @click=${this.toggleSetting}
            ?checked=${this.darkTheme}
          />
          Dark Mode
        </label>
        <label class="switch">
          <input
            type="checkbox"
            class="lumos-switch"
            data-aspect="lumos"
            @click=${this.toggleSetting}
            ?checked=${this.lumos}
          />
          Lumos Theme
        </label>
      </div>
    `;
  }

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <md-theme class="theme-toggle" id="app-theme" ?darkTheme=${this.darkTheme} ?lumos=${this.lumos}>
        ${this.themeToggle()}
        <elix-list-explorer class="explorer">
          <div class="container" aria-label="md-accordion">
            <h2>md-accordion</h2>
            <sass-stats component="accordion">
              ${accordionTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-alert-banner">
            <h2>md-alert-banner</h2>
            <sass-stats component="alert-banner">
              ${alertBannerTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-alert">
            <h2>md-alert</h2>
            <sass-stats component="alert">
              ${alertTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-avatar">
            <h2>md-avatar</h2>
            <sass-stats component="avatar">
              ${avatarTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-badge">
            <h2>md-badge</h2>
            <sass-stats component="badge">
              ${badgeTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-breadcrumb">
            <h2>md-breadcrumb</h2>
            <sass-stats component="breadcrumb">
              ${breadcrumbTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-button">
            <h2>md-button</h2>
            <sass-stats component="button">
              ${buttonTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-button-group">
            <h2>md-button-group</h2>
            <sass-stats component="button-group">
              ${buttonGroupTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-card">
            <h2>md-card</h2>
            <sass-stats component="card">
              ${cardTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-chat-message">
            <h2>md-chat-message</h2>
            <sass-stats component="chat-message">
              ${chatMessageTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-checkbox">
            <h2>md-checkbox</h2>
            <sass-stats component="checkbox">
              ${checkboxTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-chip">
            <h2>md-chip</h2>
            <sass-stats component="chip">
              ${chipTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-coachmark">
            <h2>md-coachmark</h2>
            <sass-stats component="coachmark">
              ${coachTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-code-editor">
            <h2>md-code-editor</h2>
            <sass-stats component="code-editor">
              ${codeEditorTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-combo-box">
            <h2>md-combobox</h2>
            <sass-stats component="combobox">
              ${comboBoxTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-datepicker">
            <h2>md-datepicker</h2>
            <sass-stats component="datepicker">
              ${datePickerTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-date-range-picker">
            <h2>md-date-range-picker</h2>
            <sass-stats component="datepicker">
              ${dateRangePickerTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-date-time-picker">
            <h2>md-date-time-picker</h2>
            <sass-stats component="date-time-picker">
              ${dateTimePickerTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-dropdown">
            <h2>md-dropdown</h2>
            <sass-stats component="dropdown">
              ${dropdownTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-draggable">
            <h2>md-draggable</h2>
            <sass-stats component="draggable">
              ${draggableTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-editable-field">
            <h2>md-editable-field</h2>
            <sass-stats component="editable-textfield">
              ${editableField}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-favorite">
            <h2>md-favorite</h2>
            <sass-stats component="favorite">
              ${favoriteTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-floating-modal">
            <h2>md-floating-modal</h2>
            <sass-stats component="floating-modal">
              ${floatingModalTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-form">
            <h2>md-form</h2>
            ${formTemplate}
          </div>

          <div class="container" aria-label="md-icon">
            <h2>md-icon</h2>
            <sass-stats component="icon">
              ${iconTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-input">
            <h2>md-input</h2>
            <sass-stats component="input">
              ${inputTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-input-file">
            <h2>md-input-file</h2>
            <sass-stats component="input-file">
              ${inputFileTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-label">
            <h2>md-label</h2>
            <sass-stats component="label">
              ${labelTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-link">
            <h2>md-link</h2>
            <sass-stats component="link">
              ${linkTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-list">
            <h2>md-list</h2>
            <sass-stats component="list">
              ${listTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-loading">
            <h2>md-loading</h2>
            <sass-stats component="loading">
              ${loadingTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-meeting-alert">
            <h2>md-meeting-alert</h2>
            <sass-stats component="meeting-alert">
              ${meetingAlertTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-menu">
            <h2>md-menu and md-menu-item</h2>
            <sass-stats component="menu">
              ${menuItemTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-menu-overlay">
            <h2>md-menu-overlay</h2>
            <sass-stats component="menu-overlay">
              ${menuOverlayTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-modal">
            <h2>md-modal</h2>
            <sass-stats component="modal">
              ${modalTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-pagination">
            <h2>md-pagination</h2>
            <sass-stats component="pagination">
              ${paginationTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-phone-input">
            <h2>md-phone-input</h2>
            <sass-stats component="phone-input">
              ${phoneInputTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-progress-bar">
            <h2>md-progress-bar</h2>
            <sass-stats component="progress-bar">
              ${progressBarTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-radio">
            <h2>md-radio</h2>
            <sass-stats component="radio">
              ${radioGroupTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-slider">
            <h2>md-slider</h2>
            <sass-stats component="slider">
              ${sliderTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-spinner">
            <h2>md-spinner</h2>
            <sass-stats component="spinner">
              ${spinnerTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-table">
            <h2>md-table</h2>
            <sass-stats component="table">
              ${tableTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-table-advanced">
            <h2>md-table-advanced</h2>
            <sass-stats component="table-advanced">
              ${tableAdvancedTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-tabs">
            <h2>md-tabs</h2>
            <sass-stats component="tabs">
              ${tabsTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-task-item">
            <h2>md-task-item</h2>
            <sass-stats component="taskitem">
              ${taskItemTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-timepicker">
            <h2>md-timepicker</h2>
            <sass-stats component="timepicker">
              ${timePickerTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-toggle-switch">
            <h2>md-toggle-switch</h2>
            <sass-stats component="toggle-switch">
              ${toggleSwitchTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="md-tooltip">
            <h2>md-tooltip</h2>
            <sass-stats component="tooltip">
              ${tooltipTemplate}
            </sass-stats>
          </div>

          <div class="container" aria-label="internal/colors">
            <h2>Colors</h2>
            ${colorTableTemplate}
          </div>
        </elix-list-explorer>
      </md-theme>
    `;
  }
}
