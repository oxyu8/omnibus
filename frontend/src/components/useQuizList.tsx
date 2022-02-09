import { useEffect, useState } from "react";
import styles from "../styles/components/QuizList.module.scss";
import { Radio } from "@nextui-org/react";

export const useQuizList = (
  type: "radio" | "checkbox",
  sentenceList: string[] | undefined
) => {
  const [checkList, setCheckList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const handleCheckList = (idx: number) => {
    if (true) {
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
        {sentenceList?.map((sentence, idx) => (
          <Radio.Group key={idx}>
            <Radio
              checked={checkList[idx]}
              onClick={() => handleCheckList(idx)}
              color="success"
            >
              <span style={{ fontSize: 14 }}>{sentence}</span>
            </Radio>
          </Radio.Group>
        ))}
      </div>
    );
  };
  return { hasSelectedCorrectAnswer, checkList, render };
};
