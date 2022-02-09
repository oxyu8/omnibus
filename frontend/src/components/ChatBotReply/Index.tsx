import { Button, Card } from "@nextui-org/react";
import { ChatBotReplyType } from "../../types/chat";
import { AnswerButtons } from "../UserReply/AnswerButtons";
import { Encouragement } from "./Encouragement";
import { Question } from "./Question";
import { Quiz } from "./Quiz";
import { RetryMessage } from "./RetryMessage";

type Props = {
  type: ChatBotReplyType;
  status: number;
  text?: string;
};

// 表示するコンポーネントと表示する位置

export const Index: React.FC<Props> = ({ type, status, text }) => {
  if (type === "question") {
    return <Question status={status} />;
  }
  // if (type === "buttons") {
  //   return <AnswerButtons />;
  // }
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
        <Card
          css={{
            width: "auto",
            color: "white",
            backgroundColor: "$primary",
            borderBottomRightRadius: 0,
          }}
        >
          <p>{text}</p>
        </Card>
      </div>
    );
  }
  return null;
};
