import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

export default function Slider({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [[id, isOpen], setId] = useState([0, false]);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    breakpoints: {
      "(min-width: 0px)": {
        slides: { perView: 1, spacing: 0 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 0 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 0 },
      },
    },
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="relative">
        <Details
          isOpen={isOpen}
          onClick={() => setId([id, false])}
          data={data}
          id={id}
        />
        <div ref={sliderRef} className="py-4 keen-slider md:py-8">
          {data.pointsTwo.map(({ item }, i) => (
            <button
              onClick={() => setId([i, true])}
              key={item.image}
              className="px-3 md:px-6 keen-slider__slide"
            >
              <img
                src={item.image}
                className="m-auto aspect-[0.9] md:aspect-[0.63] rounded-3xl w-full  object-cover"
                alt=""
              />
              <p className="pt-8 pb-1 text-lg leading-none text-left text-white whitespace-pre-line font-display">
                {item.heading}
              </p>
              <p className="text-[#00E0FE] text-sm text-left lg:text-lg">
                Подробнее
              </p>
            </button>
          ))}
        </div>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="w-full h-2 px-3 overflow-hidden">
          <div className="w-full overflow-hidden rounded-full">
            <div
              style={{
                width: `${
                  (
                    currentSlide /
                    instanceRef.current.track.details.slides.length
                  ).toFixed(2) *
                    100 +
                  20
                }%`,
              }}
              className="h-2 rounded-full duration-200 md:hidden bg-[#00E0FE]"
            ></div>
            <div
              style={{
                width: `${
                  (
                    currentSlide /
                    (instanceRef.current.track.details.slides.length - 1)
                  ).toFixed(2) *
                    100 +
                  20
                }%`,
              }}
              className="h-2 rounded-full duration-200 hidden md:block lg:hidden bg-[#00E0FE]"
            ></div>
            <div
              style={{
                width: `${
                  (
                    currentSlide /
                    (instanceRef.current.track.details.slides.length - 4)
                  ).toFixed(2) *
                    40 +
                  60
                }%`,
              }}
              className="h-2 rounded-full duration-200 hidden lg:block bg-[#00E0FE]"
            ></div>
          </div>
        </div>
      )}
    </>
  );
}

function Details({ data, id, isOpen, onClick }) {
  return (
    <div
      className={`${
        !isOpen ? "translate-x-[100vw]" : ""
      } duration-200 absolute w-full px-5 md:px-0 top-0 left-0 right-0 bg-[#08091E] z-10 text-white pb-10 min-h-full`}
    >
      <button
        onClick={() => onClick()}
        className="absolute !leading-none -mt-14 lg:-mt-0 top-0 right-0 mx-5 md:mx-0"
      >
        <span className="inline-block text-5xl font-thin !leading-none text-white rotate-45">
          +
        </span>
      </button>
      <div key={id}>
        <div className="lg:flex lg:pb-12">
          <iframe
            width="100%"
            height="315"
            src={data.pointsTwo[id].item.ytLink}
            title={data.pointsTwo[id].item.heading}
            frameBorder="0"
            allow="autoplay;"
            allowFullScreen=""
            className="lg:w-1/2"
          />
          <div className="pt-4 mt-auto lg:w-1/2 lg:pl-10 lg:pt-0">
            <p className="lg:pb-12 pb-4 whitespace-pre-line text-2xl !leading-none lg:!leading-none font-display">
              {data.pointsTwo[id].item.heading}
            </p>
            <div className="flex items-center justify-start">
              {data.pointsTwo[id].item.people && (
                <>
                  <img
                    src="/images/people.svg"
                    alt=""
                    className="-ml-6 h-20 w-[5.375rem]"
                  />
                  <p className="text-lg">{data.pointsTwo[id].item.people}</p>
                </>
              )}
              <p
                style={{ textShadow: "0 0 25px #5fcfff" }}
                className="font-bold text-[#5FCFFF] ml-32 text-[1.75rem]"
              >
                {data.pointsTwo[id].item.ageRating}
              </p>
            </div>
            <p className="text-lg  !leading-tight">
              {data.pointsTwo[id].item.textOne}
            </p>
          </div>
        </div>
        <div className="pt-12 lg:pt-0">
          <p
            style={{ textShadow: "0 0 25px #5fcfff" }}
            className="text-[#5FCFFF] pb-5  font-bold text-lg"
          >
            {data.pointsTwo[id].item.headingTwo}
          </p>
          <p className="text-lg whitespace-pre-line !leading-tight">
            {data.pointsTwo[id].item.textTwo}
          </p>
        </div>
      </div>
    </div>
  );
}

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <button
      className={`${
        props.left ? " rotate-180 left-0" : "right-0"
      } absolute -translate-y-1/2 top-1/2 md:p-8 p-4 -mt-10`}
      onClick={props.onClick}
    >
      <svg
        className={`bg-[#00000066] rounded-full ${disabeld} inline-block w-8 h-8`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 34"
      >
        <g filter="url(#filter0_d_642_69)">
          <path
            d="M21 17.2239C21 17.5721 20.912 17.8831 20.7358 18.1567C20.5849 18.4055 20.3082 18.6667 19.9057 18.9403L8.77359 26.5522C8.6478 26.6269 8.48428 26.7264 8.28302 26.8507C8.10692 26.9502 7.93082 27 7.75472 27C7.55346 27 7.37736 26.9378 7.22642 26.8134C7.07547 26.6891 7 26.5025 7 26.2537V25.6194C7 25.3706 7.05031 25.1716 7.15094 25.0224C7.27673 24.8483 7.49057 24.6617 7.79245 24.4627L18.6981 17L7.79245 9.53731C7.49057 9.33831 7.27673 9.16418 7.15094 9.01492C7.05031 8.8408 7 8.62935 7 8.3806V7.74627C7 7.49751 7.07547 7.31094 7.22642 7.18657C7.37736 7.06219 7.55346 7 7.75472 7C7.93082 7 8.10692 7.06219 8.28302 7.18657C8.48428 7.28607 8.6478 7.37313 8.77359 7.44776L19.9057 15.0597C20.3082 15.3333 20.5849 15.607 20.7358 15.8806C20.912 16.1294 21 16.4279 21 16.7761V17.2239Z"
            fill="#00E0FE"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_642_69"
            x="0"
            y="0"
            width="28"
            height="34"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="3.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.3725 0 0 0 0 0.81175 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_642_69"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_642_69"
              result="shape"
            />
          </filter>
        </defs>

        {/* {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )} */}
      </svg>
    </button>
  );
}
