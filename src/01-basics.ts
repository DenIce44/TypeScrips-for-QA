const projectName: string = "Playwright Automation";
const testCount: number = 5;
const isConfigured: boolean = true;

console.log(`Project: ${projectName}`);
console.log(`Test count: ${testCount}`);
console.log(`Configured: ${isConfigured}`);

interface TestUser {
  email: string;
  password: string;
  role: "admin" | "customer";
  active: boolean;
}

const customer: TestUser = {
  email: "customer@example.com",
  password: "Password123!",
  role: "customer",
  active: true,
};

console.log(`User email: ${customer.email}`);
console.log(`User role: ${customer.role}`);

function canUserLogin(user: TestUser): boolean {
  return user.active && user.password.length >= 8;
}

const loginAllowed = canUserLogin(customer);

console.log(`Login allowed: ${loginAllowed}`);
