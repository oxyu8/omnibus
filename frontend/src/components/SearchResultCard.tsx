import styles from "../styles/components/SearchResultCard.module.scss";

type SearchResult = {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  displayUrl: string;
  id: string;
  name: string;
  snippet: string;
  url: string;
};

type Props = {
  result: SearchResult;
};

export const SearchResultCard: React.FC<Props> = ({ result }) => {
  return (
    <div key={result.id}>
      <div style={{ height: 20 }} />
      <div style={{ width: 600 }}>
        <div className={styles.url}>{result.displayUrl}</div>
        <a
          href={result.url}
          className={styles.title}
          target="_blank"
          rel="noreferrer noopener"
        >
          {result.name}
        </a>
        <div>{result.snippet}</div>
      </div>
    </div>
  );
};
