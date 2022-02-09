import { useEffect, useState } from "react";
import styles from "../styles/components/ChatBot.module.scss";
import { Chat } from "./ChatBotReply/Chat";
import { useQuiz } from "./hooks/useQuiz";
import { useQuizList } from "./useQuizList";
import { Button } from "@nextui-org/react";

// state
import { useRecoilState } from "recoil";
import { chatMessageListState } from "../state/atom";
import { getQuestionSentence } from "../shared/questions";
import { getEncouragementSentence } from "../shared/encouragements";
import { ChatBotReplyType } from "../types/chat";
import React from "react";

export const ChatBot = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  const { quizData } = useQuiz(currentStatus);
  const [chatType, setChatType] = useState<string>("question");

  const { hasSelectedCorrectAnswer, checkList, render } = useQuizList(quizData);
  const { selectedAnswerList } = useSelectedAnswerList(quizData, checkList);

  const generateMessage = (typeList: ChatBotReplyType[], status: number) => {
    const messageList = typeList.map((t) => {
      switch (t) {
        case "question": {
          const questionStatement = getQuestionSentence(status);
          return { text: questionStatement, type: "chatBot" };
        }
        case "quiz": {
          return { text: quizData?.quizSentence, type: "chatBot" };
        }
        case "encouragement": {
          const encouragementSentence = getEncouragementSentence(status);
          return { text: encouragementSentence, type: "chatBot" };
        }
        case "correct": {
          return { text: "正解です！", type: "chatBot" };
        }
        case "incorrect": {
          return { text: "不正解です！", type: "chatBot" };
        }

        case "know": {
          return { text: "知っている", type: "user" };
        }
        case "unknow": {
          return { text: "知らない", type: "user" };
        }
        case "userAnswer": {
          return { text: selectedAnswerList, type: "user" };
        }
      }
    });
    return messageList;
  };

  const clickYesBtn = () => {
    const messageList = generateMessage(["know", "quiz"], currentStatus);
    setChatMessageList([...chatMessageList, ...messageList]);
    setChatType("quiz");
  };

  const clickNoBtn = () => {
    const messageList = generateMessage(
      ["unknow", "encouragement"],
      currentStatus
    );
    setChatMessageList([...chatMessageList, ...messageList]);
    setChatType("try");
  };

  const answer = () => {
    if (hasSelectedCorrectAnswer) {
      if (currentStatus <= 4) {
        setChatType("question");
        const newStatus = currentStatus + 1;
        setCurrentStatus(newStatus);
        const messageList = generateMessage(
          ["userAnswer", "correct", "question"],
          currentStatus
        );
        setChatMessageList([...chatMessageList, ...messageList]);
      } else {
        const newStatus = currentStatus + 1;
        setCurrentStatus(newStatus);
        const messageList = generateMessage(
          ["userAnswer", "correct", "question"],
          currentStatus
        );
        setChatMessageList([...chatMessageList, ...messageList]);
      }
    } else {
      const messageList = generateMessage(
        ["userAnswer", "incorrect", "encouragement"],
        currentStatus
      );
      setChatMessageList([...chatMessageList, ...messageList]);
    }
  };
  const tryQuiz = () => {
    const messageList = generateMessage(["quiz"], currentStatus);
    setChatMessageList([...chatMessageList, ...messageList]);
    setChatType("quiz");
  };

  // ref を作成しスクロールさせたい場所にある Element にセット
  const ref = React.createRef<HTMLDivElement>();
  // このコールバックを呼び出して ref.current.scrollIntoView() を呼び出してスクロール
  const scrollToBottomOfList = React.useCallback(() => {
    ref!.current!.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  // useEffect() 内はページが描画されたあとに呼び出される
  React.useEffect(() => {
    // ページが描画されたらリストの末尾までスクロール
    scrollToBottomOfList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessageList]);

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
                <Chat chatMessage={chatMessage.text} type={chatMessage.type} />
                <div
                  id="bottom-of-list"
                  ref={ref}
                  style={{ paddingBottom: 10 }}
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
              {
                text: "遺伝子組み換え食品とはどのようなものか知っていますか？",
                type: "chatBot",
              },
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
