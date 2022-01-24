const QuestionSentenceList = [
  "遺伝子組み換え食品とはどのようなものか知っていますか？",
  "遺伝子組み換え食品を作るメリットは何か知っていますか？",
  "遺伝子組み換えの安全性審査について理解していますか？",
  "遺伝子組み換えの安全性評価がどのように行われているのかについて知っていますか？",
  // "遺伝子組み換え食品についての懸念について理解していますか？",
  "遺伝子組み換え食品に関する諸外国の状況について知っていますか？",
];

export const getQuestionSentence = (index: number) => {
  return QuestionSentenceList[index];
};
