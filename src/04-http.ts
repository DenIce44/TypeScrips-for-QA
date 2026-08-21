interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

async function getUser(userId: number): Promise<ApiUser> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  console.log(`Response status: ${response.status}`);

  if (!response.ok) {
    throw new Error(
      `Failed to get user ${userId}. HTTP status: ${response.status}`,
    );
  }

  const user = (await response.json()) as ApiUser;

  return user;
}

async function printUser(userId: number): Promise<void> {
  try {
    const user = await getUser(userId);

    console.log(`User ${userId}:`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Request error: ${error.message}`);
    } else {
      console.error("Unknown request error");
    }
  }
}

async function main(): Promise<void> {
  await printUser(1);
  await printUser(999);
}

main();
export {};
