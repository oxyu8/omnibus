import { useEffect, useState } from "react";
import styles from "../styles/components/ChatBot.module.scss";
import { Chat } from "./ChatBotReply/Chat";
import { useQuiz } from "./hooks/useQuiz";
import { useQuizList } from "./useQuizList";
import { Button } from "@nextui-org/react";

// state
import { useRecoilState } from "recoil";
import { chatMessageListState } from "../state/atom";

export const ChatBot = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  const { quizData } = useQuiz(currentStatus);
  const [chatType, setChatType] = useState<string>("question");

  useEffect(() => {
    const reversedList = [...chatMessageList].reverse();
    setChatType(reversedList[0].type);
    console.log("aaaaaaaa", chatMessageList);
  }, [chatMessageList]);

  const { hasSelectedCorrectAnswer, checkList, render } = useQuizList(quizData);
  const { selectedAnswerList } = useSelectedAnswerList(quizData, checkList);

  const clickYesBtn = () => {
    setChatMessageList([
      ...chatMessageList,
      {
        type: "userReply",
        status: currentStatus,
        replyMessageList: ["知っている"],
      },
      { type: "quiz", status: currentStatus, replyMessageList: undefined },
    ]);
  };

  const clickNoBtn = () => {
    setChatMessageList([
      ...chatMessageList,
      {
        type: "userReply",
        status: currentStatus,
        replyMessageList: ["知らない"],
      },
      {
        type: "encouragement",
        status: currentStatus,
        replyMessageList: undefined,
      },
    ]);
  };

  const answer = () => {
    if (hasSelectedCorrectAnswer) {
      if (currentStatus <= 4) {
        setCurrentStatus(currentStatus + 1);
        setChatMessageList([
          ...chatMessageList,
          {
            type: "userReply",
            status: currentStatus + 1,
            replyMessageList: selectedAnswerList,
          },
          {
            type: "correct",
            status: currentStatus + 1,
            replyMessageList: undefined,
          },
          {
            type: "question",
            status: currentStatus + 1,
            replyMessageList: undefined,
          },
        ]);
      } else {
        setChatMessageList([
          ...chatMessageList,
          {
            type: "userReply",
            status: currentStatus + 1,
            replyMessageList: selectedAnswerList,
          },
          {
            type: "correct",
            status: currentStatus + 1,
            replyMessageList: undefined,
          },
        ]);
      }
    } else {
      setChatMessageList([
        ...chatMessageList,
        {
          type: "userReply",
          status: currentStatus,
          replyMessageList: selectedAnswerList,
        },
        {
          type: "incorrect",
          status: currentStatus,
          replyMessageList: undefined,
        },
        {
          type: "encouragement",
          status: currentStatus,
          replyMessageList: undefined,
        },
      ]);
    }
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
          {chatMessageList.map((chatMessage, index) => {
            return (
              <div key={index} style={{ marginTop: 10 }}>
                <Chat
                  type={chatMessage.type}
                  status={chatMessage.status}
                  replyMessageList={chatMessage?.replyMessageList}
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
        <Button
          onClick={() =>
            setChatMessageList([
              { type: "question", status: 0, replyMessageList: [""] },
            ])
          }
          style={{ width: "100%", marginTop: 30 }}
        >
          リセットボタン
        </Button>
      </div>
    </>
  );
};

const useSelectedAnswerList = (quizData: any, checkList: any) => {
  const [selectedAnswerList, setSelectedAnswerList] = useState<string[]>();
  useEffect(() => {
    const selectedIdxList: number[] | undefined = [];
    checkList?.forEach((c: any, idx: number) => {
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
  return { selectedAnswerList };
};
