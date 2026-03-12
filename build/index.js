#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { GitHubClient } from './github-client.js';
import { RepositoryTools } from './tools/repositories.js';
import { IssueTools } from './tools/issues.js';
import { PullRequestTools } from './tools/pull-requests.js';
import { FileTools } from './tools/files.js';
import { UserTools } from './tools/users.js';
import { SearchTools } from './tools/search.js';
import { RepositoryParamsSchema, ListRepositoriesParamsSchema, CreateRepositoryParamsSchema, ListContentsParamsSchema, IssueParamsSchema, ListIssuesParamsSchema, CreateIssueParamsSchema, UpdateIssueParamsSchema, PullRequestParamsSchema, ListPullRequestsParamsSchema, CreatePullRequestParamsSchema, UpdatePullRequestParamsSchema, MergePullRequestParamsSchema, FileParamsSchema, CreateFileParamsSchema, UpdateFileParamsSchema, DeleteFileParamsSchema, UserParamsSchema, OrganizationParamsSchema, SearchRepositoriesParamsSchema, SearchIssuesParamsSchema, SearchCodeParamsSchema, SearchUsersParamsSchema, CommentParamsSchema } from './types/mcp.js';
// Check for required environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    console.error('Please set your GitHub Personal Access Token in the GITHUB_TOKEN environment variable');
    process.exit(1);
}
// Create the MCP server
const server = new McpServer({
    name: 'github-mcp-server',
    version: '0.1.0',
    description: 'Comprehensive GitHub integration MCP server'
});
// Initialize GitHub client and tools
let githubClient;
let repositoryTools;
let issueTools;
let pullRequestTools;
let fileTools;
let userTools;
let searchTools;
try {
    githubClient = new GitHubClient(GITHUB_TOKEN);
    repositoryTools = new RepositoryTools(githubClient);
    issueTools = new IssueTools(githubClient);
    pullRequestTools = new PullRequestTools(githubClient);
    fileTools = new FileTools(githubClient);
    userTools = new UserTools(githubClient);
    searchTools = new SearchTools(githubClient);
}
catch (error) {
    console.error('Error initializing GitHub client:', error);
    process.exit(1);
}
// Repository Management Tools
server.tool('list_repositories', ListRepositoriesParamsSchema, async (params) => {
    return await repositoryTools.listRepositories(params);
});
server.tool('get_repository', RepositoryParamsSchema, async (params) => {
    return await repositoryTools.getRepository(params);
});
server.tool('create_repository', CreateRepositoryParamsSchema, async (params) => {
    return await repositoryTools.createRepository(params);
});
server.tool('get_repository_clone_urls', RepositoryParamsSchema, async (params) => {
    return await repositoryTools.getRepositoryCloneUrls(params);
});
server.tool('list_repository_contents', ListContentsParamsSchema, async (params) => {
    return await repositoryTools.listRepositoryContents(params);
});
server.tool('get_repository_stats', RepositoryParamsSchema, async (params) => {
    return await repositoryTools.getRepositoryStats(params);
});
// Issue Management Tools
server.tool('list_issues', ListIssuesParamsSchema, async (params) => {
    return await issueTools.listIssues(params);
});
server.tool('get_issue', IssueParamsSchema, async (params) => {
    return await issueTools.getIssue(params);
});
server.tool('create_issue', CreateIssueParamsSchema, async (params) => {
    return await issueTools.createIssue(params);
});
server.tool('update_issue', UpdateIssueParamsSchema, async (params) => {
    return await issueTools.updateIssue(params);
});
server.tool('add_issue_comment', CommentParamsSchema, async (params) => {
    return await issueTools.addComment(params);
});
// Pull Request Management Tools
server.tool('list_pull_requests', ListPullRequestsParamsSchema, async (params) => {
    return await pullRequestTools.listPullRequests(params);
});
server.tool('get_pull_request', PullRequestParamsSchema, async (params) => {
    return await pullRequestTools.getPullRequest(params);
});
server.tool('create_pull_request', CreatePullRequestParamsSchema, async (params) => {
    return await pullRequestTools.createPullRequest(params);
});
server.tool('update_pull_request', UpdatePullRequestParamsSchema, async (params) => {
    return await pullRequestTools.updatePullRequest(params);
});
server.tool('merge_pull_request', MergePullRequestParamsSchema, async (params) => {
    return await pullRequestTools.mergePullRequest(params);
});
server.tool('add_pull_request_comment', CommentParamsSchema, async (params) => {
    return await pullRequestTools.addComment(params);
});
// File Operations Tools
server.tool('get_file_content', FileParamsSchema, async (params) => {
    return await fileTools.getFileContent(params);
});
server.tool('create_file', CreateFileParamsSchema, async (params) => {
    return await fileTools.createFile(params);
});
server.tool('update_file', UpdateFileParamsSchema, async (params) => {
    return await fileTools.updateFile(params);
});
server.tool('delete_file', DeleteFileParamsSchema, async (params) => {
    return await fileTools.deleteFile(params);
});
// User and Organization Tools
server.tool('get_user', UserParamsSchema, async (params) => {
    return await userTools.getUser(params);
});
server.tool('get_authenticated_user', {}, async () => {
    return await userTools.getAuthenticatedUser();
});
server.tool('get_organization', OrganizationParamsSchema, async (params) => {
    return await userTools.getOrganization(params);
});
server.tool('list_user_repositories', UserParamsSchema.extend(ListRepositoriesParamsSchema.shape), async (params) => {
    return await repositoryTools.listUserRepositories(params);
});
server.tool('list_organization_repositories', OrganizationParamsSchema.extend(ListRepositoriesParamsSchema.shape), async (params) => {
    return await repositoryTools.listOrganizationRepositories(params);
});
// Search Tools
server.tool('search_repositories', SearchRepositoriesParamsSchema, async (params) => {
    return await searchTools.searchRepositories(params);
});
server.tool('search_issues', SearchIssuesParamsSchema, async (params) => {
    return await searchTools.searchIssues(params);
});
server.tool('search_code', SearchCodeParamsSchema, async (params) => {
    return await searchTools.searchCode(params);
});
server.tool('search_users', SearchUsersParamsSchema, async (params) => {
    return await searchTools.searchUsers(params);
});
// Utility Tools
server.tool('get_rate_limit', {}, async () => {
    try {
        const rateLimit = await githubClient.getRateLimit();
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        core: {
                            limit: rateLimit.rate.limit,
                            remaining: rateLimit.rate.remaining,
                            reset: new Date(rateLimit.rate.reset * 1000).toISOString(),
                            used: rateLimit.rate.used
                        },
                        search: {
                            limit: rateLimit.search.limit,
                            remaining: rateLimit.search.remaining,
                            reset: new Date(rateLimit.search.reset * 1000).toISOString(),
                            used: rateLimit.search.used
                        },
                        graphql: {
                            limit: rateLimit.graphql.limit,
                            remaining: rateLimit.graphql.remaining,
                            reset: new Date(rateLimit.graphql.reset * 1000).toISOString(),
                            used: rateLimit.graphql.used
                        }
                    }, null, 2)
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: 'text',
                    text: `Error getting rate limit: ${error.message}`
                }],
            isError: true
        };
    }
});
// Start the server
async function main() {
    try {
        // Test authentication
        await githubClient.checkAuthentication();
        console.error('GitHub MCP Server initialized successfully');
        console.error('Authentication verified');
        // Start the MCP server
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error('GitHub MCP server running on stdio');
    }
    catch (error) {
        console.error('Failed to start GitHub MCP server:', error);
        process.exit(1);
    }
}
// Handle graceful shutdown
process.on('SIGINT', () => {
    console.error('Shutting down GitHub MCP server...');
    process.exit(0);
});
process.on('SIGTERM', () => {
    console.error('Shutting down GitHub MCP server...');
    process.exit(0);
});
// Start the server
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map