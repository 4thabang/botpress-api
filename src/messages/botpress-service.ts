import { Conversation, ListMessagesResponse } from "@botpress/client/dist/gen";
import { MessagesService, BotpressMessageService } from "./domain";
import { ConversationService } from "../conversations/domain";

class BotpressMessagesService implements MessagesService {
  private client: BotpressMessageService;
  private conversationService: ConversationService;
  constructor(
    client: BotpressMessageService,
    conversation: ConversationService
  ) {
    this.client = client;
    this.conversationService = conversation;
  }

  async getMessageThread(
    conversationId: Conversation["id"]
  ): Promise<ListMessagesResponse[]> {
    try {
      const messageThread: ListMessagesResponse[] = [];
      const conversation = await this.client.listMessages({
        conversationId,
      });
      messageThread.push(conversation);
      return messageThread;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`message-service-error: ${error.message}`);
      }
      throw new Error(`message-service-error: ${error}`);
    }
  }

  async returnMessageThread(): Promise<ListMessagesResponse[]> {
    const messageThreadBuffer: ListMessagesResponse[] = [];
    await this.conversationService
      .getConversations()
      .then(async (gotConversations) => {
        for (let i = 0; i < gotConversations.length; i++) {
          const messages = await this.getMessageThread(gotConversations[i].id);
          messageThreadBuffer.push(...messages);
        }
      });
    return messageThreadBuffer;
  }
}

export default BotpressMessagesService;
