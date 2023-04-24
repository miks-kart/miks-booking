import Calendar from "./Calendar";
import Collapsible from "./Collapsible";
import HourSelector from "./HourSelector";
import SummaryTwo from "./SummaryTwo";
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

export default function CollapsibleTwo({ data, headerHeight, conf }) {
  return (
    <Collapsible
      duration={0.2}
      num="dateTwo"
      headerHeight={headerHeight}
      data={data}
      title={data.collapsibleTwo.title}
    >
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <ImageSimple
          style={{
            aspectRatio: data.collapsibleTwo.image.aspectRatio,
          }}
          sizes="(min-width: 1024px) 360px, 80vw"
          src={data.collapsibleTwo.image}
          alt=""
          className="lg:max-w-[22.5rem] rounded-2xl w-full mb-auto"
        />
        <div className="w-full pt-5 lg:pt-0">
          <p className="pb-4 text-xl uppercase lg:pb-0 md:text-2xl">
            {data.collapsibleTwo.dateAndTime}
          </p>
          {/* <ResetButton desktop dataNum="dateTwo" data={data} /> */}

          <div
            className="theme-text !leading-[1.35] markdown-text space-y-2"
            dangerouslySetInnerHTML={{ __html: data.collapsibleTwo.prices }}
          />
          <p className="theme-text !leading-[1] pt-5 !text-xs text-primary-gray-medium">
            {data.collapsibleTwo.subText}
          </p>
        </div>
        <div className="flex flex-col pt-5 lg:pt-0 max-w-[19rem]">
          <Calendar dataNum="dateTwo" />
          <HourSelector
            prices={data.collapsibleTwo.price}
            date="dateTwo"
            data={data}
          />
          <ResetButton dataNum="dateTwo" data={data} />
        </div>
      </div>
      <hr className="mt-5 -mx-5 border-black lg:mt-10 md:-ml-12 md:-mr-12" />
      <SummaryTwo conf={conf} data={data} />
    </Collapsible>
  );
}
