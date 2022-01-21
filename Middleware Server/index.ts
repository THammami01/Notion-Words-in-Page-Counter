import express, { Application, Request, Response } from "express";
import cors from "cors";
import NotionApp from "./classes/NotionApp";
import Page from "./classes/Page";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.post("/api/count-words-in-page", async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const pageId = req.body.pageId as string;

  console.log(token, pageId);

  if (!token || !pageId) {
    res.sendStatus(400);
  } else {
    const notion = new NotionApp(token);

    const nbOfWords = await notion.getPageNbOfWords(
      new Page(NotionApp.getUUID(pageId))
    );
    console.log(nbOfWords);

    res.send({ nbOfWords });
  }
});

app.listen(5000, () => {
  console.log("SERVER IS RUNNING AT: http://localhost:5000");
});
