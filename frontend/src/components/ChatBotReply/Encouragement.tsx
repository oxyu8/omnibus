import { getEncouragementSentence } from "../../../core/encouragement";
import { ChatBotIcon } from "../ChatBotIcon";
import styles from "../../styles/components/ChatBot.module.scss";

type Props = {
  status: number;
};

export const Encouragement: React.FC<Props> = ({ status }) => {
  const encouragementSentence = getEncouragementSentence(status);
  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      <div className={styles.chatbotTextWrapper}>
        <div className={styles.chatbotText}>{encouragementSentence}</div>
      </div>
    </div>
  );
};
