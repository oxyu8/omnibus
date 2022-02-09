import { useEffect, useMemo, useState } from "react";
import styles from "../styles/components/ChatBot.module.scss";
import { Index } from "./ChatBotReply/Index";
import { useQuiz } from "./hooks/useQuiz";
import { useQuizList } from "./useQuizList";
import { Button } from "@nextui-org/react";
import { NONAME } from "dns";

export const ChatBot = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [interactionList, setInteractionList] = useState<any[]>([
    { type: "question", status: 0 },
  ]);
  const { quizData } = useQuiz(currentStatus);
  const [chatType, setChatType] = useState<string>("question");
  useEffect(() => {
    const reversedList = [...interactionList].reverse();
    setChatType(reversedList[0].type);
  }, [interactionList]);

  const { hasSelectedCorrectAnswer, checkList, render } = useQuizList(
    "radio",
    quizData?.choiceSentenceList
  );

  const clickYesBtn = () => {
    setInteractionList([
      ...interactionList,
      { type: "answer", status: currentStatus, text: "知っている" },
      { type: "quiz", status: currentStatus },
    ]);
  };

  const clickNoBtn = () => {
    setInteractionList([
      ...interactionList,
      { type: "answer", status: currentStatus, text: "知らない" },
      { type: "encouragement", status: currentStatus },
    ]);
  };

  const answer = () => {
    // if (!isSelectedItem) {
    //   return alert("回答を選択してください");
    // }
    if (hasSelectedCorrectAnswer) {
      setCurrentStatus(currentStatus + 1);
      setInteractionList([
        ...interactionList,
        { type: "answer", status: currentStatus + 1, text: "知っている" },
        { type: "question", status: currentStatus + 1 },
      ]);
    } else {
      setInteractionList([
        ...interactionList,
        { type: "retryMessage", status: currentStatus },
      ]);
    }
  };
  const tryAgain = () => {
    setInteractionList([
      ...interactionList,
      { type: "quiz", status: currentStatus },
    ]);
  };

  const [isSelectedItem, setIsSelectedItem] = useState<boolean>(false);
  return (
    <>
      <div
        style={{
          display: "grid",
          height: 800,
          width: 650,
        }}
      >
        <div className={styles.chatContainer}>
          {interactionList.map((interaction, index) => {
            return (
              <div key={index} style={{ marginTop: 10 }}>
                <Index
                  type={interaction.type}
                  status={interaction.status}
                  text={interaction?.text}
                />
              </div>
            );
          })}
        </div>
        {chatType === "question" ? (
          <div className={styles.replyButtonWrapper}>
            <Button style={{ width: 500 }} onClick={clickYesBtn}>
              知っている
            </Button>
            <div style={{ height: 10 }} />
            <Button style={{ width: 500 }} onClick={clickNoBtn}>
              知らない
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {quizData?.choiceSentenceList && render()}
            <div style={{ marginTop: 20 }}>
              <Button onClick={answer} style={{ width: "100%" }}>
                回答する
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
