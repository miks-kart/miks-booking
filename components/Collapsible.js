import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "./Store";
import { numberWithCommas } from "./utils/NumberWithCommas";

function Total({ num, data }) {
  const totalForSections = useStore((state) => state.totalForSections);
  const discounts = useStore((state) => state.discounts);
  return (
    <article className="flex items-baseline mr-4">
      <p className="mr-[0.625rem] font-semibold text-xs md:text-sm">
        {data.smallTexts.total}{" "}
      </p>
      <p className="text-lg font-semibold">{`${numberWithCommas(
        Math.round(
          totalForSections[num] *
            (1 - discounts[num === "dateTwo" ? "two" : num])
        )
      )} р.`}</p>
    </article>
  );
}

export default function Collapsible({
  children,
  headerHeight,
  title,
  data,
  num,
  duration,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-white rounded-2xl ">
      <div
        style={{ top: headerHeight + "px" }}
        className="sticky z-40 flex flex-wrap items-center justify-between p-5 bg-white md:py-8 md:px-12 rounded-2xl"
      >
        <div className="flex items-start justify-between w-full md:w-auto md:block">
          <p className="text-xl uppercase lg:text-4xl">{title}</p>
          <button
            aria-label="Раскрыть"
            className="flex items-center group md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon isOpen={isOpen} />
          </button>
        </div>
        <div className="flex items-center">
          <Total data={data} num={num} />
          <button
            className="items-center hidden md:flex group "
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="relative flex flex-col mr-[0.625rem]">
              <span className="invisible pointer-events-none text-sm h-[0.1px]">
                {data.smallTexts.collapse}
              </span>
              <span className="invisible text-sm pointer-events-none">
                {data.smallTexts.expand}
              </span>
              <span className="absolute inset-0 pt-[0.125rem] text-sm text-right leading-0">
                {isOpen ? data.smallTexts.collapse : data.smallTexts.expand}
              </span>
            </span>
            <Icon isOpen={isOpen} />
          </button>
        </div>
        <hr className="border-black md:translate-y-[2.0625rem] translate-y-[1.3125rem] border-[0.03125rem] -mx-5 w-screen md:-ml-12 md:-mr-12 mt-[0.125rem]" />
      </div>
      <motion.div
        className="h-0 overflow-hidden bg-white rounded-b-2xl"
        animate={{
          height: isOpen ? "auto" : 0,
          transition: {
            height: {
              duration: duration,
            },
            ease: [0.165, 0.84, 0.44, 1],
          },
        }}
      >
        <div className="px-5 py-5 md:py-10 md:px-12">{children}</div>
      </motion.div>
    </div>
  );
}

function Icon({ isOpen }) {
  return (
    <svg
      className={`${
        isOpen ? "" : "rotate-180"
      } duration-300 group-hover:opacity-70  w-8 h-8`}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15"
        cy="15"
        r="13.5"
        transform="rotate(-180 15 15)"
        fill="#D50201"
        stroke="#D50201"
        strokeWidth="3"
      />
      <path
        d="M9.34375 16.6567L14.829 11.1715L16.2003 12.5428L10.7151 18.028L9.34375 16.6567Z"
        fill="white"
      />
      <path
        d="M14.829 11.1715L20.3142 16.6567L18.9429 18.028L13.4577 12.5428L14.829 11.1715Z"
        fill="white"
      />
    </svg>
  );
}
