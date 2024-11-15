// Opens an approval modal for the user to fill out
async function openApprovalModal({ ack, body, client }) {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "approval_modal",
        title: { type: "plain_text", text: "Request Approval" },
        blocks: [
          {
            type: "input",
            block_id: "approver_select",
            dispatch_action: true,
            element: {
              type: "users_select",
              action_id: "user_select",
            },
            label: { type: "plain_text", text: "Select Approver" },
          },
          {
            type: "input",
            block_id: "approval_text",
            dispatch_action: true,
            element: {
              type: "plain_text_input",
              action_id: "text_input",
              multiline: true,
            },
            label: { type: "plain_text", text: "Approval Text" },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "Submit" },
                style: "primary",
                action_id: "submit_approval",
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error opening modal:", error);
  }
}

module.exports = {
  openApprovalModal,
};
