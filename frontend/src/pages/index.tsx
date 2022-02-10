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
    console.log("e", e.target.value);
    setQuery(e.target.value);
  };

  const fetchSearchResults = async (e: any) => {
    e.preventDefault();
    console.log("hoje", process.env.HOGE);
    const endpoint = process.env.NEXT_PUBLIC_OMNIBUS_API_ENDPOINT as string;
    console.log("endpoint", endpoint);
    const res = await axios.get(endpoint, {
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
