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
};

type Props = {
  result: SearchResult;
};

export const SearchResultCard: React.FC<Props> = ({ result }) => {
  return (
    <div key={result.id}>
      <div style={{ height: 20 }}></div>
      <div style={{ width: 600 }}>
        <div style={{ color: "#6ac46a" }}>{result.displayUrl}</div>
        <a
          href={result.displayUrl}
          style={{ fontSize: 20, color: "#1A0DAB", fontWeight: "bold" }}
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
