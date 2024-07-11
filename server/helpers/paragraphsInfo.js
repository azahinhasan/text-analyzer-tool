function countWords(text) {
  if (!text) return 0;
  const words = text.split(/\s+/).filter((word) => word !== "");
  return words.length;
}

function countCharacters(text) {
  if (!text) return 0;
  const characters = text.replace(/\s/g, "");
  return characters.length;
}

function countSentences(text) {
  if (!text) return 0;
  const sentences = text
    .split(/[.!?]/)
    .filter((sentence) => sentence.trim() !== "");
  return sentences.length;
}

function countParagraphs(text) {
  if (!text) return 0;
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim() !== "");
  return paragraphs.length;
}

function longestWordsInParagraphs(text) {
  if (!text) return [];
  const words = text.split(" ");
  const maxLength = Math.max(...words.map((word) => word.length));
  return words.filter((word) => word.length === maxLength);
}

module.exports = {
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  longestWordsInParagraphs,
};
