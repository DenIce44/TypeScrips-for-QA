function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function runExample(): Promise<void> {
  console.log("Step 1: execution started");

  await wait(2000);

  console.log("Step 2: two seconds have passed");
  console.log("Step 3: execution completed");
}

async function loadResource(
  resourceName: string,
  milliseconds: number,
): Promise<string> {
  console.log(`Loading ${resourceName}...`);

  await wait(milliseconds);

  return `${resourceName} loaded`;
}

async function runSequentially(): Promise<void> {
  console.time("Sequential execution");

  const users = await loadResource("Users", 2000);
  const products = await loadResource("Products", 2000);

  console.log(users);
  console.log(products);

  console.timeEnd("Sequential execution");
}

async function runInParallel(): Promise<void> {
  console.time("Parallel execution");

  const [users, products] = await Promise.all([
    loadResource("Users", 2000),
    loadResource("Products", 2000),
  ]);

  console.log(users);
  console.log(products);

  console.timeEnd("Parallel execution");
}

async function main(): Promise<void> {
  console.log("--- Sequential example ---");
  await runSequentially();

  console.log("--- Parallel example ---");
  await runInParallel();
}

main();
export {};
