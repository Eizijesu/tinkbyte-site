import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  
  // Sort posts by publication date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'TinkByte Blog',
    description: 'Insights on technology, development, and digital innovation',
    site: context.site ?? 'https://tinkbyte.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Use optional chaining and provide fallback
      author: post.data.author ?? 'TinkByte Team',
      link: `/blog/${post.slug}/`,
      content: post.body,
      categories: post.data.tags ?? [],
    })),
    customData: `<language>en-us</language>`,
  });
}
