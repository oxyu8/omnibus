import fetch from "node-fetch";
import axios from "axios";
import jsdom from "jsdom";
import { parse as HTML } from "node-html-parser";

const { JSDOM } = jsdom;

const getHtml = async (url) => {
  // const { data } = await axios.get(url);
  // const html = HTML(data);
  const res = await fetch(url);
  const body = await res.text(); //
  console.log(body);
  // const dom = new JSDOM(body); // パース
  // console.log("res", dom);
  // const h1Text = dom.window.document.querySelector("h1"); // JavaScriptと同じ書き方ができます。
  // console.log(h1Text); //
  // const html = await res.text();
  // return html;
};

const scraping = async () => {
  const html = await getHtml(
    encodeURI(
      "https://jp.quora.com/search?q=%E9%81%BA%E4%BC%9D%E5%AD%90%E7%B5%84%E3%81%BF%E6%8F%9B%E3%81%88%E9%A3%9F%E5%93%81&type=question"
    )
  );
  console.log(html);
};

scraping();
