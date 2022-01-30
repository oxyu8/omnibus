import { ChatBotReplyType } from "../../types/chat";
import styles from "../../styles/components/UserReply/Buttons.module.scss";
type Props = {
  type: ChatBotReplyType;
  clickYesBtn: () => void;
  clickNoBtn: () => void;
  answer: () => void;
};

export const Buttons: React.FC<Props> = ({
  type,
  clickYesBtn,
  clickNoBtn,
  answer,
}) => {
  if (type === "question") {
    return (
      <>
        <button className={styles.answerButton} onClick={clickYesBtn}>
          知っている
        </button>
        <button className={styles.answerButton} onClick={clickNoBtn}>
          知らない
        </button>
      </>
    );
  }
  if (type === "quiz") {
    return (
      <button className={styles.answerButton} onClick={answer}>
        回答する
      </button>
    );
  }
  return null;
};
