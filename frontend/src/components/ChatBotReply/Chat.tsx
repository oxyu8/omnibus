import { Card } from "@nextui-org/react";
import { ChatBotReplyType } from "../../types/chat";
import { ChatMessage } from "../ChatMessage";

type Props = {
  type: ChatBotReplyType;
  status: number;
  replyMessageList?: string[];
};

// 表示するコンポーネントと表示する位置
// userReply or botReply

export const Chat: React.FC<Props> = ({ type, status, replyMessageList }) => {
  if (
    type === "question" ||
    type === "quiz" ||
    type === "encouragement" ||
    type === "correct" ||
    type === "incorrect"
  ) {
    return <ChatMessage status={status} type={type} />;
  }
  if (type === "userReply") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {replyMessageList?.map((answer, idx) => (
          <Card
            css={{
              width: "auto",
              maxWidth: 400,
              color: "white",
              backgroundColor: "$primary",
              borderBottomRightRadius: 0,
              marginTop: 10,
              marginBottom: 10,
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
