/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/content" />

/// <reference types="astro/client" />

declare namespace astroHTML.JSX {
    interface HTMLAttributes {
      class?: string;
    }
    interface SVGAttributes {
      class?: string;
    }
  }
  
  declare module 'astro:content' {
    interface Render {
      '.mdx': Promise<{
        Content: import('astro').MarkdownInstance<{}>['Content'];
        headings: import('astro').MarkdownHeading[];
        remarkPluginFrontmatter: Record<string, any>;
      }>;
    }
  }
  