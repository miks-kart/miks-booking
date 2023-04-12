import { useStore } from "@components/Store";
import _ from "lodash";
import { useEffect, useState } from "react";
import PhotoPopUp from "./PhotoPopUp";
import { numberWithCommas } from "./utils/NumberWithCommas";
import ImageSimple from "./image/ImageSimple";

export default function SaleItem({ item, category, lightbox }) {
  const shoppingCart = useStore((state) => state.shoppingCart);
  const changeAmount = useStore((state) => state.changeAmount);
  const [open, setOpen] = useState(false);

  let currentItem = shoppingCart[category].find(
    (input) =>
      JSON.stringify(_.omit(input, "amount")) ===
      JSON.stringify(_.omit(item, "amount"))
  );

  useEffect(() => {
    setInput(currentItem?.amount || 0);
  }, [currentItem, shoppingCart]);

  const [input, setInput] = useState(0);
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
    <div
      className={`${
        input > 0 ? "theme-border-red" : "theme-border-gray"
      }  overflow-hidden p-[0.625rem] md:p-5 flex flex-col xl:flex-row ronded-2xl duration-200`}
    >
      {lightbox ? (
        <div className="lg:w-screen max-w-full w-full xl:max-w-[15rem]">
          <div className="block w-full h-auto relative overflow-hidden xl:aspect-[1/0.75] aspect-[1/0.45] xl:max-w-[15rem] ">
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
                className={`${
                  item.stretch !== "true" ? "object-cover" : "object-contain"
                } w-full h-full absolute inset-0 block xl:aspect-[1/0.75] aspect-[1/0.45] rounded-2xl`}
              />
              <ZoomIcon />
            </button>
            <PhotoPopUp
              open={open}
              src={item.image}
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      ) : (
        <div className="lg:w-screen max-w-full w-full xl:max-w-[15rem]">
          <div className="block w-full h-auto relative overflow-hidden xl:aspect-[1/0.75] aspect-[1/0.45] xl:max-w-[15rem] ">
            <ImageSimple
              sizes="(min-width: 768px) 40vw, (min-width: 1200px) 240px, 80vw"
              loading="lazy"
              src={item.image}
              alt={item.heading}
              className={`${
                item.stretch !== "true" ? "object-cover" : "object-contain"
              } w-full h-full absolute inset-0 block xl:aspect-[1/0.75] aspect-[1/0.45] rounded-2xl`}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col pt-[0.875rem] xl:pt-0 justify-between h-full w-full text-left xl:ml-8 xl:mr-2">
        <div className="w-full">
          <div className="flex items-start justify-between ">
            <p className="text-sm whitespace-pre-line !leading-[1.15] text-left xl:text-lg xl:pr-2">
              {item.heading}
            </p>
            <p className="pl-2 text-lg font-semibold leading-none whitespace-nowrap xl:hidden">
              {item.from === "true" && "От "}
              {isNaN(parseInt(item.price))
                ? item.price
                : `${numberWithCommas(parseInt(item.price))} р.`}
            </p>
          </div>
          <div
            className="text-[0.625rem] space-y-1 xl:text-xs pt-[0.625rem] leading-none whitespace-pre-line text-primary-gray-medium markdown-text"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        </div>
        <div className="flex items-center justify-between pt-4 mt-auto xl:pt-2 xl:block">
          <p className="text-sm ">{item.amountText}</p>
          <div className="inline-flex xl:mt-[0.625rem] justify-center items-center border-[0.0625rem] border-primary-gray-medium rounded-md text-sm">
            <button
              className="h-8 px-3 transition-opacity duration-150 hover:opacity-50"
              onClick={() => handleOnClick(Math.max(input - 1, 0))}
            >
              -
            </button>
            <input
              aria-label="Количество"
              className="w-[3.5rem] text-center h-8"
              type="number"
              pattern="[0-9]*"
              name="number"
              value={input.toString().replace(/$0*/g, "")}
              onBlur={(e) =>
                handleOnClick(
                  isNaN(parseInt(e.target.value))
                    ? 0
                    : Math.max(
                        item.max
                          ? Math.min(parseInt(e.target.value), item.max)
                          : parseInt(e.target.value),
                        0
                      )
                )
              }
              onChange={(e) =>
                setInput(
                  item.max
                    ? Math.min(parseInt(e.target.value), item.max)
                    : parseInt(e.target.value)
                )
              }
            />
            <button
              className="h-8 px-3 transition-opacity duration-150 hover:opacity-50"
              onClick={() => handleOnClick(input + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <p className="hidden font-semibold !leading-none xl:!leading-none whitespace-nowrap xl:block xl:text-lg">
        {item.from === "true" && "От "}
        {isNaN(parseInt(item.price))
          ? item.price
          : `${numberWithCommas(parseInt(item.price))} р.`}
      </p>
    </div>
  );
}

function ZoomIcon() {
  return (
    <svg
      className="w-4 h-4 m-[0.625rem] absolute top-0 right-0 duration-200 group-hover:opacity-60"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.64574 0C10.2747 0 11.8999 0.619703 13.1399 1.85911C15.62 4.33792 15.62 8.37947 13.1399 10.8544C10.9063 13.0869 7.41725 13.2871 4.93332 11.4972L1.74078 14.6881C1.55208 14.8844 1.29406 14.9961 1.02063 14.9999C0.747207 15.0038 0.485335 14.896 0.296633 14.7035C0.104079 14.5111 -0.0037508 14.2493 0.000100136 13.9799C0.00395107 13.7066 0.115632 13.4487 0.312037 13.2601L3.50457 10.0615C1.70997 7.57886 1.91408 4.09158 4.1477 1.85911C5.38389 0.619703 7.01674 0 8.64574 0ZM8.64574 1.33563C7.36334 1.33563 6.08093 1.82447 5.09891 2.80599C3.13487 4.76902 3.13487 7.92913 5.09891 9.89216C7.06295 11.8552 10.2247 11.8552 12.1887 9.89216C14.1528 7.92913 14.1528 4.76902 12.1887 2.80599C11.2067 1.82447 9.9243 1.33563 8.64574 1.33563ZM8.65344 2.97535C8.83444 2.9792 9.00389 3.05233 9.12713 3.17935C9.25036 3.30637 9.31968 3.47958 9.31968 3.66048V5.68126H11.3415C11.5225 5.67741 11.6958 5.74669 11.8229 5.87371C11.95 6.00073 12.0231 6.17394 12.0231 6.35485C12.0231 6.53575 11.95 6.70896 11.8229 6.83598C11.6958 6.963 11.5225 7.03229 11.3415 7.02844H9.31968V9.04921C9.32353 9.23012 9.25421 9.40333 9.12713 9.53035C9.00004 9.65737 8.82674 9.7305 8.64574 9.7305C8.46474 9.7305 8.29144 9.65737 8.16436 9.53035C8.03727 9.40333 7.96795 9.22627 7.97181 9.04921V7.02844H5.95C5.769 7.03229 5.5957 6.95915 5.46861 6.83598C5.34153 6.71281 5.26836 6.53575 5.26836 6.35485C5.26836 6.17394 5.34153 6.00073 5.46861 5.87371C5.5957 5.74669 5.77285 5.67741 5.95 5.68126H7.97181V3.66048C7.96795 3.47958 8.04112 3.30252 8.16821 3.1755C8.2953 3.04463 8.46859 2.97535 8.65344 2.97535Z"
        fill="white"
      />
    </svg>
  );
}
