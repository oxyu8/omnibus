import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/components/ChatBotReply/Quiz.module.scss";
import { ChatBotIcon } from "../ChatBotIcon";
import { useQuiz } from "../hooks/useQuiz";
import { QuizList } from "../QuizList";

type Props = {
  status: number;
  checkAnswer: Dispatch<SetStateAction<boolean>>;
};

export const Quiz: React.FC<Props> = ({ status, checkAnswer }) => {
  const { quizData } = useQuiz(status);
  const isSingleAnswerQuiz = quizData?.isSingleCorrectAnswerQuiz;

  const [checkList, setCheckList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const handleCheckList = (idx: number) => {
    if (isSingleAnswerQuiz) {
      setCheckList((checks) =>
        checks.map((c, i) => (i === idx ? true : false))
      );
    } else {
      setCheckList((checks) => checks.map((c, i) => (i === idx ? !c : c)));
    }
  };

  return (
    <>
      <div className={styles.chatbotTextContainer}>
        <ChatBotIcon />
        <div className={styles.chatbotTextWrapper}>
          <div className={styles.chatbotText}>{quizData?.quizSentence}</div>
        </div>
      </div>
      {quizData?.choiceSentenceList && (
        <QuizList
          type={isSingleAnswerQuiz ? "radio" : "checkbox"}
          checkList={checkList}
          sentenceList={quizData.choiceSentenceList}
          onCheck={handleCheckList}
        />
      )}
    </>
  );
};
