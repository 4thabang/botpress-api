import { Conversation, ListMessagesResponse } from "@botpress/client/dist/gen";

export interface BotpressMessageService {
  listMessages(props: unknown): Promise<ListMessagesResponse>;
}

export interface MessagesService {
  getMessageThread(
    conversationId: Conversation["id"]
  ): Promise<ListMessagesResponse[]>;
  returnMessageThread(): Promise<ListMessagesResponse[]>;
}

export type MessageModel<T> = {
  id: string;
  createdAt: string;
  type: string;
  payload: { [string: string]: T };
  direction: string;
  userId: string;
  conversationId: string;
  tags: { [string: string]: T };
};
