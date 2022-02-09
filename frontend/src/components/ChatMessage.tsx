import { Card } from "@nextui-org/react";
import styles from "../styles/components/ChatMessage.module.scss";
import { ChatBotIcon } from "../components/ChatBotIcon";
import { useEffect, useState } from "react";
import { getQuestionSentence } from "../shared/questions";
import { getEncouragementSentence } from "../shared/encouragements";

type Props = {
  status: number;
  type: "question" | "quiz" | "encouragement";
};

export const ChatMessage: React.FC<Props> = ({ status, type }) => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => {
      if (type === "question") {
        const questionStatement = getQuestionSentence(status);
        return setData(questionStatement);
      }
      if (type === "quiz") {
        if (status <= 4) {
          const quizData = await import(`../shared/quiz/${status}.tsx`);
          return setData(quizData.data?.quizSentence);
        } else {
          return null;
        }
      }
      if (type === "encouragement") {
        const encouragementSentence = getEncouragementSentence(status);
        setData(encouragementSentence);
      }
    })();
  }, []);

  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      {data && (
        <Card css={{ mw: "400px", marginLeft: "10px" }}>
          <p>{data}</p>
        </Card>
      )}
    </div>
  );
};
