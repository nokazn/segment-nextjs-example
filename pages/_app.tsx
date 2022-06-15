import Page from '../components/Page';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import * as snippet from '@segment/snippet';

// This write key is associated with https://segment.com/nextjs-example/sources/nextjs.
const DEFAULT_WRITE_KEY = 'NPsk1GimHq09s7egCUlv7D0tqtUAU5wa';

function renderSnippet() {
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || DEFAULT_WRITE_KEY,
    // note: the page option only covers SSR tracking.
    // Page.js is used to track other events using `window.analytics.page()`
    page: true,
  };

  console.log(opts, process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'development') {
    return snippet.min(opts);
  }

  return snippet.min(opts);
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Page>
      {/* Inject the Segment snippet into the <head> of the document  */}
      <Script id='segment-script' dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
      <Component {...pageProps} />
    </Page>
  );
};

export default MyApp;
