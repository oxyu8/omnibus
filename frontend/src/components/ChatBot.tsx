import { ChangeEventHandler, useState } from "react";
import styles from "../styles/components/ChatBot.module.scss";
import { Index } from "./ChatBotReply/Index";
import { Buttons } from "./UserReply/Buttons";

export type ChatBotReplyType = "question" | "quiz" | "encouragement";

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
