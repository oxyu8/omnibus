import styles from "../styles/components/SearchBar.module.scss";

type Props = {
  query: string;
  onChangeQuery: (e: any) => void;
  onClickBtn: (e: any) => void;
};

export const SearchBar: React.FC<Props> = ({
  query,
  onChangeQuery,
  onClickBtn,
}) => {
  return (
    <>
      <form>
        <input
          className={styles.input}
          value={query}
          onChange={onChangeQuery}
        />
        <div className={styles.buttonWrapper}>
          <button className={styles.button} type="submit" onClick={onClickBtn}>
            検索
          </button>
        </div>
      </form>
    </>
  );
};
