import { useEffect } from "react";
import DiscountInput from "./DiscountInput";
import { useStore } from "./Store";
import { numberWithCommas } from "./utils/NumberWithCommas";
import getItemTotalPrice from "./utils/GetItemTotalPrice";

export default function SummaryOne({ data, conf }) {
  const dates = useStore((state) => state.dates);
  const changeTotal = useStore((state) => state.changeTotal);
  const shoppingCart = useStore((state) => state.shoppingCart);
  const totalForSections = useStore((state) => state.totalForSections);
  const discounts = useStore((state) => state.discounts);
  const changeDiscounts = useStore((state) => state.changeDiscounts);
  const cart = shoppingCart.extras.filter((item) => item.amount > 0);

  let totalForSection =
    typeof totalForSections.dateOne === "number" &&
    !isNaN(totalForSections.dateOne)
      ? totalForSections.dateOne
      : 0;

  shoppingCart.extras.forEach(
    (item) => (totalForSection += getItemTotalPrice(item))
  );

  useEffect(() => {
    changeTotal(totalForSection, "one");
  }, [totalForSection]);

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
        {typeof totalForSections.dateOne === "number" &&
          !isNaN(totalForSections.dateOne) &&
          totalForSections.dateOne > 0 && (
            <div className="flex items-baseline justify-between">
              <p className="text-xs lg:text-sm">
                {data.collapsibleOne.titleForSummary}{" "}
                <span className="whitespace-pre-line lg:hidden">{"\n"}</span>
                <span className="text-primary-gray-medium">
                  {`${dates.dateOne.date.day
                    .toString()
                    .padStart(2, "0")}.${dates.dateOne.date.month
                    .toString()
                    .padStart(2, "0")} (${capitalizeFirstLetter(
                    new Intl.DateTimeFormat("ru", {
                      weekday: "long",
                    }).format(new Date(dates.dateOne.date.iso))
                  )}), ${data.smallTexts.time} ${
                    (dates.dateOne.time[0] * 2) % 2 !== 0
                      ? dates.dateOne.time[0] - 0.5 + ":30"
                      : dates.dateOne.time[0] + ":00"
                  }-${((dates.dateOne.time[1] * 2) % 2 !== 0
                    ? dates.dateOne.time[1] - 0.5 + ":30"
                    : dates.dateOne.time[1] + ":00"
                  ).replace("24:00", "00:00")}`}
                </span>
              </p>
              <p className="text-xs font-semibold lg:text-sm">
                {`${numberWithCommas(totalForSections.dateOne)} р.`}
              </p>
            </div>
          )}
        {cart.map((item, i) => (
          <div key={i} className="flex items-baseline justify-between">
            <p className="text-xs lg:text-sm">
              {item.heading}
              {item.amount > 1 && (
                <span className="text-primary-gray-medium">
                  {` ${item.amount}x`}
                </span>
              )}
            </p>
            <p className="text-xs font-semibold lg:text-sm">
              {item.from === "true" && "От "}
              {`${numberWithCommas(getItemTotalPrice(item))} р.`}
            </p>
          </div>
        ))}
        {cart.length === 0 &&
          (typeof totalForSections.dateOne !== "number" ||
            isNaN(totalForSections.dateOne) ||
            totalForSections.dateOne === 0) && (
            <div className="flex items-baseline justify-between">
              <p className="text-xs lg:text-sm">
                {data.smallTexts.youHaventChosen}
              </p>
            </div>
          )}
      </div>
      {conf && (
        <DiscountInput
          input={discounts["one"]}
          handleOnClick={changeDiscounts}
          data={data}
          num="one"
        />
      )}
      <hr className="my-5 border-primary-gray-medium" />
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold">
          {conf ? data.smallTexts.totalWithDiscount : data.smallTexts.total}
        </p>
        <p className="text-lg font-semibold">
          {`${numberWithCommas(
            Math.round(totalForSection * (1 - discounts["one"]))
          )} р.`}
        </p>
      </div>
    </div>
  );
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
