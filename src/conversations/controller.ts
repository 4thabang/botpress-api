import { Request, Response } from "express";
import { ConversationService, UpdateBuffer } from "./domain";
import { Conversation } from "@botpress/client";
import { UpdateConversationProps } from "@botpress/client/dist/gen/client";

class ConversationController {
  private service: ConversationService;
  constructor(service: ConversationService) {
    this.service = service;
  }

  handleGetConversations = async (req: Request, res: Response) => {
    const conversations: Conversation[] = await this.service.getConversations();
    res.status(200).json(conversations);
  };

  handleUpdateConversationTags = async (req: Request, res: Response) => {
    const { locationId, contactId } = req.query;
    const updated: UpdateConversationProps = {
      ...UpdateBuffer,
      id: "e571a38a-d632-45d6-bf13-349f44df35b2",
      tags: {
        locationId: locationId as string,
        contactId: contactId as string,
      },
    };
    const updatedConversation = await this.service.updateConversationTags(
      updated
    );
    res.status(200).json(updatedConversation);
  };
}

export default ConversationController;
