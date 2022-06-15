import React from 'react';
import Router from 'next/router';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

// Track client-side page views with Segment
Router.events.on('routeChangeComplete', (url) => {
  window.analytics.page(url);
});

const Page: React.FC<Props> = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Page;
