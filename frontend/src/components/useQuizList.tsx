import { useEffect, useState } from "react";
import styles from "../styles/components/QuizList.module.scss";

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
          <div
            key={idx}
            style={{
              backgroundColor: "#e0f4fc",
              borderRadius: 10,
              padding: 5,
              margin: 10,
            }}
          >
            <label className={styles.choice}>
              <div className={styles.inputWrapper}>
                <input
                  type={type}
                  checked={checkList[idx]}
                  onClick={() => handleCheckList(idx)}
                  className={styles.input}
                />
              </div>
              <div style={{ color: "#5c5c5c", fontWeight: 600 }}>
                {sentence}
              </div>
            </label>
          </div>
        ))}
      </div>
    );
  };
  return { hasSelectedCorrectAnswer, checkList, render };
};
