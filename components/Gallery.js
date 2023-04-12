import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function Gallery({ images }) {
  const [page, setPage] = useState(0);

  const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage(page + newDirection);
  };

  return (
    <section className="lg:h-[43.75rem] md:flex ">
      <div className="flex flex-col w-full md:w-3/4  lg:w-3/5 bg-[#222629]">
        <div className="relative w-full h-full aspect-[16/10] md:aspect-auto">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={page}
              src={images[imageIndex].item.image}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute object-cover w-full h-full rounded-b-[1.5rem]"
              transition={{
                opacity: { duration: 0.6 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap items-center justify-between p-4 md:flex-nowrap">
          <button
            className="w-[4.375rem] order-2 md:order-1 h-[4.375rem] border-[0.0625rem] block border-white rounded-xl hover:opacity-50 duration-200"
            onClick={() => paginate(-1)}
          >
            <Arrow left />
          </button>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={page}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-start justify-center order-1 w-full h-full mb-6 md:w- md:order-2 md:px-8 md:mb-0"
              transition={{
                opacity: { duration: 0.6 },
              }}
            >
              <p className="text-white">{images[imageIndex].item.heading}</p>
              <p className="flex items-center text-sm text-white opacity-50">
                <Clock />
                <span className="pl-2">{images[imageIndex].item.text}</span>
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            className="w-[4.375rem] order-3 h-[4.375rem] border-[0.0625rem] block border-white rounded-xl hover:opacity-50 duration-200"
            onClick={() => paginate(1)}
          >
            <Arrow />
          </button>
        </div>
      </div>
      <div className="md:block md:w-1/4 lg:w-2/5 ">
        <div className="hidden h-full grid-cols-2 lg:grid">
          {images.map(({ item }, i) => (
            <button
              onClick={() => setPage(i)}
              className="overflow-hidden"
              key={i}
            >
              <img
                src={item.image}
                alt=""
                className="object-cover w-full h-full "
              />
            </button>
          ))}
        </div>
        <div className="hidden h-full grid-cols-1 md:grid lg:hidden">
          {images.slice(4).map(({ item }, i) => (
            <button
              onClick={() => setPage(i)}
              className="overflow-hidden"
              key={i}
            >
              <img
                src={item.image}
                alt=""
                className="object-cover w-full h-full "
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Arrow({ left }) {
  return (
    <svg
      className={`${
        !left ? "rotate-180" : ""
      } h-6 m-auto w-[4.375rem] origin-center`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.933 24.552"
    >
      <path
        id="arrow"
        d="M0,9.448,9.448,0,18.9,9.448"
        transform="translate(5.657 21.724) rotate(-90)"
        fill="none"
        stroke="#fff"
        strokeWidth="8"
      />
    </svg>
  );
}

function Clock() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-3"
      viewBox="0 0 16.008 16"
    >
      <g id="clock" transform="translate(0.5 0.5)">
        <g id="Group_44" data-name="Group 44" transform="translate(0 0)">
          <path
            id="Path_85"
            data-name="Path 85"
            d="M14.409,4.747a7.353,7.353,0,0,0-4-3.98,7.376,7.376,0,0,0-2.921-.6,7.3,7.3,0,0,0-2.913.6A7.376,7.376,0,0,0,.591,4.747a7.5,7.5,0,0,0,0,5.834,7.392,7.392,0,0,0,3.988,3.988,7.3,7.3,0,0,0,2.913.6,7.379,7.379,0,0,0,2.921-.6,7.369,7.369,0,0,0,4-3.988,7.4,7.4,0,0,0,0-5.834Zm-1.2,6.228a6.584,6.584,0,0,1-2.412,2.4,6.463,6.463,0,0,1-3.307.886,6.354,6.354,0,0,1-2.56-.525,6.709,6.709,0,0,1-2.1-1.4,6.669,6.669,0,0,1-1.4-2.109A6.461,6.461,0,0,1,.911,7.66a6.451,6.451,0,0,1,.878-3.3,6.587,6.587,0,0,1,2.4-2.4,6.413,6.413,0,0,1,3.3-.886,6.463,6.463,0,0,1,3.307.886,6.6,6.6,0,0,1,2.412,2.4,6.414,6.414,0,0,1,.886,3.3A6.475,6.475,0,0,1,13.211,10.975Z"
            transform="translate(0 -0.168)"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1"
          />
          <path
            id="Path_86"
            data-name="Path 86"
            d="M288.02,115.631v-4.251a.473.473,0,0,0-.476-.46.463.463,0,0,0-.451.46V115.7a.375.375,0,0,1,.016.066.429.429,0,0,0,.123.369l2.454,2.453a.467.467,0,0,0,.632,0,.443.443,0,0,0,0-.64Z"
            transform="translate(-280.053 -108.205)"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1"
          />
        </g>
      </g>
    </svg>
  );
}
