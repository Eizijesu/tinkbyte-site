import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  heroImage?: string;
  readingTime?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  excerpt?: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        description: data.description,
        pubDate: new Date(data.pubDate),
        author: data.author || 'TinkByte Team',
        heroImage: data.heroImage,
        readingTime: data.readingTime,
        tags: data.tags || [],
        featured: data.featured || false,
        draft: data.draft || false,
        excerpt: data.excerpt,
        content,
      } as BlogPost;
    })
    .filter(post => !post.draft)
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
    
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}
