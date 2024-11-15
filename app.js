// app.js

const express = require("express");
const { App } = require("@slack/bolt");
const {
  slackBotToken,
  slackSigningSecret,
  slackAppToken,
} = require("./config/config");
const { openApprovalModal } = require("./bot/approval");
const { handleApproveRequest, handleRejectRequest } = require("./bot/actions");

const app = express();
const PORT = process.env.PORT || 3000;

const slackApp = new App({
  token: slackBotToken,
  signingSecret: slackSigningSecret,
  appToken: slackAppToken,
  socketMode: true,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Slack Bot is running");
});

// Slash command to trigger approval modal
slackApp.command("/approval-test", openApprovalModal);

// Handling actions for approve and reject requests
slackApp.action("approve_request", handleApproveRequest);
slackApp.action("reject_request", handleRejectRequest);

(async () => {
  await slackApp.start(PORT);
  console.log(`⚡️ Slack Bolt app is running on port ${PORT}`);
})();
