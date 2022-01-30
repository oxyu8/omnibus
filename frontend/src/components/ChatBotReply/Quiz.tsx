import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/components/ChatBotReply/Quiz.module.scss";
import { ChatBotIcon } from "../ChatBotIcon";
import { Quiz as QuizType } from "../../types/quiz";
type Props = {
  status: number;
  checkAnswer: Dispatch<SetStateAction<boolean>>;
};

export const Quiz: React.FC<Props> = ({ status, checkAnswer }) => {
  const [quizData, setQuizData] = useState<QuizType>();
  useEffect(() => {
    (async () => {
      const quizData = await import(`../../shared/quiz/${status}.tsx`);
      setQuizData(quizData.data);
    })();
  }, [status]);
  const [selectedChoice, setSelectedChoice] = useState<number>();

  useEffect(() => {
    if (quizData?.isSingleCorrectAnswerQuiz) {
      const answerIndex = quizData.answerIndexList[0];
      if (selectedChoice == answerIndex) {
        checkAnswer(true);
      } else {
        checkAnswer(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChoice]);

  const selectChoice = (e: any) => {
    setSelectedChoice(e.target.value);
  };
  return (
    <>
      <div className={styles.chatbotTextContainer}>
        <ChatBotIcon />
        <div className={styles.chatbotTextWrapper}>
          <div className={styles.chatbotText}>{quizData?.quizSentence}</div>
        </div>
      </div>
      {quizData?.choiceSentenceList.map((sentence, index) => {
        return (
          <div key={index} className={styles.choice}>
            <label>
              <input
                type="radio"
                value={index}
                className={styles.radioButton}
                onChange={selectChoice}
                checked={index == selectedChoice}
              />
            </label>
            <div>{sentence}</div>
          </div>
        );
      })}
    </>
  );
};
