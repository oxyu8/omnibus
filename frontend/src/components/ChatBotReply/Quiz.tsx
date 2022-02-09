import { Card } from "@nextui-org/react";
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
      <Card css={{ mw: "400px", marginLeft: "10px" }}>
        <p>{quizData?.quizSentence}</p>
      </Card>
    </div>
  );
};
