export function sanitizeHtml(html: string): string {
    // Simple HTML sanitization for Cloudflare Pages
    return html
      .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove scripts
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '') // Remove iframes
      .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
      .replace(/javascript:/gi, '') // Remove javascript: links
      .trim();
  }
  
  export function stripHtml(html: string): string {
    // Strip all HTML tags
    return html.replace(/<[^>]*>/g, '').trim();
  }
  