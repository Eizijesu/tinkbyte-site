export interface ReadingTimeResult {
  text: string;
  minutes: number;
  words: number;
}

export function calculateReadingTime(content: string): ReadingTimeResult {
  const cleanContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/[#*`_~\[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleanContent.split(' ').filter(word => word.length > 0).length;
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}
