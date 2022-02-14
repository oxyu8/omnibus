import Head from "next/head";
import axios from "axios";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { SearchResultCard } from "../components/SearchResultCard";
import styles from "../styles/index.module.scss";
import { ChatBot } from "../components/ChatBot";

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

  const changeQuery = (e: any) => {
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

  const fetchSearchResults = async (e: any) => {
    const offset = 2;
    e.preventDefault();
    const res = await axios.get("http://localhost:3001/search", {
      params: {
        query,
        offset,
      },
    });
    const searchResults = res.data as SearchResult[];
    const result = removeUrls(searchResults);
    const _result = result.filter((v) => v);
    //@ts-ignore
    setSearchResults(_result);
  };
  const handleChangePage = (page: number) => {};
  return (
    <>
      <Head>
        <title>System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <SearchBar
              query={query}
              onChangeQuery={changeQuery}
              onClickBtn={fetchSearchResults}
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
            <Pagination
              total={20}
              initialPage={1}
              onChange={handleChangePage}
            />
          </div>
          <div style={{ position: "fixed", left: 700 }}>
            <ChatBot />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
