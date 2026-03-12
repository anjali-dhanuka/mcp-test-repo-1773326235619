#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { Octokit } = require('@octokit/rest');
const { z } = require('zod');

// GitHub client setup
let octokit;

function initializeGitHubClient() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is required');
  }
  
  octokit = new Octokit({
    auth: token,
    userAgent: 'GitHub-MCP-Server/1.0.0',
  });
}

// Validation schemas
const RepoSchema = z.object({
  owner: z.string(),
  repo: z.string()
});

const IssueSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  issue_number: z.number().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
  state: z.enum(['open', 'closed']).optional(),
  labels: z.array(z.string()).optional()
});

const FileSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  path: z.string(),
  content: z.string().optional(),
  message: z.string().optional(),
  branch: z.string().optional()
});

// Tool implementations
const tools = {
  // Repository tools
  async list_repositories(args) {
    const { type = 'all', sort = 'updated', per_page = 30 } = args;
    const response = await octokit.rest.repos.listForAuthenticatedUser({
      type,
      sort,
      per_page
    });
    return response.data;
  },

  async get_repository(args) {
    const { owner, repo } = RepoSchema.parse(args);
    const response = await octokit.rest.repos.get({ owner, repo });
    return response.data;
  },

  async create_repository(args) {
    const { name, description, private: isPrivate = false } = args;
    const response = await octokit.rest.repos.createForAuthenticatedUser({
      name,
      description,
      private: isPrivate
    });
    return response.data;
  },

  // Issue tools
  async list_issues(args) {
    const { owner, repo, state = 'open', per_page = 30 } = args;
    const response = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state,
      per_page
    });
    return response.data;
  },

  async get_issue(args) {
    const { owner, repo, issue_number } = args;
    const response = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number
    });
    return response.data;
  },

  async create_issue(args) {
    const { owner, repo, title, body, labels } = IssueSchema.parse(args);
    const response = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
      labels
    });
    return response.data;
  },

  async update_issue(args) {
    const { owner, repo, issue_number, title, body, state, labels } = args;
    const response = await octokit.rest.issues.update({
      owner,
      repo,
      issue_number,
      title,
      body,
      state,
      labels
    });
    return response.data;
  },

  // File tools
  async get_file_content(args) {
    const { owner, repo, path, ref } = args;
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref
    });
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    if (response.data.type === 'file' && response.data.content) {
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      return {
        ...response.data,
        decoded_content: content
      };
    }
    
    return response.data;
  },

  async create_or_update_file(args) {
    const { owner, repo, path, content, message, branch = 'main' } = FileSchema.parse(args);
    
    // Check if file exists
    let sha;
    try {
      const existing = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      });
      if (!Array.isArray(existing.data) && existing.data.type === 'file') {
        sha = existing.data.sha;
      }
    } catch (error) {
      // File doesn't exist, that's okay
    }
    
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: message || `Update ${path}`,
      content: Buffer.from(content).toString('base64'),
      branch,
      sha
    });
    
    return response.data;
  },

  // User tools
  async get_authenticated_user() {
    const response = await octokit.rest.users.getAuthenticated();
    return response.data;
  },

  async get_user(args) {
    const { username } = args;
    const response = await octokit.rest.users.getByUsername({ username });
    return response.data;
  },

  // Search tools
  async search_repositories(args) {
    const { q, sort, order = 'desc', per_page = 30 } = args;
    const response = await octokit.rest.search.repos({
      q,
      sort,
      order,
      per_page
    });
    return response.data;
  },

  async search_issues(args) {
    const { q, sort, order = 'desc', per_page = 30 } = args;
    const response = await octokit.rest.search.issuesAndPullRequests({
      q,
      sort,
      order,
      per_page
    });
    return response.data;
  }
};

