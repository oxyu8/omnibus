import { stat } from "fs";
import { ChangeEventHandler, useState } from "react";
import { getEncouragementSentence } from "../../core/encouragement";
import { getQuestionSentence } from "../../core/question";
import { getQuizAnswerObj, getQuizStatement } from "../../core/quiz";
import styles from "../styles/components/ChatBot.module.scss";
import { ChatBotIcon } from "./ChatBotIcon";
import { Encouragement } from "./ChatBotReply/Encouragement";
import { Index } from "./ChatBotReply/Index";
import { Question } from "./ChatBotReply/Question";
import { Quiz } from "./ChatBotReply/Quiz";
import { Buttons } from "./UserReply/Buttons";

export type ChatBotReplyType = "question" | "quiz" | "encouragement";

// const generateChatReply = (type: ChatBotReplyType, status: number) => {
//   if (type === "question") {
//     return Question(status);
//   } else if (type === "quiz") {
//     return Quiz(status);
//   } else if (type === "encouragement") {
//     return Encouragement(status);
//   }
// };

export const ChatBot = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [interactionList, setInteractionList] = useState<any[]>([
    { type: "question", status: 0 },
  ]);

  const clickYesBtn = () => {
    setInteractionList([
      ...interactionList,
      { type: "quiz", status: currentStatus },
    ]);
  };

  const clickNoBtn = () => {
    setInteractionList([
      ...interactionList,
      { type: "encouragement", status: currentStatus },
    ]);
  };

  const answer = () => {
    //TODO: 正解不正解での分岐
    if (true) {
      setCurrentStatus(currentStatus + 1);
      setInteractionList([
        ...interactionList,
        { type: "question", status: currentStatus + 1 },
      ]);
    }
  };
  return (
    <div className={styles.container}>
      {interactionList.map((interaction, index) => {
        return (
          <div key={index}>
            <Index type={interaction.type} status={interaction.status} />
            <div className={styles.replyButtonWrapper}>
              <Buttons
                type={interaction.type}
                clickYesBtn={clickYesBtn}
                clickNoBtn={clickNoBtn}
                answer={answer}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
