import SmartOutline from "@components/utils/SmartOutline";
import Header from "@components/Header";
import HeaderPlaceholderSmall from "@components/HeaderPlaceholderSmall";
import HeaderPlaceholder from "@components/HeaderPlaceholder";
import SEO from "@components/seo";
import "../styles/style.css";
import { Rubik } from "next/font/google";
import { useRef } from "react";
import useSize from "@react-hook/size";
import { ProgressiveImageSupportProvider } from "@components/image/ProgressiveImageSupportContext";
import Script from "next/script";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
});

function App({ Component, pageProps }) {
  const target = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [_, headerHeight] = useSize(target);
  pageProps.headerHeight = headerHeight;

  return (
    <ProgressiveImageSupportProvider>
      <style jsx global>{`
        :root {
          --font-rubik: ${rubik.style.fontFamily};
        }
      `}</style>
      <main
        style={{
          backgroundColor: pageProps.blueBg ? "#08091E" : "transparent",
        }}
      >
        <SmartOutline />
        <Metrika />
        <SEO
          description={pageProps.data.description}
          title={pageProps.data.title}
          seo={pageProps.seo}
        />
        <Header data={pageProps.header} />
        <HeaderPlaceholder data={pageProps.header} />
        <HeaderPlaceholderSmall ref={target} data={pageProps.header} />
        <div className="relative z-50" id="BukzaContainer24860"></div>
        <div className="relative z-50" id="BukzaContainer24861"></div>
        <div className="relative z-50" id="BukzaContainer24852"></div>

        <Component {...pageProps} />
      </main>
    </ProgressiveImageSupportProvider>
  );
}

function Metrika() {
  return (

      <>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/98E3"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        <Script
          id="gtm-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   
   ym(98E3, "init", {
     clickmap:true,
     trackLinks:true,
     accurateTrackBounce:true,
     webvisor:true
    });`,
          }}
        />
      </>
    
  );
}


export default App;
