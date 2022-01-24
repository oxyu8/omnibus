const quizStatementList = [
  "遺伝子組み換え食品について正しい記述を1つ選択してください",
  "遺伝子組み換え食品を作るメリットについて正しい記述を1つ選択してください",
  "日本で食品として使用できる遺伝子組み換え食品をすべて選択してください",
  "食品としての安全性の評価基準として正しい記述を1つ選択してください",
  "これまで遺伝子組み換え食品を食べて健康に悪影響を及ぼした事例について正しい記述を1つ選択してください",
];

const quizAnswerList = [
  [
    {
      isAnswer: true,
      sentence:
        "遺伝子組換え食品とは、他の生物から有用な性質を持つ遺伝子を取り出し、その性質を持たせたい植物などに組み込む技術を利用して作られた食品です",
    },
    {
      isAnswer: false,
      sentence:
        "遺伝子組換え食品とは、他の生物から有用な性質を持つタンパク質を取り出し、その性質を持たせたい植物などに組み込む技術を利用して作られた食品です",
    },
    {
      isAnswer: false,
      sentence:
        "遺伝子組換え食品とは、他の生物から有用な性質を持つ酵素を取り出し、その性質を持たせたい植物などに組み込む技術を利用して作られた食品です",
    },
    {
      isAnswer: false,
      sentence:
        "遺伝子組換え食品とは、他の生物から有用な性質を持つ細胞を取り出し、その性質を持たせたい植物などに組み込む技術を利用して作られた食品です",
    },
  ],
  [
    {
      isAnswer: true,
      sentence:
        "従来の育種技術では不可能と考えられていた、害虫抵抗性や除草剤耐性の農作物を作れること",
    },
    {
      isAnswer: false,
      sentence:
        "従来の育種技術では不可能と考えられていた、低温抵抗性や除草剤耐性の農作物を作れること",
    },
    {
      isAnswer: false,
      sentence:
        "従来の育種技術では不可能と考えられていた、乾燥抵抗性や除草剤耐性の農作物を作れること",
    },
    {
      isAnswer: false,
      sentence:
        "従来の育種技術では不可能と考えられていた、紫外線抵抗性や除草剤耐性の農作物を作れること",
    },
  ],
  [
    {
      isAnswer: true,
      sentence: "ジャガイモ",
    },
    {
      isAnswer: true,
      sentence: "トウモロコシ",
    },
    {
      isAnswer: false,
      sentence: "トマト",
    },
    {
      isAnswer: false,
      sentence: "大根",
    },
  ],
  [
    {
      isAnswer: true,
      sentence:
        "遺伝子を組み換えることで新しくできたタンパク質は人に有害ではないか",
    },
    {
      isAnswer: false,
      sentence:
        "組み込まれた遺伝子が間接的に作用し、遺伝子などを作る可能性はないか",
    },
    {
      isAnswer: false,
      sentence: "食品中のアミノ酸などが大きく変わらないか",
    },
    {
      isAnswer: false,
      sentence:
        "遺伝子を組み換えることで新しくできた遺伝子は人に有害ではないか",
    },
  ],
  [
    {
      isAnswer: true,
      sentence:
        "ある企業が、ダイズの栄養価を高めるために、ブラジルナッツのDNA を入れてみたところ、アレルギーを引き起こすことが分かり、開発を中止したという事例がある",
    },
    {
      isAnswer: true,
      sentence:
        "ある企業が、ダイズの栄養価を高めるために、ブラジルナッツのDNA を入れてみたところ、アレルギーを引き起こすことが分かり、開発を中止したという事例がない",
    },
    {
      isAnswer: true,
      sentence:
        "米国で 1988～89 年にかけて、Ｌ－トリプトファンを主成分とする食品 を摂取した人の中から、全身性の激しい筋肉痛と好酸球増多を主な症状とする 健康被害（好酸球増多・筋肉痛症候群：EMS）が多発し、報告患者数が 1500 13 人以上と言われているという事例は組換えＤＮＡ技術と直接関連性がない",
    },
    {
      isAnswer: false,
      sentence:
        "米国で 1988～89 年にかけて、Ｌ－トリプトファンを主成分とする食品 を摂取した人の中から、全身性の激しい筋肉痛と好酸球増多を主な症状とする 健康被害（好酸球増多・筋肉痛症候群：EMS）が多発し、報告患者数が 1500 13 人以上と言われているという事例は組換えＤＮＡ技術と直接関連性がある",
    },
  ],
];

export const getQuizStatement = (index: number) => {
  return quizStatementList[index];
};

export const getQuizAnswerObj = (index: number) => {
  return quizAnswerList[index];
};