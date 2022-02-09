import { Button, Card } from "@nextui-org/react";
import { ChatBotReplyType } from "../../types/chat";
import { ChatMessage } from "../ChatMessage";
import { RetryMessage } from "./RetryMessage";

type Props = {
  type: ChatBotReplyType;
  status: number;
  answerList?: string[];
};

// 表示するコンポーネントと表示する位置

export const Index: React.FC<Props> = ({ type, status, answerList }) => {
  if (type === "question" || type === "quiz" || type === "encouragement") {
    return <ChatMessage status={status} type={type} />;
  }
  // if (type === "retryMessage") {
  //   return <RetryMessage status={status} />;
  // }
  if (type === "answer") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {answerList?.map((answer, idx) => (
          <Card
            css={{
              width: "auto",
              maxWidth: 400,
              color: "white",
              backgroundColor: "$primary",
              borderBottomRightRadius: 0,
            }}
            key={idx}
          >
            <p>{answer}</p>
          </Card>
        ))}
      </div>
    );
  }
  return null;
};
