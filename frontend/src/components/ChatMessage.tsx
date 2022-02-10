import { Card } from "@nextui-org/react";
import styles from "../styles/components/ChatMessage.module.scss";
import { ChatBotIcon } from "../components/ChatBotIcon";
import { useEffect, useState } from "react";
import { getQuestionSentence } from "../shared/questions";
import { getEncouragementSentence } from "../shared/encouragements";
import { ChatBotReplyType } from "../types/chat";

type Props = {
  text: string;
};

export const ChatMessage: React.FC<Props> = ({ text }) => {
  // const [data, setData] = useState<any>(message);
  // useEffect(() => {
  //   (async () => {
  //     if (type === "question") {
  //       const questionStatement = getQuestionSentence(status);
  //       return setData(questionStatement);
  //     }
  //     if (type === "quiz") {
  //       if (status <= 4) {
  //         const quizData = await import(`../shared/quiz/${status}.tsx`);
  //         return setData(quizData.data?.quizSentence);
  //       } else {
  //         return null;
  //       }
  //     }
  //     if (type === "encouragement") {
  //       const encouragementSentence = getEncouragementSentence(status);
  //       return setData(encouragementSentence);
  //     }
  //     if (type === "correct") {
  //       return setData("正解です！");
  //     }
  //     if (type === "incorrect") {
  //       return setData("不正解です！");
  //     }
  //   })();
  // }, []);

  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      {text && (
        <Card css={{ mw: "400px", marginLeft: "10px" }}>
          <p>{text}</p>
        </Card>
      )}
    </div>
  );
};
