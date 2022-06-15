import Page from '../components/Page';
import Script from 'next/script';
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

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      {/* Inject the Segment snippet into the <head> of the document  */}
      {/* <Script id='segment-script' dangerouslySetInnerHTML={{ __html: renderSnippet() }} /> */}
      <Script
        id='segment-script'
        dangerouslySetInnerHTML={{
          __html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="9K07vdFD94jKnYMIAFcTff03d12iE2dI";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.load("9K07vdFD94jKnYMIAFcTff03d12iE2dI");
  analytics.page();
  }}();`,
        }}
      />
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
