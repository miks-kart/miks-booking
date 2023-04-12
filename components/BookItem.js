import { useStore } from "@components/Store";
import _ from "lodash";
import { useEffect, useState } from "react";
import { numberWithCommas } from "./utils/NumberWithCommas";
import VideoPopUp from "./VideoPopUp";
import ImageSimple from "./image/ImageSimple";

export default function BookItem({ item, category, conf, inputPrice }) {
  const shoppingCart = useStore((state) => state.shoppingCart);
  const changeAmount = useStore((state) => state.changeAmount);
  const changePrice = useStore((state) => state.changePrice);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(0);
  const [input, setInput] = useState(0);

  function handleOnClickInput(newAmount) {
    changePrice(item, newAmount, category);
    item.price = newAmount;
  }

  let currentItem = shoppingCart[category].find(
    (input) =>
      JSON.stringify(_.omit(input, "amount")) ===
      JSON.stringify(_.omit(item, "amount"))
  );

  useEffect(() => {
    setInput(currentItem?.amount || 0);
  }, [currentItem, shoppingCart]);

  const handleOnClick = (newAmount) => {
    if (item.max) {
      setInput(Math.min(newAmount, item.max));
      changeAmount(item, Math.min(newAmount, item.max), category);
    } else {
      setInput(newAmount);
      changeAmount(item, newAmount, category);
    }
  };
  return (
    <>
      {item.video ? (
        <div
          className={`${
            input > 0 ? "theme-border-red" : "theme-border-gray"
          }  overflow-hidden p-[0.625rem] md:p-5 flex ronded-2xl duration-200 flex-col xl:flex-row`}
        >
          <div className="lg:w-screen w-full max-w-full xl:max-w-[15rem]">
            <div className="relative block w-full h-auto overflow-hidden xl:aspect-[1/0.75] aspect-[1/0.45]">
              <button
                aria-label="Добавить"
                onClick={() => setOpen(true)}
                className="absolute inset-0 w-full group rounded-2xl"
              >
                <ImageSimple
                  sizes="(min-width: 768px) 40vw, (min-width: 1200px) 240px, 80vw"
                  loading="lazy"
                  src={item.image}
                  alt={item.heading}
                  className={`w-full h-full absolute inset-0 block object-cover rounded-2xl`}
                />
                <VideoIcon />
              </button>
            </div>
          </div>
          <VideoPopUp open={open} item={item} onClick={() => setOpen(false)} />

          <button
            className="flex flex-col w-full xl:flex-row"
            onClick={() => handleOnClick(input === 0 ? 1 : 0)}
          >
            <div className="flex flex-col pt-[0.875rem] xl:pt-0 justify-between h-full w-full text-left xl:ml-8 xl:mr-2">
              <div className="w-full h-full">
                <div className="flex items-start justify-between">
                  <p className="text-sm whitespace-pre-line !leading-[1.15] xl:text-lg xl:pr-2">
                    {item.heading}
                  </p>
                  {item.price && item.price > 0 ? (
                    <p
                      className={`${
                        inputPrice ? "text-primary-gray-medium" : ""
                      } pl-2 text-lg font-semibold leading-none whitespace-nowrap xl:hidden`}
                    >
                      {item.from === "true" && "От "}
                      {isNaN(parseInt(item.price))
                        ? item.price
                        : `${numberWithCommas(parseInt(item.price))} р.`}
                    </p>
                  ) : null}
                </div>
                <div
                  className="text-[0.625rem] xl:text-xs pt-[0.625rem] leading-none whitespace-pre-line text-primary-gray-medium space-y-1 markdown-text"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
              {conf && (
                <div className="flex items-center justify-between mt-auto xl:block pt-[0.625rem] xl:pt-0">
                  <p className="text-xs lg:text-sm lg:pb-[0.625rem]">
                    Укажите стоимость
                  </p>
                  <input
                    inputMode="numeric"
                    aria-label="Количество"
                    className="lg:w-[7.5rem] border-[0.0625rem] border-primary-gray-medium  rounded-md text-center w-[8.75rem]  h-8 lg:h-8"
                    // type="number"
                    pattern="[0-9]*"
                    name="number"
                    value={state + " р."}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={(e) => {
                      setState(
                        isNaN(parseFloat(e.target.value.slice(0, -3)))
                          ? 0
                          : Math.max(parseInt(e.target.value.slice(0, -3)), 0)
                      );
                      handleOnClickInput(
                        isNaN(parseFloat(e.target.value.slice(0, -3)))
                          ? 0
                          : Math.max(parseInt(e.target.value.slice(0, -3)), 0)
                      );
                    }}
                    onChange={(e) => {
                      setState(
                        isNaN(parseFloat(e.target.value.slice(0, -3)))
                          ? 0
                          : Math.max(parseInt(e.target.value.slice(0, -3)), 0)
                      );
                    }}
                  />
                </div>
              )}
            </div>
            {item.price && item.price > 0 ? (
              <p
                className={`${
                  inputPrice ? "text-primary-gray-medium" : ""
                } hidden font-semibold whitespace-nowrap xl:block md:text-lg`}
              >
                {item.from === "true" && "От "}
                {isNaN(parseInt(item.price))
                  ? item.price
                  : `${numberWithCommas(parseInt(item.price))} р.`}
              </p>
            ) : null}
          </button>
        </div>
      ) : (
        <button
          onClick={() => handleOnClick(input === 0 ? 1 : 0)}
          className={`${
            input > 0 ? "theme-border-red" : "theme-border-gray"
          }  overflow-hidden p-[0.625rem] md:p-5 flex ronded-2xl duration-200 flex-col xl:flex-row`}
        >
          <div className="lg:w-screen w-full max-w-full  xl:max-w-[15rem]">
            <div className="relative block w-full h-auto xl:aspect-[1/0.75] aspect-[1/0.45] overflow-hidden ">
              <ImageSimple
                sizes="(min-width: 768px) 40vw, (min-width: 1200px) 240px, 80vw"
                loading="lazy"
                src={item.image}
                alt={item.heading}
                className={`w-full h-full absolute inset-0 block object-cover xl:aspect-[1/0.75] aspect-[1/0.45] rounded-2xl`}
              />
            </div>
          </div>

          <div className="flex flex-col pt-[0.875rem] xl:pt-0 justify-between h-full w-full text-left xl:ml-8 xl:mr-2">
            <div className="w-full h-full">
              <div className="flex items-start justify-between">
                <p className="text-sm whitespace-pre-line !leading-[1.15] xl:text-lg xl:pr-2">
                  {item.heading}
                </p>
                {item.price && item.price > 0 ? (
                  <p className="pl-2 text-lg font-semibold leading-none whitespace-nowrap xl:hidden">
                    {item.from === "true" && "От "}
                    {isNaN(parseInt(item.price))
                      ? item.price
                      : `${numberWithCommas(parseInt(item.price))} р.`}
                  </p>
                ) : null}
              </div>
              <div
                className="text-[0.625rem] xl:text-xs pt-[0.625rem] leading-none whitespace-pre-line text-primary-gray-medium markdown-text space-y-1"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
            {conf && (
              <div className="flex items-center justify-between mt-auto xl:block pt-[0.625rem] xl:pt-0">
                <p className="text-xs lg:text-sm lg:pb-[0.625rem]">
                  Укажите стоимость
                </p>
                <input
                  inputMode="numeric"
                  aria-label="Количество"
                  className="lg:w-[7.5rem] border-[0.0625rem] border-primary-gray-medium  rounded-md text-center w-[8.75rem]  h-8 lg:h-8"
                  // type="number"
                  pattern="[0-9]*"
                  name="number"
                  value={state + " р."}
                  onBlur={(e) => {
                    setState(
                      isNaN(parseFloat(e.target.value.slice(0, -3)))
                        ? 0
                        : Math.max(parseInt(e.target.value.slice(0, -3)), 0)
                    );
                    handleOnClickInput(
                      isNaN(parseFloat(e.target.value.slice(0, -3)))
                        ? 0
                        : Math.max(parseInt(e.target.value.slice(0, -3)), 0)
                    );
                  }}
                  onChange={(e) => {
                    setState(
                      isNaN(parseFloat(e.target.value.slice(0, -3)))
                        ? 0
                        : Math.max(parseInt(e.target.value.slice(0, -3)), 0)
                    );
                  }}
                />
              </div>
            )}
          </div>
          {item.price && item.price > 0 ? (
            <p className="hidden font-semibold whitespace-nowrap xl:block md:text-lg">
              {item.from === "true" && "От "}
              {isNaN(parseInt(item.price))
                ? item.price
                : `${numberWithCommas(parseInt(item.price))} р.`}
            </p>
          ) : null}
        </button>
      )}
    </>
  );
}

