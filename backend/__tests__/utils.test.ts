import { validatePosts } from "../src/lib/utils";

test("validatePosts", async () => {
  const data = {
    title: "test",
    description: "test",
    coverImage: "test",
  };
  const result = await validatePosts(data);
  expect(result.status).toBe(400);
});

test("validatePosts", async () => {
  const data = {
    title: "test",
    description: "test",
    coverImage: "test",
    author: "test",
    rating: 5,
    release: "test",
    genre: "test",
    pages: 100,
    category: "test",
  };
  const result = await validatePosts(data);
  expect(result.status).toBe(200);
});

