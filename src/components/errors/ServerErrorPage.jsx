import React from 'react';
import ErrorPage from './ErrorPage';

export default function ServerErrorPage({ error }) {
  let title = "Server Error";
  let message = "We're experiencing technical difficulties. Please try again in a few moments.";
  let errorCode = "500";
  
  // Customize based on error type
  if (error?.code === 'NO_CONNECTION') {
    title = "No Internet Connection";
    message = "Please check your internet connection and try again.";
    errorCode = "503";
  } else if (error?.code === 'SESSION_EXPIRED') {
    title = "Session Expired";
    message = "Your session has expired. Please log in again.";
    errorCode = "401";
  } else if (error?.code === 'NETWORK_ERROR') {
    title = "Network Error";
    message = "Unable to connect to our servers. Please check your connection and try again.";
    errorCode = "503";
  }
  
  return (
    <ErrorPage
      title={title}
      message={message}
      errorCode={errorCode}
      showHomeButton={true}
      showRefreshButton={true}
    />
  );
}