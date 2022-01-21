import { Client } from "@notionhq/client";
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
    // const blockId = page.id;
    // const response = await this.notion.blocks.children.list({
    //   block_id: blockId,
    // });

    // // tslint:disable-next-line: no-console
    // console.log(response.results);

    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  }
}
