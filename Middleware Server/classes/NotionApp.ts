import { Client } from "@notionhq/client";
import fs from "fs";
import Page from "./Page";

export default class NotionApp {
  notion: Client;

  constructor(token: string) {
    this.notion = new Client({ auth: token });
  }

  async getRootPages() {
    const response = await this.notion.search({
      query: "",
    });

    return response.results
      .filter((result: any) => result.parent.type === "workspace")
      .map(
        (result: any) =>
          new Page(result.id, result.properties.title.title[0].plain_text)
      );
  }

  async getPageWordsRecursively(page: Page) {
    const blockId = page.id;
    const response = await this.notion.blocks.children.list({
      block_id: blockId,
    });

    const words = [];
    for (const result of response.results) {
      console.log("========================================");
      console.log(result);

      // @ts-ignore-next-line
      if (result.type === "child_page") {
        console.log("==== BRX1");
        words.push(
          await new Promise(async (resolve, reject) => {
            resolve(
              // @ts-ignore-next-line
              result.child_page.title +
                " " +
                (await this.getPageWordsRecursively(new Page(result.id)))
                  .filter((v: any) => v?.length > 0)
                  .join(" ")
            );
          })
        );
      } else {
        console.log("==== BRX2");
        words.push(
          await new Promise((resolve, reject) => {
            // @ts-ignore-next-line
            resolve(result[result.type]?.text[0]?.plain_text);
          })
        );
      }
    }

    return words;
  }

  async getPageNbOfWords(page: Page) {
    const pageWords: any = await this.getPageWordsRecursively(page);

    console.log("FINAL");
    console.log(pageWords);
    console.log("==== FINAL");

    const temp = pageWords
      .filter((v: any) => v?.length > 0)
      .join(" ")
      .split(" ");

    return temp.length;
  }

  static getUUID(pageId: string) {
    // TODO: USE SUBSTRING FROM LAST
    const temp = pageId.split("-");
    return temp[temp.length - 1];
  }

  static writeObjToFile(obj: any) {
    fs.writeFileSync("./data.json", JSON.stringify(obj, null, 2), "utf-8");
  }
}
