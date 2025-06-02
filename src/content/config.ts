import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('TinkByte Team'),
    heroImage: z.string().optional(),
    readingTime: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    excerpt: z.string().optional(), // Add this for RSS
  })
});

export const collections = { blog };