// Tool definitions for MCP
const toolDefinitions = [
  {
    name: 'list_repositories',
    description: 'List repositories for the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['all', 'owner', 'public', 'private', 'member'], default: 'all' },
        sort: { type: 'string', enum: ['created', 'updated', 'pushed', 'full_name'], default: 'updated' },
        per_page: { type: 'number', minimum: 1, maximum: 100, default: 30 }
      }
    }
  },
  {
    name: 'get_repository',
    description: 'Get detailed information about a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' }
      },
      required: ['owner', 'repo']
    }
  },
  {
    name: 'create_repository',
    description: 'Create a new repository',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Repository name' },
        description: { type: 'string', description: 'Repository description' },
        private: { type: 'boolean', default: false, description: 'Whether the repository is private' }
      },
      required: ['name']
    }
  },
  {
    name: 'list_issues',
    description: 'List issues for a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        state: { type: 'string', enum: ['open', 'closed', 'all'], default: 'open' },
        per_page: { type: 'number', minimum: 1, maximum: 100, default: 30 }
      },
      required: ['owner', 'repo']
    }
  },
  {
    name: 'get_issue',
    description: 'Get detailed information about an issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' }
      },
      required: ['owner', 'repo', 'issue_number']
    }
  },
  {
    name: 'create_issue',
    description: 'Create a new issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        title: { type: 'string', description: 'Issue title' },
        body: { type: 'string', description: 'Issue body' },
        labels: { type: 'array', items: { type: 'string' }, description: 'Issue labels' }
      },
      required: ['owner', 'repo', 'title']
    }
  },
  {
    name: 'update_issue',
    description: 'Update an existing issue',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        issue_number: { type: 'number', description: 'Issue number' },
        title: { type: 'string', description: 'Issue title' },
        body: { type: 'string', description: 'Issue body' },
        state: { type: 'string', enum: ['open', 'closed'], description: 'Issue state' },
        labels: { type: 'array', items: { type: 'string' }, description: 'Issue labels' }
      },
      required: ['owner', 'repo', 'issue_number']
    }
  },
  {
    name: 'get_file_content',
    description: 'Get the content of a file from a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        path: { type: 'string', description: 'File path' },
        ref: { type: 'string', description: 'Branch, tag, or commit SHA' }
      },
      required: ['owner', 'repo', 'path']
    }
  },
  {
    name: 'create_or_update_file',
    description: 'Create or update a file in a repository',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string', description: 'Repository owner' },
        repo: { type: 'string', description: 'Repository name' },
        path: { type: 'string', description: 'File path' },
        content: { type: 'string', description: 'File content' },
        message: { type: 'string', description: 'Commit message' },
        branch: { type: 'string', default: 'main', description: 'Branch name' }
      },
      required: ['owner', 'repo', 'path', 'content']
    }
  },
  {
    name: 'get_authenticated_user',
    description: 'Get information about the authenticated user',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_user',
    description: 'Get information about a specific user',
    inputSchema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'GitHub username' }
      },
      required: ['username']
    }
  },
  {
    name: 'search_repositories',
    description: 'Search for repositories',
    inputSchema: {
      type: 'object',
      properties: {
        q: { type: 'string', description: 'Search query' },
        sort: { type: 'string', enum: ['stars', 'forks', 'help-wanted-issues', 'updated'], description: 'Sort field' },
        order: { type: 'string', enum: ['asc', 'desc'], default: 'desc', description: 'Sort order' },
        per_page: { type: 'number', minimum: 1, maximum: 100, default: 30 }
      },
      required: ['q']
    }
  },
  {
    name: 'search_issues',
    description: 'Search for issues and pull requests',
    inputSchema: {
      type: 'object',
      properties: {
        q: { type: 'string', description: 'Search query' },
        sort: { type: 'string', enum: ['comments', 'reactions', 'reactions-+1', 'reactions--1', 'reactions-smile', 'reactions-thinking_face', 'reactions-heart', 'reactions-tada', 'interactions', 'created', 'updated'], description: 'Sort field' },
        order: { type: 'string', enum: ['asc', 'desc'], default: 'desc', description: 'Sort order' },
        per_page: { type: 'number', minimum: 1, maximum: 100, default: 30 }
      },
      required: ['q']
    }
  }
];

// Create and configure the server
const server = new Server(
  {
    name: 'github-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: toolDefinitions
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    if (!tools[name]) {
      throw new Error(`Unknown tool: ${name}`);
    }
    
    const result = await tools[name](args || {});
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function main() {
  try {
    // Initialize GitHub client
    initializeGitHubClient();
    
    // Verify authentication
    await octokit.rest.users.getAuthenticated();
    console.error('✅ GitHub authentication successful');
    
    // Start the MCP server
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('🚀 GitHub MCP Server started successfully');
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.error('🛑 Shutting down GitHub MCP Server...');
  await server.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.error('🛑 Shutting down GitHub MCP Server...');
  await server.close();
  process.exit(0);
});

if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}