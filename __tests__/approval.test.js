const { openApprovalModal } = require("../bot/approval");

describe("Approval Modal Tests", () => {
  let mockClient;
  let mockAck;
  let mockBody;

  beforeEach(() => {
    mockClient = {
      views: {
        open: jest.fn(),
      },
    };
    mockAck = jest.fn();
    mockBody = {
      trigger_id: "test-trigger-id",
    };
  });

  test("should open approval modal successfully", async () => {
    await openApprovalModal({
      ack: mockAck,
      body: mockBody,
      client: mockClient,
    });

    expect(mockAck).toHaveBeenCalled();
    expect(mockClient.views.open).toHaveBeenCalledWith({
      trigger_id: "test-trigger-id",
      view: expect.objectContaining({
        type: "modal",
        callback_id: "approval_modal",
        title: expect.objectContaining({ text: "Request Approval" }),
        blocks: expect.arrayContaining([
          expect.objectContaining({ block_id: "approver_select" }),
          expect.objectContaining({ block_id: "approval_text" }),
        ]),
      }),
    });
  });

  test("should handle errors when opening modal", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockClient.views.open.mockRejectedValue(new Error("API Error"));

    await openApprovalModal({
      ack: mockAck,
      body: mockBody,
      client: mockClient,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error opening modal:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});

// __tests__/actions.test.js
const { handleApproveRequest, handleRejectRequest } = require("../bot/actions");

describe("Action Handler Tests", () => {
  let mockClient;
  let mockAck;
  let mockBody;

  beforeEach(() => {
    mockClient = {
      chat: {
        postMessage: jest.fn(),
        update: jest.fn(),
      },
    };
    mockAck = jest.fn();
    mockBody = {
      actions: [{ value: "USER123" }],
      message: {
        blocks: [
          {},
          { elements: [{ text: { text: "Test approval request" } }] },
        ],
        ts: "1234567890.123456",
      },
      user: { id: "APPROVER123" },
      container: { channel_id: "CHANNEL123" },
    };
  });

  describe("handleApproveRequest", () => {
    test("should handle approval request successfully", async () => {
      await handleApproveRequest({
        ack: mockAck,
        body: mockBody,
        client: mockClient,
      });

      expect(mockAck).toHaveBeenCalled();
      expect(mockClient.chat.postMessage).toHaveBeenCalledTimes(2);
      expect(mockClient.chat.update).toHaveBeenCalledTimes(1);

      // Verify messages sent to requester
      expect(mockClient.chat.postMessage).toHaveBeenCalledWith({
        channel: "USER123",
        text: expect.stringContaining("approved"),
      });

      // Verify messages sent to approver
      expect(mockClient.chat.postMessage).toHaveBeenCalledWith({
        channel: "APPROVER123",
        text: expect.stringContaining("approved"),
      });

      // Verify channel update
      expect(mockClient.chat.update).toHaveBeenCalledWith({
        channel: "CHANNEL123",
        ts: "1234567890.123456",
        text: expect.stringContaining("approved"),
        blocks: expect.arrayContaining([
          expect.objectContaining({
            type: "section",
            text: expect.objectContaining({
              text: expect.stringContaining("approved"),
            }),
          }),
        ]),
      });
    });

    test("should handle errors during approval", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      mockClient.chat.postMessage.mockRejectedValue(new Error("API Error"));

      await handleApproveRequest({
        ack: mockAck,
        body: mockBody,
        client: mockClient,
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error sending approval message:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe("handleRejectRequest", () => {
    test("should handle rejection request successfully", async () => {
      await handleRejectRequest({
        ack: mockAck,
        body: mockBody,
        client: mockClient,
      });

      expect(mockAck).toHaveBeenCalled();
      expect(mockClient.chat.postMessage).toHaveBeenCalledTimes(2);
      expect(mockClient.chat.update).toHaveBeenCalledTimes(1);

      // Verify messages sent to requester
      expect(mockClient.chat.postMessage).toHaveBeenCalledWith({
        channel: "USER123",
        text: expect.stringContaining("rejected"),
      });

      // Verify messages sent to rejecter
      expect(mockClient.chat.postMessage).toHaveBeenCalledWith({
        channel: "APPROVER123",
        text: expect.stringContaining("rejected"),
      });

      // Verify channel update
      expect(mockClient.chat.update).toHaveBeenCalledWith({
        channel: "CHANNEL123",
        ts: "1234567890.123456",
        text: expect.stringContaining("rejected"),
        blocks: expect.arrayContaining([
          expect.objectContaining({
            type: "section",
            text: expect.objectContaining({
              text: expect.stringContaining("rejected"),
            }),
          }),
        ]),
      });
    });

    test("should handle errors during rejection", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      mockClient.chat.postMessage.mockRejectedValue(new Error("API Error"));

      await handleRejectRequest({
        ack: mockAck,
        body: mockBody,
        client: mockClient,
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error sending rejection message:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });
});

// jest.config.js
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/"],
};
