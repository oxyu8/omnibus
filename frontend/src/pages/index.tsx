import Head from "next/head";
import axios from "axios";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchResultCard } from "../components/SearchResultCard";
import styles from "../styles/index.module.scss";
import { ChatBot } from "../components/ChatBot";
// import { Pagination } from "antd";
import { Pagination } from "@nextui-org/react";

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

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>();
  console.log("render");

  useEffect(() => {
    console.log("q", query);
  }, [searchResults]);

  const changeQuery = (e: any) => {
    // inputEl.current = query;
    setQuery(e.target.value);
  };

  const removeUrls = (list: SearchResult[]) => {
    const removedUrlList = [
      "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/bio/idenshi/index.html",
      "https://www.mhlw.go.jp/topics/idenshi/dl/qa.pdf",
      "https://www.mhlw.go.jp/topics/idenshi/qa/qa.html",
    ];
    const res = list.map((i) => {
      if (!removedUrlList.includes(i.url)) {
        return i;
      }
    });
    return res;
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    fetchSearchResults();
  };
  const fetchSearchResults = async (offset: number = 0) => {
    console.log("query", query);
    const res = await axios.get<SearchResult[]>(
      "http://localhost:3001/search",
      {
        params: {
          query,
          offset,
        },
      }
    );
    const results = res.data;
    const result = removeUrls(results);
    const _result = result.filter((v) => v);
    //@ts-ignore
    setSearchResults(_result);
  };
  const handleChangePage = (page: number) => {
    console.log(query);
    console.log(searchResults);
    fetchSearchResults(page);
  };
  const paginationMemo = useMemo(
    () => <Pagination initialPage={1} total={50} onChange={handleChangePage} />,
    [query]
  );
  return (
    <>
      <Head>
        <title>System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <main>
          <div className={styles.container}>
            <div className={styles.leftContainer}>
              <SearchBar
                query={query}
                onChangeQuery={changeQuery}
                onClickBtn={handleSearch}
              />
              {searchResults &&
                searchResults.map((searchResult) => {
                  return (
                    <SearchResultCard
                      key={searchResult.id}
                      result={searchResult}
                    />
                  );
                })}
              <div>{paginationMemo}</div>
            </div>
            <div style={{ position: "fixed", left: 700 }}>
              <ChatBot />
            </div>
          </div>
        </main>
      </body>
    </>
  );
};

export default Home;
