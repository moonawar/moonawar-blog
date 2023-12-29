// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      image: z.object({
        path: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});

export const collections = {
  posts: postsCollection,
};