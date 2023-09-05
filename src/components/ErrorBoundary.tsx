import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  error?: Error;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log({ error, errorInfo });
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      //   showNotification({
      //     title: "Oops, there is an error!",
      //     message: this.state.error.message,
      //   });
      console.error(this.state.error);
    }

    return this.props.children;
  }
}
