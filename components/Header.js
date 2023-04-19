import MobileMenuToggle from "@components/mobile menu/MobileMenuToggle";
import NavLink from "@components/mobile menu/NavLink";
import { menuScreen } from "@components/mobile menu/Variants";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";

const Header = forwardRef(function Header({ data }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  function toggleNav() {
    setIsOpen(!isOpen);
    document.querySelector("body").style.overflow = isOpen
      ? "hidden auto"
      : "hidden";
  }
  useEffect(() => {
    const handleScroll = () => {
      setIsSmall(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const router = useRouter();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuScreen}
            initial="hidden"
            exit="hidden"
            animate="visible"
            id="mob-menu"
            className="fixed inset-0 z-40 overflow-y-scroll bg-[#222629] text-center pointer-events-auto text-primary-gray"
          >
            <div
              id="menu-items"
              className="z-10 inline-flex bg-[#222629]  flex-col items-center justify-start min-h-full !space-y-0 !pt-[5.1125rem] text-left page-container"
            >
              {data.links.map(({ item }, i) => (
                <NavLink
                  order={i}
                  onClick={() => {
                    toggleNav();
                  }}
                  item={item}
                  key={item.link}
                  className="duration-300 opacity-70 hover:opacity-100"
                />
              ))}
              <hr className="w-screen pb-[0.375rem] border-primary-red" />
              {data.linksTwo.map(({ item }, i) => (
                <NavLink
                  order={i}
                  onClick={() => {
                    toggleNav();
                  }}
                  item={item}
                  key={item.link}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={ref} className="fixed top-0 left-0 z-50 w-full">
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
          <div className="page-container  !py-[0.4375rem] lg:!px-0 !space-y-0 flex lg:justify-center justify-between items-center">
            <ul className="items-center flex-1 hidden justify-items-start lg:flex">
              {data.links.slice(0, 3).map(({ item }) => (
                <HeaderLink
                  isSmall={isSmall}
                  router={router}
                  key={item.link}
                  item={item}
                />
              ))}
            </ul>
            <a
              // target="_blank"
              href={data.logo.link}
              rel="noreferrer"
              className="font-sans text-sm text-center text-white underline"
            >
              <img
                src={data.logo.image}
                alt="Logo"
                className={`${
                  isSmall ? "xl:!w-[8.75rem] 2xl:!w-[10rem]" : ""
                } w-[8.75rem] xl:w-[11.875rem] 2xl:w-[16.875rem] duration-200 origin-center	mx-auto`}
              />
            </a>
            <div className="relative z-50 flex lg:hidden">
              <a
                // target="_blank"
                href={data.booking.link}
                rel="noreferrer"
                className="rounded-md font-medium mr-4 my-auto text-[0.625rem] text-white bg-primary-red p-2"
              >
                {data.booking.title}
              </a>
              <MobileMenuToggle isOpen={isOpen} onClick={() => toggleNav()} />
            </div>
            <ul className="items-center justify-end flex-1 hidden lg:flex">
              {data.links.slice(3).map(({ item }) => (
                <HeaderLink
                  isSmall={isSmall}
                  router={router}
                  key={item.link}
                  item={item}
                />
              ))}
            </ul>
          </div>
        </header>
        <div className="page-container wide lg:flex hidden !space-y-0 !py-0  justify-between items-start">
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
                isSmall ? "pb-1" : "pb-0"
              } duration-200 mr-2 lg:table hidden ml-auto bg-primary-red rounded-b-[0.9375rem] `}
            >
              <a
                target="_blank"
                key={data.booking.link}
                href={data.booking.link}
                rel="noreferrer"
                className={`${
                  isSmall ? "!text-xs " : "leading-9"
                } duration-200  px-6 text-sm text-white hover:underline active:underline underline-offset-2`}
              >
                {data.booking.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Header;

function HeaderLink({ item, router, isSmall }) {
  return item.link.includes("http") ? (
    <li className="2xl:mx-5">
      <a
        // target="_blank"
        href={item.link}
        rel="noreferrer"
        className={`${
          router.pathname.slice(1) === item.link
            ? "bg-primary-red !opacity-100 rounded-md"
            : ""
        } ${
          isSmall ? "md:!text-sm px-5" : "px-3 "
        } inline 2xl:text-xl text-xs md:text-base xl:text-lg py-1 text-white duration-200 opacity-70 active:opacity-100 hover:opacity-100 text-center`}
      >
        {item.title}
      </a>
    </li>
  ) : (
    <li className="mx-5">
      <Link
        href={item.link}
        className={`${
          router.pathname.slice(1) === item.link ||
          router.pathname === item.link
            ? "bg-primary-red !opacity-100 rounded-md"
            : ""
        } ${
          isSmall ? "md:!text-sm px-5" : "px-3 "
        } inline 2xl:text-xl text-xs md:text-base xl:text-lg py-1 text-white duration-200 opacity-70 active:opacity-100 hover:opacity-100 text-center`}
      >
        {item.title}
      </Link>
    </li>
  );
}
