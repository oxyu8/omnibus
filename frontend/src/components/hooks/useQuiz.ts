import { useState, useEffect } from "react";
import { Quiz as QuizType } from "../../types/quiz";

export const useQuiz = (status: number) => {
  const [quizData, setQuizData] = useState<QuizType>();
  if (status >= 5) {
    return undefined;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (async () => {
      const quizData = await import(`../../shared/quiz/${status}.tsx`);
      setQuizData(quizData.data);
    })();
  }, [status]);
  return { quizData };
};
