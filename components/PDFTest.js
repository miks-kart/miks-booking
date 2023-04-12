import { PDFViewer } from "@react-pdf/renderer";
import PDF from "./PDF";
import { useStore } from "./Store";
import getItemTotalPrice from "./utils/GetItemTotalPrice";

export default function PDFTest({ data, conf }) {
  const dates = useStore((state) => state.dates);
  const shoppingCart = useStore((state) => state.shoppingCart);
  const discounts = useStore((state) => state.discounts);
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
  return (
    <>
      {typeof window !== "undefined" && (
        <PDFViewer className="w-full h-screen ">
          <PDF
            conf={conf}
            discounts={discounts}
            cartThree={cartThree}
            cartThreeOptions={cartThreeOptions}
            cartOne={cartOne}
            dates={dates}
            totalForSections={totalForSections}
            totalForSectionThree={totalForSectionThree}
            data={data}
          />
        </PDFViewer>
      )}
    </>
  );
}
