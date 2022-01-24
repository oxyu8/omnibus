import { useState } from "react";
import { getEncouragementSentence } from "../../core/encouragement";
import { getQuestionSentence } from "../../core/question";
import { getQuizAnswerObj, getQuizStatement } from "../../core/quiz";
import styles from "../styles/components/ChatBot.module.scss";
import { ChatBotIcon } from "./ChatBotIcon";

type ChatBotReplyType = "question" | "quiz" | "encouragement";

const makeQuestionNode = (status: number) => {
  const questionStatement = getQuestionSentence(status);
  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      <div className={styles.chatbotText}>{questionStatement}</div>
    </div>
  );
};

const makeQuizNode = (status: number) => {
  const quizStatement = getQuizStatement(status);
  const quizAnswerObj = getQuizAnswerObj(status);
  return (
    <>
      <div className={styles.chatbotTextContainer}>
        <ChatBotIcon />
        <div className={styles.chatbotText}>{quizStatement}</div>
      </div>
      {quizAnswerObj.map((obj, index) => {
        return (
          <div key={index} style={{ display: "flex" }}>
            <input type="checkbox" />
            <div>{obj.sentence}</div>
          </div>
        );
      })}
    </>
  );
};

const makeEncouragementNode = (status: number) => {
  const encouragementSentence = getEncouragementSentence(status);
  return (
    <div className={styles.chatbotTextContainer}>
      <ChatBotIcon />
      <div className={styles.chatbotText}>{encouragementSentence}</div>
    </div>
  );
};

const generateChatReply = (type: ChatBotReplyType, status: number) => {
  if (type === "question") {
    return makeQuestionNode(status);
  }
  if (type === "quiz") {
    return makeQuizNode(status);
  }
  if (type === "encouragement") {
    return makeEncouragementNode(status);
  }
};

export const ChatBot = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [interactionList, setInteractionList] = useState<any[]>([
    { type: "question", status: 0 },
  ]);

  const clickYesBtn = () => {
    setInteractionList([
      ...interactionList,
      { type: "quiz", status: currentStatus },
    ]);
  };

  const clickNoBtn = () => {
    setInteractionList([
      ...interactionList,
      { type: "encouragement", status: currentStatus },
    ]);
  };

  const answer = () => {
    console.log("answered");
    //TODO: 正解不正解での分岐
    if (true) {
      setCurrentStatus(currentStatus + 1);
      setInteractionList([
        ...interactionList,
        { type: "question", status: currentStatus + 1 },
      ]);
    }
  };

  const generateReplyButton = (type: ChatBotReplyType) => {
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
  };

  return (
    <div className={styles.container}>
      {interactionList.map((interaction, index) => {
        return (
          <div key={index}>
            {generateChatReply(interaction.type, interaction.status)}
            <div className={styles.replyButtonWrapper}>
              {generateReplyButton(interaction.type)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
