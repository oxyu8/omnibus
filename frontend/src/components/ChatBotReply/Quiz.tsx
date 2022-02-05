import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/components/ChatBotReply/Quiz.module.scss";
import { ChatBotIcon } from "../ChatBotIcon";
import { useQuiz } from "../hooks/useQuiz";
import { QuizList } from "../QuizList";

type Props = {
  status: number;
  setHasSelectedCorrectAnswer: any;
};

export const Quiz: React.FC<Props> = ({
  status,
  setHasSelectedCorrectAnswer,
}) => {
  const { quizData } = useQuiz(status);
  const isSingleAnswerQuiz = quizData?.isSingleCorrectAnswerQuiz;
  // const [hasSelectedCorrectAnswer, setHasSelectedCorrectAnswer] =
  // useState<boolean>(false);

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

  useEffect(() => {
    if (isSingleAnswerQuiz) {
      const answerIdx = quizData.answerIndexList[0];
      if (checkList[answerIdx] === true) {
        setHasSelectedCorrectAnswer(true);
      } else {
        setHasSelectedCorrectAnswer(false);
      }
    }
  }, [checkList]);

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
