import { ProgressiveImageSupportContext } from "@components/image/ProgressiveImageSupportContext";
import { useContext } from "react";
import Preload from "./Preload";

export default function ImageSimple({
  src,
  preload,
  alt = "",
  className,
  sizes = "100vw",
  loading = "lazy",
  ...props
}) {
  const { ProgressiveImageSupport } = useContext(
    ProgressiveImageSupportContext
  );

  function getSrcSet() {
    if (src.formats?.length === 0) {
      return undefined;
    } else if (ProgressiveImageSupport.webp) {
      return src.formats
        ? src.formats.find((item) => item.format === "image/webp").srcSet
        : src.srcSetWebp;
    } else {
      return src.formats
        ? src.formats.find(
            (item) =>
              item.format === "image/jpeg" || item.format === "image/png"
          ).srcSet
        : src.srcSetOriginal;
    }
  }
  const srcSet = getSrcSet();

  return (
    <>
      <img
        decoding="async"
        sizes={sizes}
        loading={loading}
        className={className}
        alt={alt}
        srcSet={srcSet}
        src={src.src}
        {...props}
      />
      {preload && <Preload src={src} sizes={sizes} />}
    </>
  );
}
