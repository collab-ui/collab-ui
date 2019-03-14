import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.defaultProps = {
  location: null,
  children: null
};

ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node
};

ScrollToTop.displayName = 'ScrollToTop';

export default withRouter(ScrollToTop);