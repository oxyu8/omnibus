import styles from "../styles/components/QuizList.module.scss";

type Props = {
  type: "radio" | "checkbox";
  checkList: readonly boolean[];
  sentenceList: readonly string[];
  onCheck: (index: number) => void;
};

export const QuizList: React.FC<Props> = ({
  type,
  checkList,
  sentenceList,
  onCheck,
}) => {
  return (
    <div>
      {sentenceList?.map((sentence, idx) => (
        <div key={idx}>
          <label className={styles.choice}>
            <div className={styles.inputWrapper}>
              <input
                type={type}
                checked={checkList[idx]}
                onClick={() => onCheck(idx)}
                className={styles.input}
              />
            </div>
            <div>{sentence}</div>
          </label>
        </div>
      ))}
    </div>
  );
};
