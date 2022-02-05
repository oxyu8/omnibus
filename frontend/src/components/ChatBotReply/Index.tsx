import { Dispatch, SetStateAction } from "react";
import { ChatBotReplyType } from "../../types/chat";
import { Encouragement } from "./Encouragement";
import { Question } from "./Question";
import { Quiz } from "./Quiz";

type Props = {
  type: ChatBotReplyType;
  status: number;
  setHasSelectedCorrectAnswer: any;
};

export const Index: React.FC<Props> = ({
  type,
  status,
  setHasSelectedCorrectAnswer,
}) => {
  if (type === "question") {
    return <Question status={status} />;
  }
  if (type === "quiz") {
    return (
      <Quiz
        status={status}
        setHasSelectedCorrectAnswer={setHasSelectedCorrectAnswer}
      />
    );
  }
  if (type === "encouragement") {
    return <Encouragement status={status} />;
  }
  return null;
};
