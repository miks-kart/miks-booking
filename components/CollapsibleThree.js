import Collapsible from "./Collapsible";
import SaleItem from "./SaleItem";
import SummaryThree from "./SummaryThree";
import BookItem from "./BookItem";

export default function CollapsibleThree({ data, headerHeight, conf }) {
  return (
    <Collapsible
      duration={0.5}
      num="three"
      headerHeight={headerHeight}
      data={data}
      title={data.collapsibleThree.title}
    >
      <p className="!leading-none md:!leading-none pb-4 whitespace-pre-line md:text-lg">
        {data.collapsibleThree.text}
      </p>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.saladsTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.salads.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="salads" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.menuTitle}
        <span className="text-primary-gray-medium">
          {" "}
          {data.collapsibleThree.menuSubitle}
        </span>
      </p>
      <div className="item-grid">
        {data.collapsibleThree.menu.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="menu" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.pastaTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.pasta.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="pasta" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.sandwitchTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.sandwitches.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="sandwitches" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.snacksTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.snacks.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="snacks" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.fishTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.fish.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="fish" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.meatTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.meat.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="meat" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.sidesTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.sides.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="sides" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.sausesTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.sauses.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="sauses" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.breadTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.bread.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="bread" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.desertTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.desert.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="desert" />
        ))}
      </div>
      {/* <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.barTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.bar.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="bar" />
        ))}
      </div> */}
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.drinksTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.drinks.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="drinks" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.beerTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.beer.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="beer" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.beerBottleTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.beerBottle.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="beerBottle" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.teaTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.tea.map((item, i) => (
          <SaleItem lightbox item={item} key={i} category="tea" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.extrasTitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.extrasOpt.map((item, i) => (
          <BookItem item={item} key={i} category="extrasOpt" />
        ))}
      </div>
      <p className="pt-5 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleThree.hallTitle}
      </p>
      <p className="pt-[0.625rem] text-sm lg:pt-8 lg:pb-4 md:text-lg">
        {data.collapsibleThree.hallSubtitle}
      </p>
      <div className="item-grid">
        {data.collapsibleThree.hall.map((item, i) => (
          <BookItem
            inputPrice
            conf={conf}
            item={item}
            key={i}
            category="hall"
          />
        ))}
      </div>
      <hr className="mt-5 -mx-5 border-black lg:mt-10 md:-ml-12 md:-mr-12" />
      <SummaryThree conf={conf} data={data} />
    </Collapsible>
  );
}
