import { useState, useEffect } from "react";
import { Quiz as QuizType } from "../../types/quiz";

export const useQuiz = (status: number) => {
  const [quizData, setQuizData] = useState<QuizType>();
  useEffect(() => {
    (async () => {
      const quizData = await import(`../../shared/quiz/${status}.tsx`);
      setQuizData(quizData.data);
    })();
  }, [status]);
  return { quizData };
};
