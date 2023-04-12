import { useEffect } from "react";

export default function Index({ data, headerHeight, homepage }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="relative w-screen h-0 z-[1]">
        <img
          src={homepage.background.desktop}
          alt=""
          className="absolute top-0 left-0 hidden w-screen h-auto -mt-12 pointer-events-none md:block"
        />
        <img
          src={homepage.background.mobile}
          alt=""
          className="absolute top-0 left-0 w-screen h-auto pointer-events-none md:hidden"
        />
      </div>
      <section
        style={{ marginTop: "-" + headerHeight + "px" }}
        className="w-screen "
      >
        <div className="flex items-center justify-center h-screen text-center page-container">
          <article>
            <h1 className="!pb-2 text-primary-red text-[5.625rem]  leading-none font-bold">
              {data.headingOne}
            </h1>
            <p className="text-3xl text-white whitespace-pre-line">
              {data.textOne}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
export async function getStaticProps() {
  const homepage = await import(`../cms/pages/homepage.json`);
  const data = await import(`../cms/pages/404.json`);
  const header = await import(`../cms/config/header.json`);
  const seo = await import(`../cms/config/seo.json`);

  return {
    props: {
      header: header.default,
      homepage: homepage.default,
      data: data.default,
      seo: seo.default,
    },
  };
}
