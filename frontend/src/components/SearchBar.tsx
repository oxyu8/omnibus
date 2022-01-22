import styles from "../styles/components/SearchBar.module.scss";

export const SearchBar = () => {
  return (
    <>
      <form>
        <input className={styles.input} />
        <button className={styles.button} type="submit">
          検索
        </button>
      </form>
    </>
  );
};
