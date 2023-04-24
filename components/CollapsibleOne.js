import Calendar from "./Calendar";
import Collapsible from "./Collapsible";
import HourSelector from "./HourSelector";
import SaleItem from "./SaleItem";
import SummaryOne from "./SummaryOne";
import { useStore } from "./Store";
import ImageSimple from "./image/ImageSimple";

function ResetButton({ data, dataNum }) {
  const resetDateTime = useStore((state) => state.resetDateTime);
  const changeTotal = useStore((state) => state.changeTotal);
  return (
    <button
      onClick={() => {
        resetDateTime(dataNum);
        changeTotal(0, dataNum);
      }}
      className={`text-sm duration-300 text-left pt-5 hover:opacity-70 font-medium text-primary-red`}
    >
      {data.smallTexts.reset}
    </button>
  );
}

export default function CollapsibleOne({ data, headerHeight, conf }) {
  return (
    <Collapsible
      duration={0.3}
      num="one"
      headerHeight={headerHeight}
      data={data}
      title={data.collapsibleOne.title}
    >
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <ImageSimple
          sizes="(min-width: 1024px) 360px, 80vw"
          style={{
            aspectRatio: data.collapsibleOne.image.aspectRatio,
          }}
          src={data.collapsibleOne.image}
          alt=""
          className="lg:max-w-[22.5rem] rounded-2xl w-full mb-auto"
        />
        <div className="w-full pt-5 lg:pt-0">
          <p className="pb-4 text-xl uppercase md:text-2xl">
            {data.collapsibleOne.dateAndTime}
          </p>
          {/* <ResetButton desktop dataNum="dateOne" data={data} /> */}

          <div
            className="theme-text !leading-[1.35] markdown-text space-y-2"
            dangerouslySetInnerHTML={{ __html: data.collapsibleOne.prices }}
          />
          <p className="theme-text !leading-[1.1] pt-5 !text-xs text-primary-gray-medium">
            {data.collapsibleOne.subText}
          </p>
        </div>
        <div className="flex flex-col pt-5 lg:pt-0 max-w-[19rem]">
          <Calendar dataNum="dateOne" />
          <HourSelector
            carting
            prices={data.collapsibleOne.price}
            date="dateOne"
            data={data}
          />
          <ResetButton dataNum="dateOne" data={data} />
        </div>
      </div>
      <p className="pt-10 text-xl uppercase lg:pt-10 md:text-2xl">
        {data.collapsibleOne.extras}
      </p>
      <div className="item-grid">
        {data.collapsibleOne.items.map((item, i) => (
          <SaleItem item={item} key={i} category="extras" />
        ))}
      </div>
      <hr className="mt-5 -mx-5 border-black lg:mt-10 md:-ml-12 md:-mr-12" />
      <SummaryOne conf={conf} data={data} />
    </Collapsible>
  );
}
