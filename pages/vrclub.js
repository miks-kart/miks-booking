import Gallery from "@components/Gallery";
import Slider from "@components/Slider";
import Script from "next/script";

export default function Index({ data }) {
  return (
    <>
      <Script
        id="bukza-script"
        afterInteractive
        src={
          "https://public.bukza.com/api/script/generate/25145/24860/BukzaContainer24860?t=" +
          new Date().getTime()
        }
      />
      <Script
        id="bukza-script2"
        afterInteractive
        src={
          "https://public.bukza.com/api/script/generate/25145/24861/BukzaContainer24861?t=" +
          new Date().getTime()
        }
      />
      <Script
        id="bukza-script3"
        afterInteractive
        src={
          "https://public.bukza.com/api/script/generate/25145/24852/BukzaContainer24852?t=" +
          new Date().getTime()
        }
      />
      <div className="relative w-screen h-0 z-[1]">
        <img
          src={data.bg.desktop}
          alt=""
          className="absolute top-0 left-0 hidden w-screen h-auto -mt-12 pointer-events-none md:block"
        />
        <img
          src={data.bg.mobile}
          alt=""
          className="absolute top-0 left-0 w-screen h-auto pointer-events-none md:hidden"
        />
      </div>
      <section className="relative z-10 page-container  vr lg:px-5 md:!pb-0 !space-y-6 pt-16 md:!pt-24 text-white">
        <img
          src={data.logo}
          alt="logo"
          className="md:w-[19rem] w-64 mx-auto pb-12"
        />
        <div className="flex flex-wrap items-center justify-between">
          {data.items.map(({ item }) => (
            <div
              className="w-1/2 px-2 py-2 mb-auto lg:px-0 lg:w-1/4"
              key={item.text}
            >
              <img
                src={item.image}
                alt={item.text}
                className="w-32 aspect-[1.23] object-contain md:w-[11rem] mx-auto"
              />
              <p className="pt-5 text-center text-white whitespace-pre-line !leading-tight md:text-xl">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div id="ceny" className="max-w-4xl mx-auto">
          <h1 className="font-display text-[1.75rem] text-center pt-12 leading-none md:pt-24 pb-8">
            {data.headingOne}
          </h1>
          <div className="hidden grid-cols-4 md:grid">
            <p className="px-4 py-2 text-[#5FCFFF] text-sm mt-auto font-medium">
              {data.colOne.heading}
            </p>

            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p className="px-4 py-2 mt-auto font-medium leading-tight text-center whitespace-pre-line">
                {data.colTwo.heading}
              </p>
            </div>
            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p className="px-4 py-2 mt-auto font-medium leading-tight text-center whitespace-pre-line">
                {data.colThree.heading}
              </p>
            </div>
            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p className="px-4 py-2 mt-auto font-medium leading-tight text-center whitespace-pre-line">
                {data.colFour.heading}
              </p>
            </div>
          </div>
          <div className="hidden grid-cols-4 md:grid">
            <p className="px-4 py-2 mt-auto !leading-tight text-lg font-medium">
              {data.colOne.items[0]}
            </p>

            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colTwo.items[0]}
              </p>
            </div>
            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colThree.items[0]}
              </p>
            </div>
            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colFour.items[0]}
              </p>
            </div>
          </div>
          <div className="hidden grid-cols-4 md:grid">
            <p className="px-4 py-2 mt-auto !leading-tight text-lg font-medium">
              {data.colOne.items[1]}
            </p>

            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colTwo.items[1]}
              </p>
            </div>
            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colThree.items[1]}
              </p>
            </div>
            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colFour.items[1]}
              </p>
            </div>
          </div>
          <div className="hidden grid-cols-4 md:grid">
            <p className="px-4 py-2 mt-auto !leading-tight text-lg font-medium">
              {data.colOne.items[2]}
            </p>

            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colTwo.items[2]}
              </p>
            </div>
            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colThree.items[2]}
              </p>
            </div>
            <div className="border-l-[0.0625rem] border-[#5FCFFF] grid">
              <p
                style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                className="px-4 py-2 mx-auto my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
              >
                {data.colFour.items[2]}
              </p>
            </div>
          </div>
          <div className="hidden grid-cols-4 pt-8 md:grid">
            <p className="px-4 py-2 my-auto !leading-tight text-lg font-medium">
              {data.colFive.heading}
            </p>

            <a
              href={data.colFive.items[0]}
              className="px-8 py-[0.875rem] rounded-xl font-bold bg-[#7CCDFA] text-center mx-auto hover:bg-[#5FCFFF] duration-200 my-auto"
            >
              {data.colFive.buttonText}
            </a>
            <a
              href={data.colFive.items[1]}
              className="px-8 py-[0.875rem] rounded-xl font-bold bg-[#7CCDFA] text-center mx-auto hover:bg-[#5FCFFF] duration-200 my-auto"
            >
              {data.colFive.buttonText}
            </a>
            <a
              href={data.colFive.items[2]}
              className="px-8 py-[0.875rem] rounded-xl font-bold bg-[#7CCDFA] text-center mx-auto hover:bg-[#5FCFFF] duration-200 my-auto"
            >
              {data.colFive.buttonText}
            </a>
          </div>

          <div className="md:hidden">
            <p className="px-4 text-[#7CCDFA] py-2 mt-auto font-bold !leading-tight  whitespace-pre-line">
              {data.colOne.items[0]}
            </p>
            <div className="border-l-[0.0625rem] !leading-tight border-[#5FCFFF]">
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colTwo.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colTwo.items[0]}
                </p>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colThree.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colThree.items[0]}
                </p>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colFour.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colFour.items[0]}
                </p>
              </div>
              <a
                href={data.colFive.items[0]}
                className="px-8 py-[0.875rem] inline-block ml-4 mt-6 mr-auto rounded-xl font-bold bg-[#7CCDFA] text-center  hover:bg-[#5FCFFF] duration-200"
              >
                {data.colFive.buttonText}
              </a>
            </div>
          </div>

          <div className="pt-2 md:hidden">
            <p className="px-4 text-[#7CCDFA] py-2 mt-auto font-bold !leading-tight  whitespace-pre-line">
              {data.colOne.items[1]}
            </p>
            <div className="border-l-[0.0625rem] !leading-tight border-[#5FCFFF]">
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colTwo.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colTwo.items[1]}
                </p>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colThree.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colThree.items[1]}
                </p>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colFour.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colFour.items[1]}
                </p>
              </div>
              <a
                href={data.colFive.items[1]}
                className="px-8 py-[0.875rem] inline-block ml-4 mt-6 mr-auto rounded-xl font-bold bg-[#7CCDFA] text-center  hover:bg-[#5FCFFF] duration-200"
              >
                {data.colFive.buttonText}
              </a>
            </div>
          </div>

          <div className="pt-2 md:hidden">
            <p className="px-4 text-[#7CCDFA] py-2 mt-auto font-bold !leading-tight  whitespace-pre-line">
              {data.colOne.items[2]}
            </p>
            <div className="border-l-[0.0625rem] !leading-tight border-[#5FCFFF]">
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colTwo.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colTwo.items[2]}
                </p>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colThree.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colThree.items[2]}
                </p>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <p className="pl-4 pr-6 font-medium">{data.colFour.heading}</p>
                <p
                  style={{ boxShadow: "0px 0px 15px 0px #5FCFFF" }}
                  className="px-4 py-2  my-auto text-lg leading-tight text-center text-[#0F1138] rounded-lg bg-white font-bold"
                >
                  {data.colFour.items[2]}
                </p>
              </div>
              <a
                href={data.colFive.items[2]}
                className="px-8 py-[0.875rem] inline-block ml-4 mt-6 mr-auto rounded-xl font-bold bg-[#7CCDFA] text-center  hover:bg-[#5FCFFF] duration-200"
              >
                {data.colFive.buttonText}
              </a>
            </div>
          </div>
          <div className="flex items-center justify-start my-6 md:px-4 md:my-10">
            <ExclamationCircleIcon />
            <p className="max-w-[42.75rem] font-medium text-white whitespace-pre-line">
              {data.disclaimer}
            </p>
          </div>

          <div className="bg-[#5FCFFF4D] p-5 rounded-xl md:mx-4">
            <p className="pb-4 text-sm whitespace-pre-line">{data.textOne}</p>
            <p className="font-bold whitespace-pre-line">{data.textTwo}</p>
          </div>
        </div>
        <div className="flex flex-col pt-16 md:flex-row">
          <div className="relative w-full corner-shadow md:w-1/2">
            <img src={data.imageOne} alt="" className="object-contain" />
          </div>
          <div className="flex flex-col justify-around h-auto mt-8 space-y-6 md:ml-8 md:space-y-0 md:mt-0 md:text-left">
            {data.pointsOne.map(({ item }) => (
              <div className="flex items-center" key={item.text}>
                <img
                  src={item.image}
                  alt={item.text}
                  className="object-contain w-16 h-16 mx-4 mb-auto md:mb-0"
                />
                <p className="whitespace-pre-line mx-4 !leading-tight">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-20 page-container vr !w-full md:!w-[95%] xl:!w-[90%] md:!pb-0 !pb-0 !space-y-4 !pt-4 md:pt-16 overflow-hidden">
        <h2 className="font-display text-[1.75rem] text-center text-white leading-none md:pt-24 pb-0 md:pb-4">
          {data.headingTwo}
        </h2>
        <Slider data={data} />
      </section>
      <section className="relative z-10 page-container vr lg:px-5 md:!pb-16 !space-y-6 !pt-0 text-white">
        <div className="flex flex-col items-center justify-between pt-16 md:flex-row">
          <div className="flex items-center">
            <div className="relative logo-small">
              <img
                src={data.logoSmall}
                alt=""
                className="relative z-10 object-contain w-20 h-20"
              />
            </div>
            <div className="ml-2 text-center text-white font-display leading-0">
              <p
                className="text-2xl"
                style={{ textShadow: "0 0 20px #00e0fe" }}
              >
                vr arena
              </p>
              <p className="text-sm" style={{ textShadow: "0 0 20px #00e0fe" }}>
                miks
              </p>
            </div>
          </div>
          <div className="flex pt-4 md:pt-0">
            {data.socialOne.map(({ item }) => (
              <a
                target="_blank"
                rel="noreferrer"
                key={item.link}
                href={item.link}
                className="duration-200 w-28 h-28 hover:opacity-80"
              >
                <img src={item.image} alt="" />
              </a>
            ))}
          </div>
        </div>
        <div className="pt-0 md:pt-16">
          <h3 className="whitespace-pre-line text-white text-[1.75rem] md:text-4xl  text-center !leading-tight font-medium pb-8">
            {data.headingThree}
          </h3>
          <a
            style={{ boxShadow: "0 0 35px #00e0fe" }}
            href={`tel:${data.tel}`}
            className="py-4 w-full md:w-[22.5rem] hover:opacity-80 duration-200 text-[#1f4251] font-black text-2xl bg-white rounded-xl flex mx-auto items-center justify-center"
          >
            <div
              style={{ boxShadow: "inset 0 5px 7px rgb(231 231 231 / 70%)" }}
              className="p-2 mr-6 rounded-full w-9 h-9"
            >
              <img
                src="/images/phone.svg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <span className="">{data.tel}</span>
          </a>
          <h4 className="whitespace-pre-line text-white text-[1.75rem] md:text-4xl  text-center !leading-tight font-medium  py-8">
            {data.headingFour}
          </h4>
          <a
            style={{ boxShadow: "0 0 35px #00e0fe" }}
            href="#ceny"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#ceny").scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="py-4 w-full md:w-[22.5rem] hover:opacity-80 duration-200 text-[#1f4251] font-black text-2xl bg-white rounded-xl flex mx-auto items-center justify-center"
          >
            <span className="">{data.bookButton}</span>
          </a>
        </div>
      </section>
      <Gallery images={data.pointsThree} />
      <footer className="flex bg-[#18191A] items-center justify-between text-white !space-y-0 !py-[0.625rem] text-xs page-container vr">
        <p className="">{`© 2000 - ${new Date().getFullYear()} ${
          data.copyright.miks
        }`}</p>
        <p className="">{data.copyright.rights}</p>
      </footer>
    </>
  );
}

function ExclamationCircleIcon() {
  return (
    <svg
      className="w-10 h-10 mr-5 min-w-[2.5rem]"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0C8.96152 0 0 8.96152 0 20C0 31.0385 8.96152 40 20 40C31.0385 40 40 31.0385 40 20C40 8.96152 31.0385 0 20 0ZM20 2.66667C29.5665 2.66667 37.3333 10.4335 37.3333 20C37.3333 29.5665 29.5665 37.3333 20 37.3333C10.4335 37.3333 2.66667 29.5665 2.66667 20C2.66667 10.4335 10.4335 2.66667 20 2.66667Z"
        fill="#64DDFA"
      />
      <path
        d="M17.3359 30.6666C17.3359 29.1946 18.5306 28 20.0026 28C21.4746 28 22.6693 29.1946 22.6693 30.6666C22.6693 32.1386 21.4746 33.3333 20.0026 33.3333C18.5306 33.3333 17.3359 32.1386 17.3359 30.6666Z"
        fill="white"
      />
      <path
        d="M18.6693 24V7.99996C18.6693 7.26394 19.2666 6.66663 20.0026 6.66663C20.7386 6.66663 21.3359 7.26394 21.3359 7.99996V24C21.3359 24.736 20.7386 25.3333 20.0026 25.3333C19.2666 25.3333 18.6693 24.736 18.6693 24Z"
        fill="white"
      />
    </svg>
  );
}

export async function getStaticProps() {
  const data = await import(`../cms/pages/vr.json`);
  const header = await import(`../cms/config/header.json`);
  const seo = await import(`../cms/config/seo.json`);

  return {
    props: {
      header: header.default,
      data: data.default,
      seo: seo.default,
      blueBg: true,
    },
  };
}
