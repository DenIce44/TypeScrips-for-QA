interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPostsByUser(userId: number): Promise<Post[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  );

  console.log(`Response status: ${response.status}`);

  if (!response.ok) {
    throw new Error(
      `Failed to get posts for user ${userId}. HTTP status: ${response.status}`,
    );
  }

  return (await response.json()) as Post[];
}

async function main(): Promise<void> {
  try {
    const posts = await getPostsByUser(1);

    console.log(`Posts count: ${posts.length}`);

    const titles = posts.map((post) => post.title);

    console.log("Post titles:");
    console.log(titles);

    const hasEmptyTitle = posts.some((post) => post.title.trim().length === 0);

    console.log(`Has empty title: ${hasEmptyTitle}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Request error: ${error.message}`);
    } else {
      console.error("Unknown request error");
    }
  }
}

main();

export {};
