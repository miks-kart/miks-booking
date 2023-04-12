import CollapsibleOne from "@components/CollapsibleOne";
import CollapsibleThree from "@components/CollapsibleThree";
import markdownToHtml from "../lib/markdownToHtml";
import Hero from "@components/Hero";
import Checkout from "@components/Checkout";
import CollapsibleTwo from "@components/CollapsibleTwo";
import {
  getFluidImage,
  getOptimizedImage,
} from "@components/image/imageFunctions";
import { useStore } from "@components/Store";
import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import PDFTest from "@components/PDFTest";

export default function Index({ data, headerHeight }) {
  const initCart = useStore((state) => state.initCart);
  const [isOpen, setIsOpen] = useState(false);

  let options = {
    extras: data.collapsibleOne.items,
    salads: data.collapsibleThree.salads,
    menu: data.collapsibleThree.menu,
    pasta: data.collapsibleThree.pasta,
    sandwitches: data.collapsibleThree.sandwitches,
    snacks: data.collapsibleThree.snacks,
    fish: data.collapsibleThree.fish,
    meat: data.collapsibleThree.meat,
    sides: data.collapsibleThree.sides,
    sauses: data.collapsibleThree.sauses,
    bread: data.collapsibleThree.bread,
    desert: data.collapsibleThree.desert,
    // bar: data.collapsibleThree.bar,
    drinks: data.collapsibleThree.drinks,
    beer: data.collapsibleThree.beer,
    beerBottle: data.collapsibleThree.beerBottle,
    tea: data.collapsibleThree.tea,
    extrasOpt: data.collapsibleThree.extrasOpt,
    hall: data.collapsibleThree.hall,
  };

  useLayoutEffect(() => {
    initCart(options);
  }, []);

  return (
    <>
      <div className="relative w-screen h-0 z-[1]">
        <img
          src={data.background.desktop}
          alt=""
          className="absolute top-0 left-0 hidden w-screen h-auto -mt-12 pointer-events-none md:block"
        />
        <img
          src={data.background.mobile}
          alt=""
          className="absolute top-0 left-0 w-screen h-auto pointer-events-none md:hidden"
        />
      </div>
      <AnimatePresence>
        {isOpen ? (
          <section className="relative z-10 page-container  md:!pb-[26rem] !space-y-8 !pt-16">
            <Hero data={data} />
            <div className="space-y-[0.625rem] lg:space-y-8">
              <CollapsibleOne headerHeight={headerHeight} data={data} />
              <CollapsibleTwo headerHeight={headerHeight} data={data} />
              <CollapsibleThree headerHeight={headerHeight} data={data} />
            </div>
            <Checkout data={data} />
          </section>
        ) : (
          <motion.section
            key="modal"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 page-container md:!pb-20 !space-y-0 !pt-16"
          >
            <img
              src={data.disc.icon}
              className="mx-auto mb-10 w-44 h-44"
              alt=""
            />
            <h2 className="pb-8 !text-4xl text-center text-white uppercase lg:text-5xl">
              {data.disc.heading}
            </h2>
            <p className="max-w-3xl pb-10 !leading-none md:!leading-none mx-auto !text-sm  md:!text-2xl text-center text-white theme-text">
              {data.disc.text}
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="mx-auto theme-button !table"
            >
              {data.disc.button}
            </button>
            <div className="grid grid-cols-2 gap-5 pt-20 lg:grid-cols-6">
              {data.disc.items.map(({ item }) => (
                <div className="" key={item.text}>
                  <img
                    src={item.image}
                    alt={item.text}
                    className="object-contain w-32 h-20 mx-auto lg:w-40 lg:h-28"
                  />
                  <p className="text-xs text-center text-white whitespace-pre-line">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

export async function getStaticProps() {
  const data = await import(`../cms/pages/homepage.json`);
  const header = await import(`../cms/config/header.json`);
  const seo = await import(`../cms/config/seo.json`);

  data.collapsibleOne.prices = await markdownToHtml(data.collapsibleOne.prices);
  data.collapsibleTwo.prices = await markdownToHtml(data.collapsibleTwo.prices);
  data.collapsibleOne.image = await getOptimizedImage(
    data.collapsibleOne.image
  );
  data.collapsibleTwo.image = await getOptimizedImage(
    data.collapsibleTwo.image
  );
  if (data.collapsibleOne.items[0].item?.text) {
    data.collapsibleOne.items = await Promise.all(
      data.collapsibleOne.items.map(async ({ item }) => {
        item.text = await markdownToHtml(item.text);
        item.image = await getFluidImage(item.image);
        item.amount = 0;
        return item;
      })
    );
    data.collapsibleThree.extrasOpt = await Promise.all(
      data.collapsibleThree.extrasOpt.map(async ({ item }) => {
        item.text = await markdownToHtml(item.text);
        item.image = await getFluidImage(item.image);
        item.amount = 0;
        return item;
      })
    );
    data.collapsibleThree.hall = await Promise.all(
      data.collapsibleThree.hall.map(async ({ item }) => {
        item.text = await markdownToHtml(item.text);
        item.image = await getFluidImage(item.image);
        item.amount = 0;
        return item;
      })
    );
    await Promise.all(
      [
        "salads",
        "menu",
        "pasta",
        "sandwitches",
        "snacks",
        "fish",
        "meat",
        "sides",
        "sauses",
        "bread",
        "desert",
        // "bar",
        "drinks",
        "beer",
        "beerBottle",
        "tea",
      ].map(async (key) => {
        data.collapsibleThree[key] = await Promise.all(
          data.collapsibleThree[key].map(async ({ item }) => {
            item.text = await markdownToHtml(item.text);
            item.image = await getFluidImage(item.image);
            item.amount = 0;
            return item;
          })
        );
      })
    );
  }

  return {
    props: {
      header: header.default,
      data: data.default,
      seo: seo.default,
    },
  };
}
