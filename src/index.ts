import "dotenv/config";
import express from "express";
import process from "node:process";
import { debug } from "node:console";
import { Client } from "@botpress/client";
import { IncomingMessage, Server, ServerResponse } from "node:http";
import {
  BotpressConversationsService,
  ConversationController,
} from "./conversations";
import { MessageController, BotpressMessagesService } from "./messages";
import { BotControler, BotpressBotsService } from "./bot";

const port = process.env.PORT || 8080;
const app = express();

const client = new Client({
  token: process.env.BOT_TOKEN,
  workspaceId: process.env.WORKSPACE_ID,
  botId: process.env.BOT_ID,
});

const conversationService = new BotpressConversationsService(client);
const conversationController = new ConversationController(conversationService);

const messageService = new BotpressMessagesService(client, conversationService);
const messageController = new MessageController(messageService);

const botService = new BotpressBotsService(client)
const botController = new BotControler(botService)

app.post("/tags", conversationController.handleUpdateConversationTags);
app.post("/bots", botController.handleUpdateBotsById)

app.get("/bots")
app.get("/tags",);

app.get("/conversations", conversationController.handleGetConversations);

app.get("/message-thread", messageController.handleGetMessageThread);

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });

process.on("SIGINT" || "SIGTERM", () => {
  debug("gracefully shutting down server");
  server.close(() => {
    debug("server is closed");
  });
});
