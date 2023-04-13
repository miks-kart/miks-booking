export default function Hero({ data }) {
  return (
    <article>
      <h1 className="pb-8 !text-4xl text-center text-white uppercase lg:text-5xl">
        {data.headingOne}
      </h1>
      <p className="max-w-3xl mx-auto !text-sm  md:!text-lg text-center text-white theme-text">
        {data.textOne}
      </p>
      <div className="hidden mx-auto lg:table">
        <div className="bg-[#222629] rounded-2xl md:inline-flex mt-8 items-center p-7 ">
          <div className="p-[0.625rem] rounded-[5.4%] border-[0.3125rem] w-[17.5rem] border-primary-red">
            <img
              src={data.disclaimer.qrcode}
              alt=""
              className="rounded-[4.8%] w-full aspect-square"
            />
          </div>
          <svg
            className="w-[2.75rem] ml-9 mr-14"
            viewBox="0 0 35 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 22.5981C-0.500001 21.4434 -0.500001 18.5566 1.5 17.4019L30 0.947436C32 -0.207265 34.5 1.23611 34.5 3.54551L34.5 36.4545C34.5 38.7639 32 40.2073 30 39.0526L1.5 22.5981Z"
              fill="#D50201"
            />
          </svg>
          <p className="text-white theme-text w-[18.75rem] !text-lg mr-16">
            {data.disclaimer.text}
          </p>
          <img src={data.disclaimer.icons} alt="" className="w-16" />
        </div>
      </div>
      <div className="bg-[#222629] mx-auto max-w-md lg:hidden rounded-2xl p-5 mt-8">
        <div className="flex">
          <p className="text-white theme-text !text-sm mr-7">
            {data.disclaimer.text}
          </p>
          <img src={data.disclaimer.icons} alt="" className="w-12" />
        </div>

        <svg
          className="w-[2.5rem] mx-auto my-5"
          viewBox="0 0 40 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.2492 33C21.0945 35 18.2077 35 17.053 33L0.598557 4.50001C-0.556144 2.50001 0.887234 7.34785e-06 3.19663 7.14595e-06L36.1056 4.26896e-06C38.415 4.06707e-06 39.8584 2.5 38.7037 4.5L22.2492 33Z"
            fill="#D50201"
          />
        </svg>
        <div className="p-[0.625rem] mx-auto rounded-[5.4%] border-[0.3125rem] w-[17.5rem] border-primary-red">
          <img
            src={data.disclaimer.qrcode}
            alt=""
            className="rounded-[4.8%] w-full aspect-square"
          />
        </div>
      </div>
    </article>
  );
}
