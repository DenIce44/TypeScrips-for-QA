export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const checkoutCustomer: CheckoutCustomer = {
  firstName: "Dennis",
  lastName: "Ischuk",
  postalCode: "01001",
} satisfies CheckoutCustomer;