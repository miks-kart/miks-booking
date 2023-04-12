import { Formik, Form, Field } from "formik";
import _ from "lodash";
import { useState } from "react";
import * as Yup from "yup";
import { useStore } from "./Store";
import { numberWithCommas } from "./utils/NumberWithCommas";
import getItemTotalPrice from "./utils/GetItemTotalPrice";

const Schema = Yup.object().shape({
  name: Yup.string().min(2).max(64).required(),
  email: Yup.string().email().required(),
  phone: Yup.string().min(8).max(25).required(),
  toggle: Yup.bool().oneOf([true], "Field must be checked"),
});

export default function FormSale({ data, setIsError, setIsSent }) {
  const [sendingStatus, setSendingStatus] = useState("notSending");

  const dates = useStore((state) => state.dates);
  const discounts = useStore((state) => state.discounts);
  const shoppingCart = useStore((state) => state.shoppingCart);
  const totalForSections = useStore((state) => state.totalForSections);
  const cartOne = shoppingCart.extras.filter((item) => item.amount > 0);
  const options = [
    ...shoppingCart.salads,
    ...shoppingCart.menu,
    ...shoppingCart.pasta,
    ...shoppingCart.sandwitches,
    ...shoppingCart.snacks,
    ...shoppingCart.fish,
    ...shoppingCart.meat,
    ...shoppingCart.sides,
    ...shoppingCart.sauses,
    ...shoppingCart.bread,
    ...shoppingCart.desert,
    // ...shoppingCart.bar,
    ...shoppingCart.drinks,
    ...shoppingCart.beer,
    ...shoppingCart.beerBottle,
    ...shoppingCart.tea,
  ];
  const extraOptions = [...shoppingCart.extrasOpt, ...shoppingCart.hall];
  const cartThree = options.filter((item) => item.amount > 0);
  const cartThreeOptions = extraOptions.filter((item) => item.amount > 0);
  let totalForSectionThree = 0;
  options.forEach(
    (item) =>
      item.price &&
      (totalForSectionThree += Math.round(getItemTotalPrice(item) * 1.1))
  );

  function generateUrl() {
    const start = "https://miks-conf.netlify.app/config?";

    let dateOne = "";
    let dateTwo = "";
    let cart = "";

    if (dates.dateOne.date && dates.dateOne.time[0] && dates.dateOne.time[1]) {
      dateOne += `d1=${dates.dateOne.date.day
        .toString()
        .padStart(2, "0")}${dates.dateOne.date.month
        .toString()
        .padStart(2, "0")}${dates.dateOne.date.year},${dates.dateOne.time[0]},${
        dates.dateOne.time[1]
      }&`;
    }

    if (dates.dateTwo.date && dates.dateTwo.time[0] && dates.dateTwo.time[1]) {
      dateTwo += `d2=${dates.dateTwo.date.day
        .toString()
        .padStart(2, "0")}${dates.dateTwo.date.month
        .toString()
        .padStart(2, "0")}${dates.dateTwo.date.year},${dates.dateTwo.time[0]},${
        dates.dateTwo.time[1]
      }&`;
    }

    if (shoppingCart) {
      for (let [key, value] of Object.entries(shoppingCart)) {
        if (key !== "hall") {
          let itemsInCategory = [];
          value.forEach((item, i) => {
            if (item.amount > 0) {
              itemsInCategory.push(`${i},${item.amount}`);
            }
          });

          cart +=
            itemsInCategory.length > 0
              ? `item=${key}.${itemsInCategory.join(";")}&`
              : "";
        } else {
          if (value[0].amount > 0) {
            cart += `item=${key}.${data.collapsibleThree.hall.findIndex(
              (item) =>
                JSON.stringify(_.omit(item, "amount")) ===
                JSON.stringify(_.omit(value[0], "amount"))
            )},1&`;
          }
        }
      }
      cart.slice(-1) === "&" && (cart = cart.slice(0, -1));
    }

    return start + dateOne + dateTwo + cart;
  }

  const inputStyles =
    "py-5 px-5 w-full rounded-none h-[3.75rem] outline-none appearance-none shadow-none box-border align-middle border-[0.0625rem] border-black !text-sm placeholder:text-black border-primary-dark";

  function showError() {
    setSendingStatus("error");
    setIsError(true);
    setTimeout(() => {
      setSendingStatus("notSending");
      setIsError(false);
    }, 5000);
  }

  function showSuccess(actions) {
    setSendingStatus("sent");
    setIsSent(true);
    setTimeout(() => {
      setSendingStatus("notSending");
      clearForm(actions);
    }, 5000);
  }

  async function handleSubmit(values, actions) {
    setSendingStatus("sending");

    let emailData = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      conf: false,
      data,
      url: generateUrl(),
      store: {
        cartThree,
        discounts,
        cartThreeOptions,
        cartOne,
        dates,
        totalForSections,
        totalForSectionThree,
      },
    };

    const sendAdmin = await fetch("/api/sendToAdmin", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => res.status !== 500)
      .catch(() => false);

    const sendCustomer = await fetch("/api/sendToCustomer", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => res.status !== 500)
      .catch(() => false);

    if (sendCustomer && sendAdmin) {
      showSuccess(actions);
    } else {
      showError();
    }
  }

  function clearForm(actions) {
    actions.resetForm();
    setSendingStatus("notSending");
  }
  const BUTTON_STATES = {
    notSending: {
      buttonText: data.checkout.button,
    },
    sending: {
      buttonText: "Отправка...",
    },
    error: {
      buttonText: data.checkout.button,
    },
    sent: {
      buttonText: data.checkout.button,
    },
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          toggle: false,
        }}
        validationSchema={Schema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {({ touched, errors, values }) => (
          <Form className="w-full">
            <div className="grid-cols-2 md:grid gap-x-5">
              <div className="space-y-[0.625rem]">
                <Field
                  placeholder={data.checkout.namePlaceholder}
                  className={`${
                    touched.name && errors.name ? "!border-primary-red" : ""
                  } ${inputStyles}`}
                  name="name"
                />

                <Field
                  placeholder={data.checkout.emailPlaceholder}
                  className={`${
                    touched.email && errors.email ? "!border-primary-red" : ""
                  } ${inputStyles}`}
                  name="email"
                  type="email"
                />

                <Field
                  placeholder={data.checkout.phonePlaceholder}
                  className={`${
                    touched.phone && errors.phone ? "!border-primary-red" : ""
                  } ${inputStyles}`}
                  name="phone"
                  type="tel"
                />
              </div>

              <div className="!h-full border-[0.0625rem] border-black py-5 mt-[0.625rem] md:mt-0 px-5 text-primary-gray-medium text-sm !leading-[1.8]">
                <p className="">{data.checkout.msgPlaceholder}</p>
                {!isNaN(totalForSections.one) && totalForSections.one > 0 && (
                  <p className="">
                    {data.collapsibleOne.title}{" "}
                    <span className="font-semibold whitespace-pre-line">
                      {`${numberWithCommas(totalForSections.one)} р.`}
                    </span>
                  </p>
                )}
                {!isNaN(totalForSections.dateTwo) &&
                  totalForSections.dateTwo > 0 && (
                    <p className="">
                      {data.collapsibleTwo.title}{" "}
                      <span className="font-semibold whitespace-pre-line">
                        {` ${numberWithCommas(totalForSections.dateTwo)} р.`}
                      </span>
                    </p>
                  )}
                {!isNaN(totalForSections.three) &&
                  totalForSections.three > 0 && (
                    <p className="">
                      {data.collapsibleThree.title}{" "}
                      <span className="font-semibold whitespace-pre-line">
                        {` ${numberWithCommas(totalForSections.three)} р.`}
                      </span>
                    </p>
                  )}
                <p className="">
                  {data.smallTexts.totalSumm}{" "}
                  <span className="font-semibold whitespace-pre-line">
                    {`${numberWithCommas(
                      totalForSections.one +
                        totalForSections.dateTwo +
                        totalForSections.three
                    )} р.`}
                  </span>
                </p>
              </div>
            </div>
            <div className="pt-5 pb-5 md:pb-8 text-[0.625rem] md:text-xs ">
              <p className="pb-2">{data.checkout.pdfMsg}</p>
              <label className="flex items-center">
                <div className="relative flex w-3 h-3">
                  <Field
                    className={`${
                      touched.toggle && errors.toggle
                        ? "!border-primary-red"
                        : ""
                    } w-3 h-3 rounded-full appearance-none border-[0.0625rem] border-black cursor-pointer`}
                    type="checkbox"
                    name="toggle"
                  />
                  {values.toggle && (
                    <div className="absolute inset-0 w-[0.375rem] h-[0.375rem] rounded-full center-xy bg-primary-red"></div>
                  )}
                </div>
                <span className="pl-[0.625rem] cursor-pointer">
                  {data.checkout.personalData.text}&nbsp;
                </span>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={data.checkout.personalData.link}
                  className="underline"
                >
                  {data.checkout.personalData.linkText}
                </a>
              </label>
            </div>
            <button
              disabled={sendingStatus === "sending"}
              type="submit"
              className="!block mx-auto theme-button !w-full md:!w-[13rem]"
            >
              {BUTTON_STATES[sendingStatus]["buttonText"]}
            </button>
          </Form>
        )}
      </Formik>
      <style global jsx>{`
        input,
        textarea {
          line-height: normal;
          transition: border-color 0.2s;
          resize: none;
        }
      `}</style>
    </>
  );
}
