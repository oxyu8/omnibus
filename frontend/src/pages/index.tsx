import Head from "next/head";
import axios from "axios";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { SearchResultCard } from "../components/SearchResultCard";
import styles from "../styles/index.module.scss";
import { ChatBot } from "../components/ChatBot";

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

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>();

  const changeQuery = (e: any) => {
    setQuery(e.target.value);
  };

  const fetchSearchResults = async (e: any) => {
    // e.preventDefault();
    return alert("test");

    const res = await axios.get("http://localhost:3001/search", {
      params: {
        query,
      },
    });
    const searchResults = res.data;
    setSearchResults(searchResults);
  };
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
          </div>
          <ChatBot />
        </div>
      </main>
    </>
  );
};

export default Home;
