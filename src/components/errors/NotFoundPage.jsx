import React from 'react';
import ErrorPage from './ErrorPage';

export default function NotFoundPage() {
  return (
    <ErrorPage
      title="Page Not Found"
      message="The page you're looking for doesn't exist. It may have been moved or deleted."
      errorCode="404"
      showHomeButton={true}
      showRefreshButton={false}
    />
  );
}