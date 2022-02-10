import { Card } from "@nextui-org/react";
import styles from "../styles/components/ChatMessage.module.scss";
import { ChatBotIcon } from "../components/ChatBotIcon";
import { useEffect, useState } from "react";
import { getQuestionSentence } from "../shared/questions";
import { getEncouragementSentence } from "../shared/encouragements";
import { ChatBotReplyType } from "../types/chat";

type Props = {
  text: string;
};

export const ChatMessage: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      {text && (
        <Card css={{ mw: "400px", marginLeft: "10px" }}>
          <p>{text}</p>
        </Card>
      )}
    </div>
  );
};
