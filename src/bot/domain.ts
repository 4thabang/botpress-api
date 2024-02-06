import {
  ListBotsResponse,
  ListBotsResponseBotsInner,
  UpdateBotBody,
  UpdateBotResponse,
} from "@botpress/client/dist/gen";
import { UpdateBotProps } from "@botpress/client/dist/gen/client";

export interface BotpressBotService {
  listBots(props: {
    nextToken?: string | undefined;
  }): Promise<ListBotsResponse>;

  updateBot({
    id,
    ...updateBotBody
  }: UpdateBotProps): Promise<UpdateBotResponse>;
}

export interface BotService {
  getAllBots(): Promise<ListBotsResponseBotsInner[]>;
  updateBotsById(updatedBotBody: UpdateBotBody): Promise<UpdateBotResponse[]>;
}
