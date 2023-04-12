import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import FormAdmin from "./FormAdmin";

export default function ConfigCheckOutPopUp({ isOpen, onClick, data }) {
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 font-sans __variable_b420a6 __variable_2f4839"
          onClose={() => {
            setTimeout(() => {
              setIsSent(false);
            }, 500);
            onClick();
          }}
        >
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
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[58rem] overflow-hidden">
                  {!isSent ? (
                    <>
                      {isError && (
                        <div className="w-full mb-2 text-xs text-center text-white bg-primary-red rounded-2xl">
                          <p className="leading-[1.875rem]">Ошибка!</p>
                        </div>
                      )}
                      <div className="p-5 bg-white md:p-8 rounded-2xl">
                        <div className="flex items-start justify-between">
                          <p className="text-2xl uppercase lg:text-4xl">
                            {data.admin.sendAdmin}
                          </p>
                          <CloseButton onClick={onClick} />
                        </div>
                        <p className="pt-[0.625rem] md:pt-5 pb-5 md:pb-8 whitespace-pre-line !leading-tight lg:text-lg">
                          {data.admin.sendAdminText}
                        </p>
                        <FormAdmin
                          setIsSent={setIsSent}
                          setIsError={setIsError}
                          data={data}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="p-5 bg-white md:p-8 rounded-2xl">
                      <div className="flex items-start justify-between md:justify-end">
                        <p className="pr-6 text-2xl uppercase md:hidden">
                          {data.admin.sent}
                        </p>
                        <CloseButton
                          onClick={() => {
                            setTimeout(() => {
                              setIsSent(false);
                            }, 500);
                            onClick();
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-center md:text-center">
                        <p className="hidden pb-5 uppercase md:block md:text-4xl">
                          {data.admin.sent}
                        </p>
                        <p className="pt-[0.625rem] whitespace-pre-line !leading-none md:pt-0 pb-5 text-sm md:pb-8 md:text-lg">
                          {data.admin.sentText}
                        </p>
                        <button
                          onClick={() => {
                            setTimeout(() => {
                              setIsSent(false);
                            }, 500);
                            onClick();
                          }}
                          className="theme-button !w-full md:!w-24"
                        >
                          {data.checkout.success.button}
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      className="duration-200 hover:opacity-70"
      onClick={() => onClick()}
    >
      <svg
        className="w-8 h-8"
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
  );
}
