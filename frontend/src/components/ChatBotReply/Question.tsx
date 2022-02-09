import { getQuestionSentence } from "../../shared/questions";
import { ChatBotIcon } from "../ChatBotIcon";
import styles from "../../styles/components/ChatBot.module.scss";
import { Card } from "@nextui-org/react";

type Props = {
  status: number;
};

export const Question: React.FC<Props> = ({ status }) => {
  const questionStatement = getQuestionSentence(status);
  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      <Card css={{ mw: "400px", marginLeft: "10px" }}>
        <p>{questionStatement}</p>
      </Card>
    </div>
  );
};
