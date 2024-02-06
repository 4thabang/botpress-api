import {
  Conversation,
  ListConversationsResponse,
  UpdateConversationResponse,
} from "@botpress/client/dist/gen";
import { UpdateConversationProps } from "@botpress/client/dist/gen/client";

export interface BotpressConversationService {
  listConversations(props: {
    nextToken: string | undefined;
    tags?: { [key: string]: string };
    participantIds?: string[];
  }): Promise<ListConversationsResponse>;
  updateConversation(
    body: UpdateConversationProps
  ): Promise<UpdateConversationResponse>;
}

export interface ConversationService {
  getConversations(): Promise<Conversation[]>;
  updateConversationTags(
    body: UpdateConversationProps
  ): Promise<UpdateConversationResponse>;
}

export type ConversationsModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
  channel: string;
  integration: string;
  tags: { [key: string]: string };
};

export interface ConversationTags<T> {
  tags: { [key: string]: T };
}

/*
 * TODO: Can fetch conversations by tags `client.listConversations({...})`
 * TODO: This will be where we pass in our tags.
 */
export const UpdateBuffer: UpdateConversationProps = {
  id: "",
  tags: {
    locationId: "",
    contactId: "",
  },
  participantIds: ["", ""],
};
