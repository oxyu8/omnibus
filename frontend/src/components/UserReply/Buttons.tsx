import { ChatBotReplyType } from "../../types/chat";
import styles from "../../styles/components/UserReply/Buttons.module.scss";
type Props = {
  interactionListLen: number;
  idx: number;
  type: ChatBotReplyType;
  clickYesBtn: () => void;
  clickNoBtn: () => void;
  answer: () => void;
  tryAgain: () => void;
};

export const Buttons: React.FC<Props> = ({
  interactionListLen,
  idx,
  type,
  clickYesBtn,
  clickNoBtn,
  answer,
  tryAgain,
}) => {
  if (type === "question") {
    return (
      <>
        <button
          className={styles.answerButton}
          onClick={clickYesBtn}
          disabled={interactionListLen - 1 !== idx}
        >
          知っている
        </button>
        <div style={{ width: 10 }} />
        <button
          className={styles.answerButton}
          onClick={clickNoBtn}
          disabled={interactionListLen - 1 !== idx}
        >
          知らない
        </button>
      </>
    );
  }
  if (type === "quiz") {
    return (
      <button
        className={styles.answerButton}
        onClick={answer}
        disabled={interactionListLen - 1 !== idx}
      >
        回答する
      </button>
    );
  }
  if (type === "answer") {
    return (
      <div
        style={{ padding: 10, backgroundColor: "#332E78", borderRadius: 10 }}
      >
        <div style={{ color: "white" }}>知っている</div>
      </div>
    );
  }
  if (type === "encouragement" || "retryMessage") {
    const text =
      type === "encouragement" ? "クイズに挑戦する" : "クイズに再挑戦する";
    return (
      <button
        className={styles.answerButton}
        onClick={tryAgain}
        disabled={interactionListLen - 1 !== idx}
      >
        {text}
      </button>
    );
  }
  return null;
};
