import React, { ReactNode } from "react";

type FallbackRender = (props: { error: Error | null; resetError: () => void }) => ReactNode;

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: FallbackRender;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean; error: Error | null }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { fallback, children } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      return fallback({ error, resetError: this.resetError });
    }

    return children;
  }
}

export default ErrorBoundary;
