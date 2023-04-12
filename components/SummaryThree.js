import { useEffect } from "react";
import { useStore } from "./Store";
import DiscountInput from "./DiscountInput";
import { numberWithCommas } from "./utils/NumberWithCommas";
import getItemTotalPrice from "./utils/GetItemTotalPrice";

export default function SummaryThree({ data, conf }) {
  const shoppingCart = useStore((state) => state.shoppingCart);
  const changeTotal = useStore((state) => state.changeTotal);
  const discounts = useStore((state) => state.discounts);
  const changeDiscounts = useStore((state) => state.changeDiscounts);
  const options = [
    ...shoppingCart.salads,
    ...shoppingCart.menu,
    ...shoppingCart.pasta,
    ...shoppingCart.sandwitches,
    ...shoppingCart.snacks,
    ...shoppingCart.fish,
    ...shoppingCart.meat,
    ...shoppingCart.sides,
    ...shoppingCart.sauses,
    ...shoppingCart.bread,
    ...shoppingCart.desert,
    // ...shoppingCart.bar,
    ...shoppingCart.drinks,
    ...shoppingCart.beer,
    ...shoppingCart.beerBottle,
    ...shoppingCart.tea,
  ];
  const extraOptions = [...shoppingCart.extrasOpt, ...shoppingCart.hall];
  const cart = options.filter((item) => item.amount > 0);
  const cartOptions = extraOptions.filter((item) => item.amount > 0);
  let totalForSection = 0;
  options.forEach(
    (item) =>
      item.price &&
      (totalForSection += Math.round(getItemTotalPrice(item) * 1.1))
  );

  let totalForSectionWithOptions = 0;
  extraOptions.forEach(
    (item) =>
      item.price && (totalForSectionWithOptions += getItemTotalPrice(item))
  );

  useEffect(() => {
    changeTotal(totalForSection + totalForSectionWithOptions, "three");
  }, [totalForSection, totalForSectionWithOptions]);

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
              {item.price
                ? `${numberWithCommas(getItemTotalPrice(item))} р.`
                : data.smallTexts.negotiable}
            </p>
          </div>
        ))}
        {cart.length === 0 && cartOptions.length === 0 && (
          <div className="flex items-baseline justify-between">
            <p className="text-xs lg:text-sm">
              {data.smallTexts.youHaventChosen}
            </p>
          </div>
        )}
        {cart.length !== 0 && (
          <article>
            <hr className="my-5 border-primary-gray-medium" />
            <div className="flex items-baseline justify-between">
              <p className="text-xs lg:text-sm">{data.smallTexts.serviceFee}</p>
              <p className="text-xs font-semibold lg:text-sm">
                {`${numberWithCommas(
                  Math.round(totalForSection / 10 / 1.1)
                )} р.`}
              </p>
            </div>
            {cartOptions.length > 0 && (
              <hr className="my-5 border-primary-gray-medium" />
            )}
          </article>
        )}
        {cartOptions.map((item, i) => (
          <div key={i} className="flex items-baseline justify-between">
            <p className="text-xs lg:text-sm">{item.heading}</p>
            <p className="text-xs font-semibold lg:text-sm lg:hidden">
              {item.from === "true" && "От "}
              {!isNaN(item.price)
                ? `${numberWithCommas(getItemTotalPrice(item))} р.`
                : data.smallTexts.negotiable.mobile}
            </p>
            <p className="hidden text-xs font-semibold lg:text-sm lg:block">
              {item.from === "true" && "От "}
              {!isNaN(item.price)
                ? `${numberWithCommas(getItemTotalPrice(item))} р.`
                : data.smallTexts.negotiable.desktop}
            </p>
          </div>
        ))}
      </div>
      {conf && (
        <DiscountInput
          input={discounts["three"]}
          handleOnClick={changeDiscounts}
          data={data}
          num="three"
        />
      )}
      <hr className="my-5 border-primary-gray-medium" />
      <div className="flex items-baseline justify-between">
        <p className="font-semibold lg:text-sm">
          {conf ? data.smallTexts.totalWithDiscount : data.smallTexts.total}
        </p>
        <p className="text-lg font-semibold">
          {`${numberWithCommas(
            Math.round(
              (totalForSection + totalForSectionWithOptions) *
                (1 - discounts["three"])
            )
          )} р.`}
        </p>
      </div>
    </div>
  );
}
