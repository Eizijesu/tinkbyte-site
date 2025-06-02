import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context: any) {
  try {
    const posts = await getCollection('blog');
    
    // Filter out draft posts and sort by date
    const publishedPosts = posts
      .filter(post => !post.data.draft)
      .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());
    
    // Validate that we have a site URL
    const siteUrl = context.site || 'https://tinkbyte.com';
    
    return rss({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      site: siteUrl,
      items: publishedPosts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description || '',
        link: `/blog/${post.slug}/`,
        author: post.data.author || 'TinkByte Team',
        categories: post.data.tags || [],
        // Optional: Add content excerpt
        content: post.data.excerpt || post.data.description || '',
      })),
      // Optional: Add custom XML namespace
      customData: `
        <language>en-us</language>
        <managingEditor>hello@tinkbyte.com (TinkByte Team)</managingEditor>
        <webMaster>hello@tinkbyte.com (TinkByte Team)</webMaster>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <generator>Astro + TinkByte</generator>
      `,
    });
  } catch (error) {
    console.error('RSS Generation Error:', error);
    
    // Return a basic RSS feed on error
    return rss({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      site: context.site || 'https://tinkbyte.com',
      items: [],
    });
  }
}