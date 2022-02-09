const encouragementList = [
  "もう一度，遺伝子組み換え食品について調べてみよう！",
  "もう一度，遺伝子組み換え食品のメリットについて調べてみよう！",
  "もう一度，遺伝子組み換え食品の安全性審査について調べてみよう！",
  "もう一度，遺伝子組み換え食品の安全性評価について調べてみよう！",
  "もう一度，遺伝子組み換え食品に関する諸外国の状況について調べてみよう！",
];

export const getEncouragementSentence = (index: number) => {
  return encouragementList[index];
};
