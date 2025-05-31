export interface ReadingTimeResult {
    text: string;
    minutes: number;
    words: number;
  }
  
  export function calculateReadingTime(content: string): ReadingTimeResult {
    // Remove HTML tags and markdown syntax
    const cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[#*`_~\[\]()]/g, '') // Remove markdown syntax
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  
    const words = cleanContent.split(' ').filter(word => word.length > 0).length;
    const wordsPerMinute = 200; // Average reading speed
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  
    return {
      text: `${minutes} min read`,
      minutes,
      words,
    };
  }
  