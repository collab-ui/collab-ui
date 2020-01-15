import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Spinner } from '@momentum-ui/react';
import DataVisualization from '../DataVisualization';
import Component from '../Component';
import Overview from '../Overview';
import Content from '../Content';
import NotFoundPage from '../../components/NotFound';

class RouteContainer extends React.Component {
  render() {
    const {
      error,
      loading,
      match,
      routes,
      ...props
    } = this.props;

    const matchPathToRoute = () => {
      return (
        routes.reduce((agg, route) => (
          `${match.url}`.match(/([^/][^/]+)/)[0] === `${route.path}`
            ? { id: route.object_id, child: route }
            : agg
        ), null)
      );
    };

    const ifDataVisualizationComponent = (child) => {
      return child.path.indexOf('charts') !== -1;
    };

    const fetchRenderComponent = (child, isContent) => {
      if (child) {
        if (isContent) {
          return <Content id={child.object_id} {...props} />;
        } else if (ifDataVisualizationComponent(child)) {
          return <DataVisualization child={child} match={match} {...props} />;
        } else {
          return <Component child={child} match={match} {...props} />;
        }
      }
      return null;
    };

    const getChildComponent = (child, matchString) => {
      return child.children &&
        child.children.reduce((agg, item) => (
          item.object_slug === matchString
            ? item
            : agg
        ), null);
    };

    const getComponent = () => {

      const currentRoute = matchPathToRoute();
      const isStyleOrComponent = ['styles', 'components','charts'].includes(`${match.url}`.match(/([^/][^/]+)/)[0]);

      if (match.params.subSection) {
        return (
          fetchRenderComponent(
            getChildComponent(
              getChildComponent(currentRoute.child, match.params.section), match.params.subSection
            ),
            !isStyleOrComponent
          )
        );
      } else if (match.params.section) {
        return (
          fetchRenderComponent(
            getChildComponent(currentRoute.child, match.params.section),
            !isStyleOrComponent
          )
        );
      } else {
        return (
          <Overview {...currentRoute} {...props} />
        );
      }
    };

    return (
      loading
        ? <Spinner />
        : (
          !error &&
          routes &&
          routes.length &&
          matchPathToRoute() &&
          getComponent()
          ||
          <Route component={NotFoundPage} />
        )
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routesReducer.routes,
  error: state.routesReducer.error,
  loading: state.routesReducer.loading
});

RouteContainer.propTypes = {
  routes: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

RouteContainer.displayName = 'RouteContainer';

export default connect(mapStateToProps)(RouteContainer);


