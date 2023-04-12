import { useState } from "react";
import CheckOutPopUp from "./CheckOutPopUp";
import ConfigCheckOutPopUp from "./ConfigCheckOutPopUp";
import { useStore } from "./Store";
import { numberWithCommas } from "./utils/NumberWithCommas";

export default function Checkout({ data, conf }) {
  const [isOpen, setIsOpen] = useState(false);
  const totalForSections = useStore((state) => state.totalForSections);
  const discounts = useStore((state) => state.discounts);

  return (
    <div className="items-center justify-between p-5 bg-white md:py-8 md:flex md:px-12 lg:!mt-12 rounded-2xl">
      <div className="items-center pb-5 md:flex md:pb-0">
        <p className="mr-8 text-2xl uppercase pb-[0.625rem] md:pb-0 leading-none">
          {conf ? (
            <>
              {data.admin.totalSummOne}
              <span className="whitespace-pre-line text-primary-gray-medium">
                {data.admin.totalSummTwo}
              </span>
            </>
          ) : (
            <>{data.smallTexts.totalSumm}</>
          )}
        </p>
        <p className="text-2xl font-semibold">{`${numberWithCommas(
          Math.round(
            totalForSections.one * (1 - discounts.one) +
              totalForSections.dateTwo * (1 - discounts.two) +
              totalForSections.three * (1 - discounts.three)
          )
        )} р.`}</p>
      </div>
      <button
        disabled={
          totalForSections.one +
            totalForSections.dateTwo +
            totalForSections.three ===
          0
        }
        onClick={() => setIsOpen(true)}
        className="theme-button !w-full md:!w-[13rem]"
      >
        {data.smallTexts.buttonSend}
      </button>
      {conf ? (
        <ConfigCheckOutPopUp
          data={data}
          isOpen={isOpen}
          onClick={() => setIsOpen(false)}
        />
      ) : (
        <CheckOutPopUp
          data={data}
          isOpen={isOpen}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
