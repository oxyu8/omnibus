import { Dispatch, SetStateAction } from "react";
import { ChatBotReplyType } from "../../types/chat";
import { Encouragement } from "./Encouragement";
import { Question } from "./Question";
import { Quiz } from "./Quiz";

type Props = {
  type: ChatBotReplyType;
  status: number;
  checkAnswer: Dispatch<SetStateAction<boolean>>;
};

export const Index: React.FC<Props> = ({ type, status, checkAnswer }) => {
  if (type === "question") {
    return <Question status={status} />;
  }
  if (type === "quiz") {
    return <Quiz status={status} checkAnswer={checkAnswer} />;
  }
  if (type === "encouragement") {
    return <Encouragement status={status} />;
  }
  return null;
};
