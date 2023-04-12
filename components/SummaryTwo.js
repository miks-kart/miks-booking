// import { useEffect } from "react";
import { useStore } from "./Store";
import DiscountInput from "./DiscountInput";
import { numberWithCommas } from "./utils/NumberWithCommas";

export default function SummaryTwo({ data, conf }) {
  const dates = useStore((state) => state.dates);
  // const changeTotal = useStore((state) => state.changeTotal);
  const totalForSections = useStore((state) => state.totalForSections);
  const discounts = useStore((state) => state.discounts);
  const changeDiscounts = useStore((state) => state.changeDiscounts);
  let totalForSection =
    typeof totalForSections.dateTwo === "number" &&
    !isNaN(totalForSections.dateTwo)
      ? totalForSections.dateTwo
      : 0;

  // useEffect(() => {
  //   changeTotal(totalForSection, "two");
  // }, [totalForSection]);

  return (
    <div className="pt-5 lg:pt-14">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold lg:text-sm">
          {data.smallTexts.youChose}
        </p>
        <p className="text-xs font-semibold lg:text-sm">
          {data.smallTexts.price}
        </p>
      </div>
      <hr className="my-5 border-primary-gray-medium" />
      <div className="space-y-2">
        {typeof totalForSections.dateTwo === "number" &&
          !isNaN(totalForSections.dateTwo) &&
          totalForSections.dateTwo > 0 && (
            <div className="flex items-baseline justify-between">
              <p className="text-xs lg:text-sm">
                {data.collapsibleTwo.titleForSummary}{" "}
                <span className="whitespace-pre-line lg:hidden">{"\n"}</span>
                <span className="text-primary-gray-medium">
                  {`${dates.dateTwo.date.day
                    .toString()
                    .padStart(2, "0")}.${dates.dateTwo.date.month
                    .toString()
                    .padStart(2, "0")} (${capitalizeFirstLetter(
                    new Intl.DateTimeFormat("ru", {
                      weekday: "long",
                    }).format(new Date(dates.dateTwo.date.iso))
                  )}), ${data.smallTexts.time} ${
                    (dates.dateTwo.time[0] * 2) % 2 !== 0
                      ? dates.dateTwo.time[0] - 0.5 + ":30"
                      : dates.dateTwo.time[0] + ":00"
                  }-${((dates.dateTwo.time[1] * 2) % 2 !== 0
                    ? dates.dateTwo.time[1] - 0.5 + ":30"
                    : dates.dateTwo.time[1] + ":00"
                  ).replace("24:00", "00:00")}`}
                </span>
              </p>
              <p className="text-xs font-semibold lg:text-sm">
                {`${numberWithCommas(totalForSections.dateTwo)} р.`}
              </p>
            </div>
          )}
        {(typeof totalForSections.dateTwo !== "number" ||
          isNaN(totalForSections.dateTwo) ||
          totalForSections.dateTwo === 0) && (
          <div className="flex items-baseline justify-between">
            <p className="text-xs lg:text-sm">
              {data.smallTexts.youHaventChosen}
            </p>
          </div>
        )}
      </div>
      {conf && (
        <DiscountInput
          input={discounts["two"]}
          handleOnClick={changeDiscounts}
          data={data}
          num="two"
        />
      )}
      <hr className="my-5 border-primary-gray-medium" />
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold">
          {conf ? data.smallTexts.totalWithDiscount : data.smallTexts.total}
        </p>
        <p className="text-lg font-semibold">
          {`${numberWithCommas(
            Math.round(totalForSection * (1 - discounts["two"]))
          )} р.`}
        </p>
      </div>
    </div>
  );
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
