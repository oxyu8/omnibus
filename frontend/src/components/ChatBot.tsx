import { useEffect, useState } from "react";
import styles from "../styles/components/ChatBot.module.scss";
import { Index } from "./ChatBotReply/Index";
import { Buttons } from "./UserReply/Buttons";
// import { RefObject, useRef } from "react";

// // -----------------------------
// // interface
// // -----------------------------
// export type IuseScrollProps = {
//   outerContentRef: RefObject<HTMLDivElement>;
//   innerContentRef: RefObject<HTMLDivElement>;
//   setScrollPosition: (position: number) => void;
//   getScrollWidth: () => number;
// };
//
// // -----------------------------
// // hooks
// // -----------------------------
// export const useScroll = (): IuseScrollProps => {
//   const innerContentRef = useRef<HTMLDivElement>(null);
//   const outerContentRef = useRef<HTMLDivElement>(null);
//   const [height, setHeight] = useState<number>(0);
//   /**
//    * 画面初期化時にスライドの位置を変更する
//    */
//   const setScrollPosition = (position: number): void => {
//     const outerRef = outerContentRef.current;
//     if (outerRef) {
//       outerRef.scrollLeft = position;
//     }
//   };
//
//   /**
//    * 現在の要素の横幅を取得してセンターのスクロール位置を取得する
//    */
//   const getScrollWidth = (): number => {
//     const innerRef = innerContentRef.current;
//     const outerRef = outerContentRef.current;
//
//     if (innerRef && outerRef) {
//       const innerWidth = innerRef.offsetWidth;
//       const outerWidth = outerRef.offsetWidth;
//       const innerHeight = innerRef.offsetHeight;
//       const outerHeight = outerRef.offsetHeight;
//       // console.log("inner", innerHeight);
//       // console.log("outer", outerHeight);
//       // const newH = height + innerHeight;
//       // setHeight(newH);
//       // console.log("height", height);
//
//       return (innerWidth - outerWidth) / 2;
//     }
//     return 0;
//   };
//
//   return {
//     innerContentRef,
//     outerContentRef,
//     setScrollPosition,
//     getScrollWidth,
//   };
// };

export const ChatBot = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(0);
  const [interactionList, setInteractionList] = useState<any[]>([
    { type: "question", status: 0 },
  ]);
  const [hasSelectedCorrectAnswer, setHasSelectedCorrectAnswer] =
    useState<boolean>(false);

  const clickYesBtn = () => {
    interactionList[0] = { type: "answer", status: currentStatus };
    console.log("c", interactionList);
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
    if (!isSelectedItem) {
      return alert("回答を選択してください");
    }
    if (hasSelectedCorrectAnswer) {
      setCurrentStatus(currentStatus + 1);
      setInteractionList([
        ...interactionList,
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

  // const scroll = useScroll();
  // useEffect(() => {
  // scroll.getScrollWidth();
  // }, [scroll]);
  const [isSelectedItem, setIsSelectedItem] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      {interactionList.map((interaction, index) => {
        return (
          <div key={index} style={{ marginTop: 10 }}>
            <Index
              type={interaction.type}
              status={interaction.status}
              setHasSelectedCorrectAnswer={setHasSelectedCorrectAnswer}
              setIsSelectedItem={setIsSelectedItem}
            />
            <div className={styles.replyButtonWrapper}>
              <Buttons
                interactionListLen={interactionList.length}
                idx={index}
                type={interaction.type}
                clickYesBtn={clickYesBtn}
                clickNoBtn={clickNoBtn}
                answer={answer}
                tryAgain={tryAgain}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
