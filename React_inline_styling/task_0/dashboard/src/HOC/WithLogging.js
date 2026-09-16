import React from 'react';

function getComponentName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function WithLogging(WrappedComponent) {
  class LoggedComponent extends React.Component {
    componentDidMount() {
      console.log(`Component ${getComponentName(WrappedComponent)} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${getComponentName(WrappedComponent)} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  LoggedComponent.displayName = `WithLogging(${getComponentName(WrappedComponent)})`;

  return LoggedComponent;
}

export default WithLogging;
