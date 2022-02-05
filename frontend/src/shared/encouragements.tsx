const encouragementList = [
  "不正解です！遺伝子組み換え食品について調べてみよう！",
  "不正解です！遺伝子組み換え食品のメリットについて調べてみよう！",
  "不正解です！遺伝子組み換え食品の安全性審査について調べてみよう！",
  "不正解です！遺伝子組み換え食品の安全性評価について調べてみよう！",
  "不正解です！遺伝子組み換え食品に関する諸外国の状況について調べてみよう！",
];

export const getEncouragementSentence = (index: number) => {
  return encouragementList[index];
};
