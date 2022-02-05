import { useState } from "react";
import styles from "../styles/components/ChatBot.module.scss";
import { Index } from "./ChatBotReply/Index";
import { Buttons } from "./UserReply/Buttons";

export const ChatBot = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [interactionList, setInteractionList] = useState<any[]>([
    { type: "question", status: 0 },
  ]);
  const [hasSelectedCorrectAnswer, setHasSelectedCorrectAnswer] =
    useState<boolean>(false);

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
    if (hasSelectedCorrectAnswer) {
      setCurrentStatus(currentStatus + 1);
      setInteractionList([
        ...interactionList,
        { type: "question", status: currentStatus + 1 },
      ]);
    } else {
      setInteractionList([
        ...interactionList,
        { type: "encouragement", status: currentStatus },
      ]);
    }
  };
  return (
    <div className={styles.container}>
      {interactionList.map((interaction, index) => {
        return (
          <div key={index} style={{ marginTop: 10 }}>
            <Index
              type={interaction.type}
              status={interaction.status}
              setHasSelectedCorrectAnswer={setHasSelectedCorrectAnswer}
            />
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
