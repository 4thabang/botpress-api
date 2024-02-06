import { Request, Response } from "express";
import { BotService } from "./domain";
import {
  UpdateBotBody,
  UpdateBotBodyUserTagsValue,
} from "@botpress/client/dist/gen";

class BotControler {
  private service: BotService;
  constructor(service: BotService) {
    this.service = service;
  }

  handleUpdateBotsById = async (req: Request, res: Response) => {
    const locationId: UpdateBotBodyUserTagsValue = { title: "locationId" };
    const contactId: UpdateBotBodyUserTagsValue = { title: "contactId" };

    const updatedBotBodyWithTags: UpdateBotBody = {
      conversation: { tags: { locationId, contactId } },
    };
    const updatedBots = await this.service.updateBotsById(
      updatedBotBodyWithTags
    );
    res.json(updatedBots);
  };
}

export default BotControler;
