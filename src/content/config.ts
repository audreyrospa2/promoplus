import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['HR', 'Marketing', 'Finance', 'Operations', 'Technology']),
    image: z.string(),
    description: z.string(),
    link: z.string().url(),
    featured: z.boolean().default(false),
    publishDate: z.date()
  })
});

export const collections = { products };