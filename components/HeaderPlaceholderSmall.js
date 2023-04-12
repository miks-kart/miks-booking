import MobileMenuToggle from "@components/mobile menu/MobileMenuToggle";
import { forwardRef } from "react";

const HeaderPlaceholderSmall = forwardRef(function HeaderPlaceholderSmall(
  { data },
  ref
) {
  const isSmall = true;
  return (
    <>
      <div
        ref={ref}
        className="absolute top-0 left-0 invisible w-full pointer-events-none "
      >
        <div className="flex items-center justify-center h-6 px-5 bg-primary-red">
          <a
            target="_blank"
            href={data.announcement.link}
            rel="noreferrer"
            className="font-sans hover:text-[#363636] duration-200 text-sm text-center text-white underline"
          >
            {data.announcement.title}
          </a>
        </div>
        <header className="bg-[#222629]">
          <div className="page-container !py-[0.4375rem] lg:px-5 !space-y-0 flex lg:justify-center justify-between items-center">
            <div className="items-center justify-around flex-1 hidden lg:flex">
              {data.links.slice(0, 3).map(({ item }) => (
                <a
                  target="_blank"
                  key={item.link}
                  href={item.link}
                  rel="noreferrer"
                  className={`${
                    isSmall ? "md:!text-sm" : ""
                  } inline text-xs md:text-base xl:text-lg text-white duration-200 opacity-70 active:opacity-100 hover:opacity-100 px-[0.625rem]`}
                >
                  {item.title}
                </a>
              ))}
            </div>
            <a
              target="_blank"
              href={data.logo.link}
              rel="noreferrer"
              className="font-sans text-sm text-center text-white underline lg:mx-16"
            >
              <img
                src={data.logo.image}
                alt="Logo"
                className={`${
                  isSmall ? "xl:!w-[8.75rem] 2xl:!w-[10rem]" : ""
                } w-[8.75rem] xl:w-[11.875rem] 2xl:w-[16.875rem] duration-200`}
              />
            </a>
            <div className="relative z-50 flex lg:hidden">
              <a
                target="_blank"
                href={data.booking.link}
                rel="noreferrer"
                className="rounded-md font-medium mr-4 my-auto text-[0.625rem] text-white bg-primary-red p-2"
              >
                {data.booking.title}
              </a>
              <MobileMenuToggle isOpen={false} />
            </div>
            <div className="items-center justify-around flex-1 hidden lg:flex">
              {data.links.slice(3).map(({ item }) => (
                <a
                  target="_blank"
                  key={item.link}
                  href={item.link}
                  rel="noreferrer"
                  className={`${
                    isSmall ? "md:!text-sm" : ""
                  } inline text-xs md:text-base xl:text-lg text-white duration-200 opacity-70 active:opacity-100 hover:opacity-100 px-[0.625rem]`}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </header>
        {/* <div className="page-container !space-y-0 !py-0 lg:flex hidden justify-between items-start">
          <div className="flex-1 invisible w-1 h-1"></div>
          <div className="w-[31.25rem] px-5 py-[0.1875rem] justify-self-center text-sm bg-primary-red  justify-center items-center rounded-b-[0.9375rem] hidden lg:flex">
            {data.linksTwo.map(({ item }) => (
              <a
                target="_blank"
                key={item.link}
                href={item.link}
                rel="noreferrer"
                className={`${
                  isSmall ? "!text-xs" : ""
                } px-5 text-white duration-200 hover:underline active:underline underline-offset-2 pb-[0.0625rem]`}
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="flex-1">
            <div
              className={`${
                isSmall ? "pb-1" : ""
              } lg:table hidden ml-auto bg-primary-red rounded-b-[0.9375rem] `}
            >
              <a
                target="_blank"
                key={data.booking.link}
                href={data.booking.link}
                rel="noreferrer"
                className={`${
                  isSmall ? "!text-xs" : "leading-9"
                } duration-200  px-6 text-sm text-white hover:underline active:underline underline-offset-2`}
              >
                {data.booking.title}
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
});

export default HeaderPlaceholderSmall;
