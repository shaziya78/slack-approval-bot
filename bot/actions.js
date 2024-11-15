// Handle approval request action
async function handleApproveRequest({ ack, body, client }) {
  await ack();
  const requester = body.actions[0].value;
  const approvalText = body.message.blocks[1].elements[0].text.text;
  const approver = body.user.id;

  try {
    await client.chat.postMessage({
      channel: requester,
      text: `Your request has been *approved* ✅!\n\nDescription: ${approvalText}`,
    });

    await client.chat.postMessage({
      channel: body.user.id,
      text: `You have *approved* the request. ✅\n\nDescription: ${approvalText}`,
    });

    await client.chat.update({
      channel: body.container.channel_id,
      ts: body.message.ts,
      text: `*Approval Request*\nRequester: <@${requester}>\n\nYour request has been *approved* ✅!\n\nDescription: ${approvalText}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Approval Request*\nRequester: <@${requester}>\n\nYour request has been *approved* ✅!\n\nDescription: ${approvalText}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `The request has been approved by <@${approver}>.`,
          },
        },
      ],
    });
  } catch (error) {
    console.error("Error sending approval message:", error);
  }
}

// Handle rejection of the approval request
async function handleRejectRequest({ ack, body, client }) {
  await ack();
  const requester = body.actions[0].value;
  const approvalText = body.message.blocks[1].elements[0].text.text;
  const approver = body.user.id;

  try {
    await client.chat.postMessage({
      channel: requester,
      text: `Your request has been *rejected* ❌!\n\nDescription: ${approvalText}`,
    });

    await client.chat.postMessage({
      channel: body.user.id,
      text: `You have *rejected* the request. ❌\n\nDescription: ${approvalText}`,
    });

    await client.chat.update({
      channel: body.container.channel_id,
      ts: body.message.ts,
      text: `*Approval Request*\nRequester: <@${requester}>\n\nYour request has been *rejected* ❌!\n\nDescription: ${approvalText}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Approval Request*\nRequester: <@${requester}>\n\nYour request has been *rejected* ❌!\n\nDescription: ${approvalText}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `The request has been rejected by <@${approver}>.`,
          },
        },
      ],
    });
  } catch (error) {
    console.error("Error sending rejection message:", error);
  }
}

module.exports = {
  handleApproveRequest,
  handleRejectRequest,
};
