import { useState } from "react";
import { getQuizAnswerObj, getQuizStatement } from "../../../core/quiz";
import styles from "../../styles/components/ChatBotReply/Quiz.module.scss";
import { ChatBotIcon } from "../ChatBotIcon";

type Props = {
  status: number;
};

export const Quiz: React.FC<Props> = ({ status }) => {
  const quizStatement = getQuizStatement(status);
  const quizAnswerObj = getQuizAnswerObj(status);
  const [selectedChoice, setSelectedChoice] = useState<number>();

  const answerIndexList = getAnswerIndexList(quizAnswerObj);
  const selectChoice = (e: any) => {
    setSelectedChoice(e.target.value);
  };
  return (
    <>
      <div className={styles.chatbotTextContainer}>
        <ChatBotIcon />
        <div className={styles.chatbotTextWrapper}>
          <div className={styles.chatbotText}>{quizStatement}</div>
        </div>
      </div>
      {quizAnswerObj.map((obj, index) => {
        return (
          <div key={index} className={styles.choice}>
            <label>
              <input
                type="radio"
                value={index}
                className={styles.radioButton}
                onChange={selectChoice}
                checked={index === selectedChoice}
              />
            </label>
            <div>{obj.sentence}</div>
          </div>
        );
      })}
    </>
  );
};
const getAnswerIndexList = (
  quizAnswerObj: {
    isAnswer: boolean;
    sentence: string;
  }[]
) => {
  const result = quizAnswerObj.map((obj, index) => {
    if (obj.isAnswer === true) {
      return index;
    }
  });
  return result;
};
