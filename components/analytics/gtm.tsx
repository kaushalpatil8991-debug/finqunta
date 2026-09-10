import Script from "next/script";
import { env, integrations } from "@/lib/env";

/**
 * Google Tag Manager loader. Renders nothing — just injects the GTM
 * container script + the <noscript> iframe fallback. Mounted once at
 * the root layout level.
 *
 * Loading strategy: `afterInteractive` — GTM will load after the page
 * becomes interactive, so it doesn't block hydration.
 *
 * No-op when NEXT_PUBLIC_GTM_ID is unset (local dev default).
 */
export function Gtm() {
  if (!integrations.analytics) return null;
  const id = env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      <Script id="gtm-loader" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="GTM"
        />
      </noscript>
    </>
  );
}
