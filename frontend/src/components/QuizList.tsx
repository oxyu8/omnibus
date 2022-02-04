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
          <label>
            <input
              type={type}
              checked={checkList[idx]}
              onClick={() => onCheck(idx)}
            />
            {sentence}
          </label>
        </div>
      ))}
    </div>
  );
};
