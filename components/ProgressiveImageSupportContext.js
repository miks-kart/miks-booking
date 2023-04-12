import { createContext, useEffect, useState } from "react";

export const ProgressiveImageSupportContext = createContext();

export function ProgressiveImageSupportProvider(props) {
  useEffect(() => {
    async function checkImageFormatSupport() {
      const webp = new Image();
      webp.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

      const avif = new Image();
      avif.src =
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";

      setProgressiveImageSupport({
        avif: avif.decode ? true : false,
        webp: webp.decode ? true : false,
      });
    }

    checkImageFormatSupport();
  }, []);

  const [ProgressiveImageSupport, setProgressiveImageSupport] = useState({
    webp: true,
    avif: true,
  });

  return (
    <ProgressiveImageSupportContext.Provider
      value={{ ProgressiveImageSupport, setProgressiveImageSupport }}
    >
      {props.children}
    </ProgressiveImageSupportContext.Provider>
  );
}
