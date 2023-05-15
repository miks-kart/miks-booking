import { ProgressiveImageSupportContext } from "@components/image/ProgressiveImageSupportContext";
import Head from "next/head";
import { useMemo, useContext } from "react";

export default function Preload({ src, sizes = "100vw" }) {
  const { ProgressiveImageSupport } = useContext(
    ProgressiveImageSupportContext
  );

  const webpFormat = src.formats?.find((item) => item.format === "image/webp");
  const avifFormat = src.formats?.find((item) => item.format === "image/avif");

  let imageSrcSet = useMemo(() => {
    if (src.dimensions?.type === "svg") {
      return undefined;
    } else if (ProgressiveImageSupport.avif && avifFormat) {
      return avifFormat.srcSet;
    } else if (ProgressiveImageSupport.webp && webpFormat) {
      return webpFormat.srcSet;
    } else if (ProgressiveImageSupport.webp && src.srcSetWebp) {
      return src.srcSetWebp;
    } else if (src.srcSetOriginal) {
      return src.srcSetOriginal;
    } else if (src.formats && src.formats[0].srcSet) {
      return src.formats.filter(
        (item) => item.format !== "image/avif" && item.format !== "image/webp"
      )[0].srcSet;
    }
  }, [ProgressiveImageSupport]);

  return (
    <Head>
      <link
        key={JSON.stringify(src)}
        as="image"
        rel="preload"
        imageSrcSet={imageSrcSet}
        href={imageSrcSet ? undefined : src.src}
        imageSizes={sizes}
      />
    </Head>
  );
}
