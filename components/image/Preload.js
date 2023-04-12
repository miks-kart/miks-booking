import { ProgressiveImageSupportContext } from "@components/ProgressiveImageSupportContext";
import Head from "next/head";
import { useContext } from "react";

export default function Preload({ src, sizes = "100vw" }) {
  const { ProgressiveImageSupport } = useContext(
    ProgressiveImageSupportContext
  );

  const webpFormat = src.formats?.find((item) => item.format === "image/webp");
  const avifFormat = src.formats?.find((item) => item.format === "image/avif");
  let imageSrcSet;

  if (src.dimensions?.type === "svg") {
    imageSrcSet = undefined;
  } else if (ProgressiveImageSupport.avif && avifFormat) {
    imageSrcSet = avifFormat.srcSet;
  } else if (ProgressiveImageSupport.webp && webpFormat) {
    imageSrcSet = webpFormat.srcSet;
  } else if (ProgressiveImageSupport.webp && src.srcSetWebp) {
    imageSrcSet = src.srcSetWebp;
  } else if (src.srcSetOriginal) {
    imageSrcSet = src.srcSetOriginal;
  } else if (src.formats && src.formats[0].srcSet) {
    imageSrcSet = src.formats[0].srcSet;
  }
  return (
    <Head>
      <link
        key={JSON.stringify(src)}
        as="image"
        rel="preload"
        imageSrcSet={imageSrcSet}
        href={imageSrcSet ? undefined : src.src}
        imageSizes={imageSrcSet ? undefined : sizes}
      />
    </Head>
  );
}
