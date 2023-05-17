import CollapsibleOne from "@components/CollapsibleOne";
import CollapsibleThree from "@components/CollapsibleThree";
import markdownToHtml from "../lib/markdownToHtml";
import Checkout from "@components/Checkout";
import CollapsibleTwo from "@components/CollapsibleTwo";
import { getFluidImage } from "@components/image/imageFunctions";
import { useEffect, useState } from "react";
import keccak256 from "keccak256";

import { useStore } from "@components/Store";
import { useRouter } from "next/router";
// import PDFTest from "@components/PDFTest";

export default function Index({ data, headerHeight }) {
  const changeDate = useStore((state) => state.changeDate);
  const changeTime = useStore((state) => state.changeTime);
  const initCart = useStore((state) => state.initCart);

  const router = useRouter();
  let query = router.query;

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

  const [password, setPassword] = useState();
  const [decoded, setDecoded] = useState();

  const secret =
    "5089ea2ce7fb457c3955e5fbe8334daad69ecae24e5764a70de1a563b51589e7";

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("password"));
    if (items) {
      setDecoded(items);
    }

    if (query.d1) {
      const day = query.d1.slice(0, 2).padStart(2, "0");
      const month = query.d1.slice(2, 4).padStart(2, "0");
      const year = parseInt(query.d1.slice(4, 8));
      const startTime = parseFloat(query.d1.split(",")[1]);
      const finishTime = parseFloat(query.d1.split(",")[2]);
      changeDate(
        { day, month, year, iso: `${year}-${month}-${day}` },
        "dateOne"
      );
      changeTime([startTime, finishTime], "dateOne");
    }

    if (query.d2) {
      const day = query.d2.slice(0, 2).padStart(2, "0");
      const month = query.d2.slice(2, 4).padStart(2, "0");
      const year = parseInt(query.d2.slice(4, 8));
      const startTime = parseFloat(query.d2.split(",")[1]);
      const finishTime = parseFloat(query.d2.split(",")[2]);
      changeDate(
        { day, month, year, iso: `${year}-${month}-${day}` },
        "dateTwo"
      );
      changeTime([startTime, finishTime], "dateTwo");
    }

    if (query.item) {
      let items = typeof query.item === "string" ? [query.item] : query.item;

      items.map((item) => {
        const category = item.split(".")[0];
        const products = item.split(".")[1].split(";");
        products.map((product) => {
          options[category][parseInt(product.split(",")[0])].amount = parseInt(
            product.split(",")[1]
          );
        });
      });
    }
    initCart(options);
  }, [query]);

  return (
    <>
      {decoded !== secret ? (
        <form className="flex items-center text-white justify-center h-[70vh]">
          <label>
            <span className="block pb-2">Пароль:</span>
            <input
              className="text-black"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value),
                  setDecoded(keccak256(event.target.value).toString("hex"));
                localStorage.setItem(
                  "password",
                  JSON.stringify(keccak256(event.target.value).toString("hex"))
                );
              }}
              type="text"
              name="password"
            />
          </label>
        </form>
      ) : (
        <>
          {/* <PDFTest conf data={data} /> */}
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
          <section className="relative z-10 page-container  md:!pb-[26rem] !space-y-8 lg:!space-y-8 !pt-16">
            <article className="pb-8">
              <h1 className="pb-2 !text-4xl text-center text-white uppercase lg:text-5xl">
                {data.admin.headingOne}
              </h1>
              <p className="pb-5 text-center uppercase lg:text-3xl text-primary-gray-medium">
                {data.admin.subHeadingOne}
              </p>
              <p className="max-w-3xl mx-auto !leading-none md:!leading-none !text-sm  md:!text-lg text-center text-white theme-text">
                {data.admin.textOne}
              </p>
            </article>
            <div className="space-y-[0.625rem] lg:space-y-8">
              <CollapsibleOne conf headerHeight={headerHeight} data={data} />
              <CollapsibleTwo conf headerHeight={headerHeight} data={data} />
              <CollapsibleThree conf headerHeight={headerHeight} data={data} />
            </div>
            <Checkout conf data={data} />
          </section>
        </>
      )}
    </>
  );
}

export async function getStaticProps() {
  const data = await import(`../cms/pages/homepage.json`);
  const header = await import(`../cms/config/header.json`);
  const seo = await import(`../cms/config/seo.json`);

  data.collapsibleOne.prices = await markdownToHtml(data.collapsibleOne.prices);
  data.collapsibleTwo.prices = await markdownToHtml(data.collapsibleTwo.prices);
  data.collapsibleOne.image = await getFluidImage(data.collapsibleOne.image);
  data.collapsibleTwo.image = await getFluidImage(data.collapsibleTwo.image);
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
        item.price = 0;
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
