import { Quiz } from "../../types/quiz";

export const data: Quiz = {
  isSingleCorrectAnswerQuiz: false,
  answerIndexList: [0, 1],
  quizSentence:
    "これまで遺伝子組み換え食品を食べて健康に悪影響を及ぼした事例について正しい記述を1つ選択してください",
  choiceSentenceList: [
    "ある企業が、ダイズの栄養価を高めるために、ブラジルナッツのDNA を入れてみたところ、アレルギーを引き起こすことが分かり、開発を中止したという事例がある",
    "ある企業が、ダイズの栄養価を高めるために、ブラジルナッツのDNA を入れてみたところ、アレルギーを引き起こすことが分かり、開発を中止したという事例がない",
    "米国で 1988～89 年にかけて、Ｌ－トリプトファンを主成分とする食品 を摂取した人の中から、全身性の激しい筋肉痛と好酸球増多を主な症状とする 健康被害（好酸球増多・筋肉痛症候群：EMS）が多発し、報告患者数が 1500 13 人以上と言われているという事例は組換えＤＮＡ技術と直接関連性がない",
    "米国で 1988～89 年にかけて、Ｌ－トリプトファンを主成分とする食品 を摂取した人の中から、全身性の激しい筋肉痛と好酸球増多を主な症状とする 健康被害（好酸球増多・筋肉痛症候群：EMS）が多発し、報告患者数が 1500 13 人以上と言われているという事例は組換えＤＮＡ技術と直接関連性がある",
  ],
};