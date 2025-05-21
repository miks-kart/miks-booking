export default function getItemTotalPrice(item) {
  return item.discountFrom?.enabled === "true" &&
    item.discountFrom?.discountPrice &&
    item.discountFrom?.from <= item.amount
    ? item.amount * parsePrice(item.discountFrom.discountPrice)
    : item.amount * parsePrice(item.price);
}

function parsePrice(price) {
   let parsedPrice = parseInt(price);
   if (isNaN(parsedPrice)) {
    parsedPrice = 0;
   }
   return parsedPrice;
}
