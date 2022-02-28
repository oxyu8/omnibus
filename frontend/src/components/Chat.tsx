import { Card } from "@nextui-org/react";
import { ChatBotReplyType } from "../types/chat";
import { ChatMessage } from "./ChatMessage";

type Props = {
  //TODO: 型
  chatMessage: string;
  type: string;
};

// 表示するコンポーネントと表示する位置
// userReply or botReply

export const Chat: React.FC<Props> = ({ chatMessage, type }) => {
  if (type === "chatBot") {
    return <ChatMessage text={chatMessage} />;
  }
  if (type === "user") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {Array.isArray(chatMessage) ? (
          chatMessage.map((c, idx) => (
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
              <p style={{ fontSize: 22 }}>{c}</p>
            </Card>
          ))
        ) : (
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
          >
            <p style={{ fontSize: 22 }}>{chatMessage}</p>
          </Card>
        )}
      </div>
    );
  }
  return null;
};
