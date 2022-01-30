import { getQuestionSentence } from "../../shared/questions";
import { ChatBotIcon } from "../ChatBotIcon";
import styles from "../../styles/components/ChatBot.module.scss";

type Props = {
  status: number;
};

export const Question: React.FC<Props> = ({ status }) => {
  const questionStatement = getQuestionSentence(status);
  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      <div className={styles.chatbotTextWrapper}>
        <div className={styles.chatbotText}>{questionStatement}</div>
      </div>
    </div>
  );
};
