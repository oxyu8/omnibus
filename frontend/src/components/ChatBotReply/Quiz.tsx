import { useEffect, useState } from "react";
import styles from "../../styles/components/ChatBotReply/Quiz.module.scss";
import { ChatBotIcon } from "../ChatBotIcon";
import { useQuiz } from "../hooks/useQuiz";

type Props = {
  status: number;
};

export const Quiz: React.FC<Props> = ({ status }) => {
  const { quizData } = useQuiz(status);

  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      <div className={styles.chatbotTextWrapper}>
        <div className={styles.chatbotText}>{quizData?.quizSentence}</div>
      </div>
    </div>
  );
};
