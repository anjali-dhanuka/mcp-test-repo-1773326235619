# GitHub MCP Server

A comprehensive Model Context Protocol (MCP) server that provides full integration with GitHub's REST API. This server enables AI assistants to interact with GitHub repositories, issues, pull requests, files, users, organizations, and search functionality.

## Features

### Repository Management
- List repositories (authenticated user, specific user, or organization)
- Get detailed repository information
- Create new repositories
- Get repository clone URLs
- Browse repository contents
- Get repository statistics and insights

### Issue Management
- List issues with filtering options
- Get detailed issue information
- Create new issues
- Update existing issues
- Add comments to issues

### Pull Request Management
- List pull requests with filtering
- Get detailed pull request information
- Create new pull requests
- Update existing pull requests
- Merge pull requests
- Add comments to pull requests

### File Operations
- Read file contents from repositories
- Create new files
- Update existing files
- Delete files
- Browse directory structures

### User and Organization Tools
- Get user profile information
- Get authenticated user information
- Get organization information
- List user repositories
- List organization repositories

### Search Functionality
- Search repositories
- Search issues and pull requests
- Search code within repositories
- Search users and organizations

### Utility Features
- Rate limit monitoring
- Comprehensive error handling
- Input validation
- Authentication verification

## Prerequisites

- Node.js 18.0.0 or higher
- A GitHub Personal Access Token

## Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   cd github-mcp-server
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

## GitHub Personal Access Token Setup

1. **Go to GitHub Settings**
   - Navigate to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

2. **Generate a new token**
   - Click "Generate new token" > "Generate new token (classic)"
   - Give it a descriptive name like "MCP Server Token"

3. **Select appropriate scopes**
   For full functionality, select these scopes:
   - `repo` - Full control of private repositories
   - `read:user` - Read user profile data
   - `read:org` - Read organization data
   - `user:email` - Access user email addresses

   For read-only access, you can use:
   - `public_repo` - Access public repositories
   - `read:user` - Read user profile data
   - `read:org` - Read organization data

4. **Copy the token**
   - **Important**: Copy the token immediately as you won't be able to see it again

## Configuration

### For Roo (VS Code Extension)

1. **Locate the MCP settings file**
   ```
   ~/Library/Application Support/Code/User/globalStorage/ai-for-devs-community.apple-roo-code/settings/mcp_settings.json
   ```

2. **Add the GitHub MCP server configuration**
   ```json
   {
     "mcpServers": {
       "github": {
         "command": "node",
         "args": ["/Users/anjali/Documents/Cline/MCP/github-mcp-server/build/index.js"],
         "env": {
           "GITHUB_TOKEN": "your-github-token-here"
         },
         "disabled": false,
         "alwaysAllow": [],
         "disabledTools": []
       }
     }
   }
   ```

### For Claude Desktop

1. **Locate the Claude Desktop config file**
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. **Add the GitHub MCP server configuration**
   ```json
   {
     "mcpServers": {
       "github": {
         "command": "node",
         "args": ["/Users/anjali/Documents/Cline/MCP/github-mcp-server/build/index.js"],
         "env": {
           "GITHUB_TOKEN": "your-github-token-here"
         }
       }
     }
   }
   ```

## Available Tools

### Repository Tools
- `list_repositories` - List repositories for authenticated user
- `get_repository` - Get detailed repository information
- `create_repository` - Create a new repository
- `get_repository_clone_urls` - Get clone URLs for a repository
- `list_repository_contents` - Browse repository files and directories
- `get_repository_stats` - Get repository statistics and insights
- `list_user_repositories` - List repositories for a specific user
- `list_organization_repositories` - List repositories for an organization

### Issue Tools
- `list_issues` - List issues for a repository
- `get_issue` - Get detailed issue information
- `create_issue` - Create a new issue
- `update_issue` - Update an existing issue
- `add_issue_comment` - Add a comment to an issue

