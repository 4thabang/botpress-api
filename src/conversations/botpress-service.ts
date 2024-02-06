import { Conversation } from "@botpress/client";
import { ConversationService, BotpressConversationService } from "./domain";
import { UpdateConversationProps } from "@botpress/client/dist/gen/client";
import { UpdateConversationResponse } from "@botpress/client/dist/gen";

class BotpressConversationsService implements ConversationService {
  private client: BotpressConversationService;
  constructor(client: BotpressConversationService) {
    this.client = client;
  }

  async getConversations(): Promise<Conversation[]> {
    try {
      const conversationsBuffer: Conversation[] = [];
      let nextToken: string | undefined;
      do {
        const getConversationList = await this.client.listConversations({
          nextToken,
        });
        getConversationList.conversations.forEach((conversation) => {
          conversationsBuffer.push({ ...conversation });
        });
        nextToken = getConversationList.meta.nextToken;
      } while (nextToken);
      return conversationsBuffer
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`conversation-service-error: ${error.message}`);
      }
      throw new Error(`conversation-service-error: ${error}`);
    }
  }

  async updateConversationTags(
    body: UpdateConversationProps
  ): Promise<UpdateConversationResponse> {
    try {
      const updatedConversation = await this.client.updateConversation(body);
      return updatedConversation;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`update-conversation-service-error: ${error.message}`);
      }
      throw new Error(`update-conversation-service-error: ${error}`);
    }
  }
}

export default BotpressConversationsService;
