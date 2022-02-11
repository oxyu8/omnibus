import express from "express";
import axios from "axios";
import mysql from "mysql";

require("dotenv").config();

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  }
);
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Okyu8-0449",
//   database: "omnibus",
// });
//
// connection.connect((err) => {
//   if (err) {
//     console.log("error connecting: " + err.stack);
//     return;
//   }
//   console.log("success");
// });

app.listen(3001, () => {
  console.log("Start on port 3001.");
});

const fetchResult = async (query: string) => {
  const ENDPOINT =
    "https://api.cognitive.microsoft.com/bing/v7.0/search?count=50";
  const params = {
    q: query,
  };
  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY,
  };
  // @ts-ignore
  const result = await axios.get(ENDPOINT, { params, headers });
  return result.data.webPages.value;
};

const getResult = async (req: express.Request, res: express.Response) => {
  try {
    const query = req.query.query as string;
    const result = await fetchResult(query);
    const newResponse = result.map((r: any) => {
      const { id, name, displayUrl, url, snippet } = r;
      return { id, name, displayUrl, url, snippet };
    });
    const json_response = JSON.stringify(newResponse);
    res.send(json_response);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

app.get("/search", getResult);
