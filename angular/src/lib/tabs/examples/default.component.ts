import { Component } from '@angular/core';

@Component({
  selector: 'example-tabs-default',
  template: `
    <md-tabs
      [focus]="0"
      className="MyClass"
      (whenSelect)="onClick($event)"
    >
      <md-tab-header heading="test"></md-tab-header>
      <md-tab-list>
        <md-tab>
          Onboarding
        </md-tab>

        <md-tab>
          Subscriptions
        </md-tab>

        <md-tab>
          Info
        </md-tab>
      </md-tab-list>

      <md-tab-content>
        <md-tab-pane>Pane A</md-tab-pane>
        <md-tab-pane>Pane B</md-tab-pane>
        <md-tab-pane>Pane C</md-tab-pane>
      </md-tab-content>
    </md-tabs>
  `,
})
export class ExampleTabsDefaultComponent {
  onClick = e => {
    console.info('tab idx: ', e);
  }
}
