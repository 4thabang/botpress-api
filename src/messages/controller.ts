import { Request, Response } from "express";
import { MessagesService } from "./domain";

class MessageController {
  private service: MessagesService;
  constructor(service: MessagesService) {
    this.service = service;
  }

  handleGetMessageThread = async (req: Request, res: Response) => {
    const messageThread = await this.service.returnMessageThread();
    res.status(200).json(messageThread);
  };
}

export default MessageController;