function VideoIcon() {
  return (
    <svg
      className="absolute w-10 h-10 duration-200 pointer-events-auto group-hover:opacity-70 center-xy"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 0C8.9613 0 0 8.96131 0 20C0 31.0387 8.9613 40 20 40C31.0387 40 40 31.0387 40 20C40 8.96131 31.0387 0 20 0ZM20 36.6191C10.835 36.6191 3.38086 29.165 3.38086 20C3.38086 10.835 10.835 3.38086 20 3.38086C29.165 3.38086 36.6191 10.835 36.6191 20C36.6191 29.165 29.165 36.6191 20 36.6191Z"
        fill="white"
      />
      <path
        d="M16.5377 26.883C16.782 27.0052 17.0264 27.0458 17.2707 27.0458C17.556 27.0458 17.8816 26.9643 18.1263 26.7606L26.3544 21.1393C26.7618 20.854 27.0062 20.3653 27.0062 19.8766C27.0062 19.388 26.7618 18.899 26.3137 18.614L18.0856 13.1561C17.5969 12.8302 17.0266 12.8302 16.497 13.0746C16.0083 13.3598 15.6824 13.8486 15.6824 14.4188V25.4982C15.7231 26.1091 16.0083 26.6387 16.5377 26.883Z"
        fill="white"
      />
    </svg>
  );
}
