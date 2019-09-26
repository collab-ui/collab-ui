import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {
  Sidebar,
  SidebarBody,
  SidebarNav,
  SidebarNavItem,
} from '@momentum-ui/react';
import CheckboxKitchenSink from '../../../lib/Checkbox/examples/KitchenSink';
import CardKitchenSink from '../../../lib/Card/examples/KitchenSink';
import InputKitchenSink from '../../../lib/Input/examples/KitchenSink';
import RadioKitchenSink from '../../../lib/Radio/examples/KitchenSink';
import SliderKitchenSink from '../../../lib/Slider/examples/KitchenSink';
import EventOverlay from '../EventOverlay';

export default class KitchenSink extends React.PureComponent {
  render() {
    return (
      <>
        <div className="docs-container--with-side-nav">
          <Sidebar
            className="docs-container__side-nav"
            isPageLevel
            withIcons={false}
          >
            <SidebarBody>
              <SidebarNav>
                <SidebarNavItem
                  customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/playground`} />}
                  keyboardKey="p"
                  title="Playground"
                />
                <SidebarNavItem keyboardKey="k" title="Kitchen Sink">
                  <SidebarNavItem
                    key={`CardKitchenSink`}
                    customAnchorNode={
                      <NavLink activeClassName="md-active-nav" to={`/card`} />
                    }
                    className="md-list-item--primary"
                    keyboardKey="card"
                    title="card"
                  />
                  <SidebarNavItem
                    key={`CheckboxKitchenSink`}
                    customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/checkbox`} />}
                    className="md-list-item--primary"
                    keyboardKey="checkbox"
                    title="checkbox"
                  />
                  <SidebarNavItem
                    key={`InputKitchenSink`}
                    customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/input`} />}
                    className="md-list-item--primary"
                    keyboardKey="input"
                    title="input"
                  />
                  <SidebarNavItem
                    key={`RadioKitchenSink`}
                    customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/radio`} />}
                    className="md-list-item--primary"
                    keyboardKey="radio"
                    title="radio"
                  />
                  <SidebarNavItem
                    key={`SliderKitchenSink`}
                    customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/slider`} />}
                    className="md-list-item--primary"
                    keyboardKey="slider"
                    title="slider"
                  />
                  <SidebarNavItem
                    key={`EventOverlay`}
                    customAnchorNode={
                      <NavLink activeClassName="md-active-nav" to={`/event-overlay`} />
                    }
                    className="md-list-item--primary"
                    keyboardKey="event overlay"
                    title="event overlay"
                  />
                </SidebarNavItem>
              </SidebarNav>
            </SidebarBody>
          </Sidebar>
          <div className="docs-container__content">
            <h1>React Kitchen Sink</h1>
            <Switch>
              <Route
                key={`CardKitchenSink`}
                exact
                path={`/card`}
                render={() => <CardKitchenSink />}
              />
              <Route
                key={`CheckboxKitchenSink`}
                exact
                path={`/checkbox`}
                render={() => <CheckboxKitchenSink />}
              />
              <Route
                key={`InputKitchenSink`}
                exact
                path={`/input`}
                render={() => <InputKitchenSink />}
              />
              <Route
                key={`RadioKitchenSink`}
                exact
                path={`/radio`}
                render={() => <RadioKitchenSink />}
              />
              <Route
                key={`SliderKitchenSink`}
                exact
                path={`/slider`}
                render={() => <SliderKitchenSink />}
              />
              <Route
                key={`EventOverlay`}
                exact
                path={`/event-overlay`}
                render={() => <EventOverlay />}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}
