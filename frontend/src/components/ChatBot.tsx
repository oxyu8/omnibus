import { useEffect, useMemo, useState } from "react";
import styles from "../styles/components/ChatBot.module.scss";
import { Index } from "./ChatBotReply/Index";
import { useQuiz } from "./hooks/useQuiz";
import { useQuizList } from "./useQuizList";
import { Button } from "@nextui-org/react";

export const ChatBot = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [interactionList, setInteractionList] = useState<any[]>([
    { type: "question", status: 0 },
  ]);
  const { quizData } = useQuiz(currentStatus);
  const [chatType, setChatType] = useState<string>("question");
  const [selectedAnswerList, setSelectedAnswerList] = useState<string[]>();
  useEffect(() => {
    const reversedList = [...interactionList].reverse();
    console.log("type", reversedList[0].type);
    setChatType(reversedList[0].type);
  }, [interactionList]);

  const { hasSelectedCorrectAnswer, checkList, render } = useQuizList(quizData);

  useEffect(() => {
    const selectedIdxList: number[] | undefined = [];
    checkList.forEach((c, idx) => {
      if (c === true) {
        selectedIdxList.push(idx);
        return idx;
      }
    });
    const _selectedAnswerList: string[] = [];
    selectedIdxList.forEach((idx) => {
      _selectedAnswerList.push(quizData?.choiceSentenceList[idx] as string);
    });
    setSelectedAnswerList(_selectedAnswerList);
  }, [checkList]);

  const clickYesBtn = () => {
    setInteractionList([
      ...interactionList,
      { type: "answer", status: currentStatus, answerList: ["知っている"] },
      { type: "quiz", status: currentStatus },
    ]);
  };

  const clickNoBtn = () => {
    setInteractionList([
      ...interactionList,
      { type: "answer", status: currentStatus, answerList: ["知らない"] },
      { type: "encouragement", status: currentStatus },
    ]);
  };

  const answer = () => {
    if (hasSelectedCorrectAnswer) {
      setCurrentStatus(currentStatus + 1);
      setInteractionList([
        ...interactionList,
        {
          type: "answer",
          status: currentStatus + 1,
          answerList: selectedAnswerList,
        },
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

  const tryQuiz = () => {
    setChatType("quiz");
  };

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
                  answerList={interaction?.answerList}
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
        ) : chatType === "quiz" ? (
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
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={tryQuiz} style={{ width: "100%" }}>
              クイズに挑戦する
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
