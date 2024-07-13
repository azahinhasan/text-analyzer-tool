const countWords = (text) => {
  if (!text) return 0;
  const words = text.match(/\b\w+\b/g);
  return words.length;
};

const countCharacters = (text) => {
  if (!text) return 0;
  return text.length;
};

const countSentences = (text) => {
  if (!text) return 0;
  const sentences = text
    .split(/[.!?]/)
    .filter((sentence) => sentence.trim() !== "");
  return sentences.length;
};

const countParagraphs = (text) => {
  if (!text) return 0;
  const paragraphs = text
    .trim()
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");
  return paragraphs.length;
};

const longestWordsInParagraphs = (text) => {
  if (!text) return [];
  const words = text.split(" ");
  const maxLength = Math.max(...words.map((word) => word.length));
  return words.filter((word) => word.length === maxLength);
};

module.exports = {
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  longestWordsInParagraphs,
};
