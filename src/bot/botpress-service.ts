import {
  ListBotsResponseBotsInner,
  UpdateBotResponse,
} from "@botpress/client/dist/gen";
import { UpdateBotProps } from "@botpress/client/dist/gen/client";
import { BotService, BotpressBotService } from "./domain";

class BotpressBotsService implements BotService {
  private client: BotpressBotService;
  constructor(client: BotpressBotService) {
    this.client = client;
  }

  async getAllBots(): Promise<ListBotsResponseBotsInner[]> {
    try {
      let nextToken: string | undefined;
      const botsBuffer: ListBotsResponseBotsInner[] = [];
      do {
        const allBots = await this.client.listBots({ nextToken });
        allBots.bots.forEach((bots) => {
          botsBuffer.push({ ...bots });
        });
        nextToken = allBots.meta.nextToken;
      } while (nextToken);
      return botsBuffer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`bots-service-error: ${error.message}`);
      }
      throw new Error(`bots-service-error: ${error}`);
    }
  }

  async updateBotsById(
    updatedBotBody: UpdateBotProps
  ): Promise<UpdateBotResponse[]> {
    try {
      const bots = await this.getAllBots();
      const updatedBotsBuffer: UpdateBotResponse[] = [];
      bots.forEach(async (bot) => {
        const updatedBot = await this.client.updateBot({
          ...updatedBotBody,
          id: bot.id,
        });
        updatedBotsBuffer.push(updatedBot);
      });
      return updatedBotsBuffer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`bots-service-error: ${error.message}`);
      }
      throw new Error(`bots-service-error: ${error}`);
    }
  }
}

export default BotpressBotsService;
