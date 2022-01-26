import { ChatBotReplyType } from "../ChatBot";
import { Encouragement } from "./Encouragement";
import { Question } from "./Question";
import { Quiz } from "./Quiz";

type Props = {
  type: ChatBotReplyType;
  status: number;
};

export const Index: React.FC<Props> = ({ type, status }) => {
  if (type === "question") {
    return <Question status={status} />;
  }
  if (type === "quiz") {
    return <Quiz status={status} />;
  }
  if (type === "encouragement") {
    return <Encouragement status={status} />;
  }
  return null;
};
