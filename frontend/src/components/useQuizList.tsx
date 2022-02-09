import { useEffect, useState } from "react";
import { Radio, Checkbox } from "@nextui-org/react";

export const useQuizList = (
  quizData: any
  // sentenceList: string[] | undefined,
  // isSingleCorrectAnswerQuiz: boolean | undefined
) => {
  const [checkList, setCheckList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const handleCheckList = (idx: number) => {
    if (quizData?.isSingleCorrectAnswerQuiz) {
      setCheckList((checks) =>
        checks.map((c, i) => (i === idx ? true : false))
      );
    } else {
      setCheckList((checks) => checks.map((c, i) => (i === idx ? !c : c)));
    }
  };
  const [hasSelectedCorrectAnswer, setHasSelectedCorrectAnswer] =
    useState<boolean>(false);
  useEffect(() => {
    if (checkList[0] === true) {
      setHasSelectedCorrectAnswer(true);
    } else {
      setHasSelectedCorrectAnswer(false);
    }
  }, [checkList]);

  const render = () => {
    return (
      <div>
        {quizData?.choiceSentenceList?.map((sentence: any, idx: number) => {
          if (quizData?.isSingleCorrectAnswerQuiz) {
            return (
              <Radio.Group key={idx}>
                <Radio
                  checked={checkList[idx]}
                  onClick={() => handleCheckList(idx)}
                  color="success"
                >
                  <span style={{ fontSize: 14 }}>{sentence}</span>
                </Radio>
              </Radio.Group>
            );
          } else {
            return (
              <Checkbox.Group color="success" value={[]}>
                <Checkbox
                  checked={checkList[idx]}
                  onClick={() => handleCheckList(idx)}
                  color="success"
                >
                  <span style={{ fontSize: 14 }}>{sentence}</span>
                </Checkbox>
              </Checkbox.Group>
            );
          }
        })}
      </div>
    );
  };
  return { hasSelectedCorrectAnswer, checkList, render };
};
