import React from 'react';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You could also send error to logging service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Determine error message based on error type
      let errorMessage = "We encountered an unexpected error. Please try refreshing the page.";
      
      if (this.state.error?.message) {
        if (this.state.error.message.includes('Loading chunk')) {
          errorMessage = "Failed to load application resources. This usually happens after an update. Please refresh the page.";
        } else if (this.state.error.message.includes('Network')) {
          errorMessage = "Network error occurred. Please check your internet connection and try again.";
        }
      }

      return (
        <div onClick={this.handleReset}>
          <ErrorPage
            title="Application Error"
            message={errorMessage}
            showHomeButton={true}
            showRefreshButton={true}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;