# Slack Approval Bot

A Node.js-based Slack bot that facilitates approval workflows within your Slack workspace. This bot allows team members to request approvals, and approvers can easily approve or reject requests directly within Slack.

## Features

- 🚀 Quick approval requests using slash commands
- 👥 User-friendly modal interface for submitting requests
- ✅ One-click approve/reject actions
- 📨 Automatic notifications for all parties involved
- 🔒 Secure handling of approval workflows
- ⚡ Real-time updates using Slack's Socket Mode

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- A Slack workspace with admin privileges

## Installation

1. Clone the repository:

```bash
git clone git@github.com:shaziya78/slack-approval-bot.git
cd slack-approval-bot
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Slack credentials:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_APP_TOKEN=xapp-your-app-token
```

## Slack App Configuration

1. Create a new Slack App at [api.slack.com/apps](https://api.slack.com/apps)

2. Under "Basic Information," retrieve your:

   - Signing Secret
   - Bot Token
   - App-Level Token

3. Enable the following Bot Token Scopes:

   - `chat:write`
   - `commands`
   - `users:read`
   - `users:write`

4. Create a slash command:

   - Command: `/approval-test`
   - Description: "Request approval from team members"

5. Enable Socket Mode in your Slack App settings

## Usage

### Starting the Bot

1. Run the development server:

```bash
npm run start
```

2. The bot will start on port 3000 (or your specified PORT in environment variables)

### Making Approval Requests

1. Use the slash command in any channel:

```
/approval-test
```

2. Fill out the modal that appears:

   - Select an approver from the dropdown
   - Enter your request details in the text field
   - Click "Submit"

3. The approver will receive a notification with approve/reject buttons

### Handling Requests

As an approver:

1. Click "Approve" or "Reject" on the received message
2. The request status will be updated automatically
3. Both the requester and approver will receive confirmation messages

## Development

### File Structure

```
├── app.js              # Main application file
├── bot/
│   ├── approval.js     # Approval modal handling
│   └── actions.js      # Action handlers
├── config/
│   └── config.js       # Configuration management
└── __tests__/          # Unit tests
```

### Running Tests

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Testing

The application includes comprehensive unit tests covering:

- Modal generation and display
- Approval/rejection handling
- Error scenarios
- Message formatting
- API interactions

## Error Handling

The bot includes robust error handling for:

- API failures
- Invalid requests
- Missing permissions
- Network issues

All errors are logged and gracefully handled to maintain user experience.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support

For support, please:

1. Check the existing issues
2. Create a new issue with detailed information about your problem
3. Include relevant logs and screenshots

## Acknowledgments

- Built with [Slack Bolt Framework](https://slack.dev/bolt-js/concepts)
- Inspired by common approval workflows in modern organizations

## Security

- All sensitive information should be stored in environment variables
- The bot uses Slack's secure Socket Mode
- Regular security updates are recommended

## Roadmap

Future planned features:

- Multiple approver support
- Custom approval workflows
- Integration with other services
- Approval request templates
- Analytics dashboard

---

Built with ❤️ by Shaziya Shaikh for making approvals easier
