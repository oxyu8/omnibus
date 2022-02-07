import { ChatBotReplyType } from "../../types/chat";
import { Encouragement } from "./Encouragement";
import { Question } from "./Question";
import { Quiz } from "./Quiz";
import { RetryMessage } from "./RetryMessage";

type Props = {
  type: ChatBotReplyType;
  status: number;
  text?: string;
  setHasSelectedCorrectAnswer: any;
  setIsSelectedItem: any;
};

export const Index: React.FC<Props> = ({
  type,
  status,
  text,
  setHasSelectedCorrectAnswer,
  setIsSelectedItem,
}) => {
  if (type === "question") {
    return <Question status={status} />;
  }
  if (type === "quiz") {
    return <Quiz status={status} />;
  }
  if (type === "encouragement") {
    return <Encouragement status={status} />;
  }
  if (type === "retryMessage") {
    return <RetryMessage status={status} />;
  }
  if (type === "answer") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            padding: 10,
            backgroundColor: "#3D78EA",
            borderRadius: 10,
            color: "white",
            boxShadow: "2px 2px rgb(240, 240, 240)",
          }}
        >
          {text}
        </div>
      </div>
    );
  }
  return null;
};
