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

  if (!response.ok) {
    throw new Error(
      `Failed to get posts for user ${userId}. HTTP status: ${response.status}`,
    );
  }

  const posts = (await response.json()) as Post[];

  return posts;
}
async function printPostsByUser(userId: number): Promise<void> {
  try {
    const posts = await getPostsByUser(userId);

    console.log(`Posts for user ${userId}:`);
    posts.forEach((post) => {
      console.log(`- ${post.title}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Request error: ${error.message}`);
    } else {
      console.error("Unknown request error");
    }
  }
}

async function countPostsByUser(userId: number): Promise<void> {
  try {
    const posts = await getPostsByUser(userId);

    console.log(`User ${userId} has ${posts.length} posts.`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Request error: ${error.message}`);
    } else {
      console.error("Unknown request error");
    }
  }
}

async function printtitlesByUser(userId: number): Promise<void> {
  try {
    const posts = await getPostsByUser(userId);

    console.log(`Titles of posts for user ${userId}:`);
    posts.forEach((post) => {
      console.log(`- ${post.title}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Request error: ${error.message}`);
    } else {
      console.error("Unknown request error");
    }
  }
}

async function emptyTitlesByUser(userId: number): Promise<void> {
  try {
    const posts = await getPostsByUser(userId);

    const emptyTitlePosts = posts.filter((post) => post.title.trim() === "");

    if (emptyTitlePosts.length > 0) {
      console.log(
        `User ${userId} has ${emptyTitlePosts.length} posts with empty titles.`,
      );
    } else {
      console.log(`User ${userId} has no posts with empty titles.`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Request error: ${error.message}`);
    } else {
      console.error("Unknown request error");
    }
  }
}

async function main(): Promise<void> {
  await printPostsByUser(1);
  await countPostsByUser(1);
  await printtitlesByUser(1);
  await emptyTitlesByUser(1);
}
main();
export {};
