import SmartOutline from "@components/utils/SmartOutline";
import Header from "@components/Header";
import HeaderPlaceholderSmall from "@components/HeaderPlaceholderSmall";
import HeaderPlaceholder from "@components/HeaderPlaceholder";
import SEO from "@components/seo";
import "../styles/style.css";
import { Rubik } from "next/font/google";
import { useRef } from "react";
import useSize from "@react-hook/size";
import { ProgressiveImageSupportProvider } from "@components/ProgressiveImageSupportContext";

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
      <main
        style={{
          backgroundColor: pageProps.blueBg ? "#08091E" : "transparent",
        }}
        className={`${rubik.variable} font-sans`}
      >
        <SmartOutline />

        <SEO
          description={pageProps.data.description}
          title={pageProps.data.title}
          seo={pageProps.seo}
        />
        <Header data={pageProps.header} />
        <HeaderPlaceholder data={pageProps.header} />
        <HeaderPlaceholderSmall ref={target} data={pageProps.header} />
        <div className="relative z-50" id="BukzaContainer24486"></div>
        <div className="relative z-50" id="BukzaContainer24549"></div>
        <div className="relative z-50" id="BukzaContainer24550"></div>

        <Component {...pageProps} />
      </main>
    </ProgressiveImageSupportProvider>
  );
}

export default App;
