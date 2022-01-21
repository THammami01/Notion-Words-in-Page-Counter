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

  async getPageNbOfWords(page: Page) {
    const blockId = page.id;
    const response = await this.notion.blocks.children.list({
      block_id: blockId,
    });

    NotionApp.writeObjToFile(response.results);

    const res = response.results;
    let temp = res.map((result: any) => {
      if (result.type === "child_page") return result.child_page.title;
      else return result[result.type]?.text[0]?.plain_text;
    });

    temp = temp
      .filter((v) => v?.length > 0)
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
