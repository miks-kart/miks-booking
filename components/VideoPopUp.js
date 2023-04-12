import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function VideoPopUp({ item, onClick, open }) {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => onClick()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="overflow-hidden text-left align-middle transition-all transform pointer-events-none">
                  <div className="relative m-auto max-h-[90vh] max-w-[90vw] w-full">
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video
                      className="w-full border-4 border-white rounded-2xl"
                      autoPlay
                      playsInline
                      muted
                      loop
                      src={item.video}
                      placeholder={item.image}
                    />
                    <button
                      className="absolute top-0 right-0 z-50 w-8 h-8 m-5 cursor-pointer pointer-events-auto md:m-6"
                      onClick={() => onClick()}
                    >
                      <svg
                        className="w-8 h-8 duration-200 hover:opacity-80"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="15"
                          cy="15"
                          r="13.5"
                          fill="#D50201"
                          stroke="#D50201"
                          strokeWidth="3"
                        />
                        <path
                          d="M9.34315 19.1421L15 13.4853L16.4142 14.8995L10.7574 20.5563L9.34315 19.1421Z"
                          fill="white"
                        />
                        <path
                          d="M15 13.4853L20.6569 19.1421L19.2426 20.5563L13.5858 14.8995L15 13.4853Z"
                          fill="white"
                        />
                        <path
                          d="M20.6569 10.6569L15 16.3137L13.5858 14.8995L19.2426 9.24264L20.6569 10.6569Z"
                          fill="white"
                        />
                        <path
                          d="M15 16.3137L9.34315 10.6569L10.7574 9.24264L16.4142 14.8995L15 16.3137Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
