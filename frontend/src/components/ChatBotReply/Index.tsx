import { Dispatch, SetStateAction } from "react";
import { ChatBotReplyType } from "../../types/chat";
import { Encouragement } from "./Encouragement";
import { Question } from "./Question";
import { Quiz } from "./Quiz";
import { RetryMessage } from "./RetryMessage";

type Props = {
  type: ChatBotReplyType;
  status: number;
  setHasSelectedCorrectAnswer: any;
  setIsSelectedItem: any;
};

export const Index: React.FC<Props> = ({
  type,
  status,
  setHasSelectedCorrectAnswer,
  setIsSelectedItem,
}) => {
  if (type === "question" || "answer") {
    return <Question status={status} />;
  }
  if (type === "quiz") {
    return (
      <Quiz
        status={status}
        setHasSelectedCorrectAnswer={setHasSelectedCorrectAnswer}
        setIsSelectedItem={setIsSelectedItem}
      />
    );
  }
  if (type === "encouragement") {
    return <Encouragement status={status} />;
  }
  if (type === "retryMessage") {
    return <RetryMessage status={status} />;
  }
  return null;
};
