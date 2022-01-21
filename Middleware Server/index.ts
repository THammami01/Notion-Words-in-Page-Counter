import express, { Application, Request, Response } from "express";
import cors from "cors";
import NotionApp from "./classes/NotionApp";
import Page from "./classes/Page";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.post("/api/count-words-in-page", async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const pageId = req.params.pageId as string;

  const notion = new NotionApp(token);

  // const rootPages = await notion.getRootPages();
  // // tslint:disable-next-line: no-console
  // console.log(rootPages);

  const nbOfWords = await notion.getPageNbOfWords(new Page(pageId));
  // tslint:disable-next-line: no-console
  console.log(nbOfWords);

  res.send({ nbOfWords });
});

app.listen(5000, () => {
  // tslint:disable-next-line: no-console
  console.log("SERVER IS RUNNING AT: http://localhost:5000");
});
