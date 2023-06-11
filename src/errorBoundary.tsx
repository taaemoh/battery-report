import React, { ErrorInfo, ReactNode } from 'react';

type Props = {
  hasError: boolean;
  children?: ReactNode
}

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  static defaultProps = {
    hasError: false,
  };
  
  constructor(props: Props) {
    super(props);
    this.state = { hasError: props.hasError };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Error</h1>
          <h2>Unexpected error happened, more details can be found in console</h2>
        </div>
      )
    }

    return this.props.children; 
  }
}