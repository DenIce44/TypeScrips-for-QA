interface Product {
  id: number;
  name: string;
  price: number;
  available: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 45000,
    available: true,
  },
  {
    id: 2,
    name: "Mouse",
    price: 1200,
    available: false,
  },
  {
    id: 3,
    name: "Keyboard",
    price: 3200,
    available: true,
  },
  {
    id: 4,
    name: "Monitor",
    price: 15000,
    available: true,
  },
];
const availableProducts = products.filter((product) => product.available);
const productByName = products.find((product) => product.name === "Keyboard");
const productsOver5000 = products.filter((product) => product.price > 5000);
const hasUnavailableProduct = products.some((product) => !product.available);
const availableProductTotalPriceSum = availableProducts.reduce(
  (total, product) => total + product.price,
  0,
);
console.log(availableProducts);
console.log("All products:", products);
console.log(productByName);
console.log(productsOver5000);
console.log(`Has unavailable product: ${hasUnavailableProduct}`);
console.log(
  `Total price of available products: ${availableProductTotalPriceSum}`,
);
