export default function getItemTotalPrice(item) {
  return item.discountFrom?.enabled === "true" &&
    item.discountFrom?.discountPrice &&
    item.discountFrom?.from <= item.amount
    ? item.amount * parseInt(item.discountFrom.discountPrice)
    : item.amount * parseInt(item.price);
}