### Pull Request Tools
- `list_pull_requests` - List pull requests for a repository
- `get_pull_request` - Get detailed pull request information
- `create_pull_request` - Create a new pull request
- `update_pull_request` - Update an existing pull request
- `merge_pull_request` - Merge a pull request
- `add_pull_request_comment` - Add a comment to a pull request

### File Tools
- `get_file_content` - Read file contents from a repository
- `create_file` - Create a new file in a repository
- `update_file` - Update an existing file in a repository
- `delete_file` - Delete a file from a repository

### User Tools
- `get_user` - Get user profile information
- `get_authenticated_user` - Get authenticated user information
- `get_organization` - Get organization information

### Search Tools
- `search_repositories` - Search for repositories
- `search_issues` - Search for issues and pull requests
- `search_code` - Search for code within repositories
- `search_users` - Search for users and organizations

### Utility Tools
- `get_rate_limit` - Check GitHub API rate limit status

## Usage Examples

Once configured, you can use the GitHub MCP server through your AI assistant:

### Repository Operations
```
"List my repositories"
"Get information about the repository owner/repo-name"
"Create a new repository called 'my-new-project'"
"Show me the contents of the src directory in owner/repo-name"
```

### Issue Management
```
"List open issues in owner/repo-name"
"Create an issue titled 'Bug fix needed' in owner/repo-name"
"Update issue #123 in owner/repo-name to closed status"
"Add a comment to issue #123 saying 'Fixed in latest commit'"
```

### Pull Request Management
```
"List open pull requests in owner/repo-name"
"Create a pull request from feature-branch to main in owner/repo-name"
"Merge pull request #456 in owner/repo-name"
```

### File Operations
```
"Show me the contents of README.md in owner/repo-name"
"Create a new file called hello.py with some Python code in owner/repo-name"
"Update the package.json file in owner/repo-name"
```

### Search Operations
```
"Search for repositories related to 'machine learning'"
"Search for issues with label 'bug' in owner/repo-name"
"Search for code containing 'function authenticate' in owner/repo-name"
```

## Error Handling

The server includes comprehensive error handling for:
- Authentication failures
- Rate limit exceeded
- Resource not found
- Validation errors
- Network issues
- Permission errors

## Rate Limiting

GitHub API has rate limits:
- **Authenticated requests**: 5,000 requests per hour
- **Search API**: 30 requests per minute
- **GraphQL API**: 5,000 points per hour

Use the `get_rate_limit` tool to monitor your current usage.

## Security

- Store your GitHub token securely
- Use fine-grained personal access tokens when possible
- Regularly rotate your tokens
- Only grant necessary permissions

## Troubleshooting

### Common Issues

1. **Authentication Error**
   - Verify your GitHub token is correct
   - Check that the token has necessary permissions
   - Ensure the token hasn't expired

2. **Rate Limit Exceeded**
   - Wait for the rate limit to reset
   - Use the `get_rate_limit` tool to check status

3. **Permission Denied**
   - Verify the repository/resource exists
   - Check that your token has access to the resource
   - For private repositories, ensure your token has `repo` scope

4. **Network Issues**
   - Check your internet connection
   - Verify GitHub API is accessible

### Debug Mode

To enable debug logging, set the environment variable:
```bash
DEBUG=github-mcp-server
```

## Development

### Project Structure
```
github-mcp-server/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── github-client.ts      # GitHub API client wrapper
│   ├── types/
│   │   ├── github.ts         # GitHub API response types
│   │   └── mcp.ts           # MCP-specific types
│   ├── tools/
│   │   ├── repositories.ts   # Repository management tools
│   │   ├── issues.ts         # Issue management tools
│   │   ├── pull-requests.ts  # PR management tools
│   │   ├── files.ts          # File operations tools
│   │   ├── users.ts          # User/organization tools
│   │   └── search.ts         # Search functionality tools
│   └── utils/
│       ├── validation.ts     # Input validation utilities
│       └── error-handling.ts # Error handling utilities
├── build/                    # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

### Building
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review GitHub API documentation
3. Create an issue in the repository