import React from 'react';

interface State {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-lg bg-light-card/80 dark:bg-dark-card/80 border border-light-border dark:border-dark-border text-center">
          <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">Something went wrong.</h3>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">The chat page encountered an error. Try refreshing the page. If the problem persists, contact support.</p>
          {this.state.error && <pre className="mt-4 text-xs text-left overflow-auto max-h-40 bg-black/5 dark:bg-white/5 p-2 rounded">{this.state.error.message}</pre>}
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
