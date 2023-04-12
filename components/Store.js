import _ from "lodash";
import { create } from "zustand";

export const useStore = create((set) => ({
  totalForSections: {
    one: 0,
    two: 0,
    three: 0,
    dateOne: 0,
    dateTwo: 0,
  },
  changeTotal: (summ, num) => {
    set((state) => ({
      totalForSections: {
        ...state.totalForSections,
        [num]: summ,
      },
    }));
  },
  discounts: {
    one: 0,
    two: 0,
    three: 0,
  },
  changeDiscounts: (summ, num) => {
    set((state) => ({
      discounts: {
        ...state.discounts,
        [num]: summ,
      },
    }));
  },
  dates: {
    dateOne: {
      date: null,
      time: [12, NaN],
    },
    dateTwo: {
      date: null,
      time: [12, NaN],
    },
  },
  resetDateTime: (date, time1 = 12) => {
    set((state) => ({
      dates: {
        ...state.dates,
        [date]: {
          date: state.dates[date].date,
          time: [time1, NaN],
        },
      },
    }));
  },
  changeDate: (newDate, date) => {
    set((state) => ({
      dates: {
        ...state.dates,
        [date]: {
          ...state.dates[date],
          date: newDate,
        },
      },
    }));
  },
  changeTime: (newTime, date) => {
    set((state) => ({
      dates: {
        ...state.dates,
        [date]: {
          ...state.dates[date],
          time: newTime,
        },
      },
    }));
  },
  shoppingCart: {
    extras: [],
    salads: [],
    menu: [],
    pasta: [],
    sandwitches: [],
    snacks: [],
    fish: [],
    meat: [],
    sides: [],
    sauses: [],
    bread: [],
    desert: [],
    // bar: [],
    drinks: [],
    beer: [],
    beerBottle: [],
    tea: [],
    extrasOpt: [],
    hall: [],
  },
  setShoppingCart: (item) => {
    set(() => ({
      shoppingCart: { ...item },
    }));
  },
  addToShoppingCart: (input, category) => {
    set((state) => ({
      shoppingCart: {
        ...state.shoppingCart,
        [category]: [...state.shoppingCart[category], { ...input, amount: 1 }],
      },
    }));
  },
  initCart: (input) => {
    set(() => ({
      shoppingCart: input,
    }));
  },
  initItem: (input, category) => {
    set((state) => ({
      shoppingCart: {
        ...state.shoppingCart,
        [category]: [...state.shoppingCart[category], { ...input, amount: 0 }],
      },
    }));
  },
  removeFromShoppingCart: (input, category) => {
    set((state) => ({
      shoppingCart: {
        ...state.shoppingCart,
        [category]: state.shoppingCart[category].filter(
          (item) =>
            JSON.stringify(_.omit(item, "amount")) !==
            JSON.stringify(_.omit(input, "amount"))
        ),
      },
    }));
  },
  changeAmount: (input, newAmount, category) => {
    set((state) => ({
      shoppingCart: {
        ...state.shoppingCart,
        [category]:
          category === "hall"
            ? [{ ...input, amount: newAmount }]
            : state.shoppingCart[category].map((item) =>
                JSON.stringify(_.omit(item, "amount")) ===
                JSON.stringify(_.omit(input, "amount"))
                  ? { ...item, amount: newAmount }
                  : item
              ),
      },
    }));
  },
  changePrice: (input, newAmount, category) => {
    set((state) => ({
      shoppingCart: {
        ...state.shoppingCart,
        [category]: state.shoppingCart[category].map((item) =>
          JSON.stringify(_.omit(item, "amount")) ===
          JSON.stringify(_.omit(input, "amount"))
            ? { ...item, price: newAmount }
            : item
        ),
      },
    }));
  },
}));
