import { GitHubClient } from '../github-client.js';
import { McpToolResult } from '../types/mcp.js';
export declare class RepositoryTools {
    private client;
    constructor(client: GitHubClient);
    /**
     * List repositories for the authenticated user
     */
    listRepositories(params: unknown): Promise<McpToolResult>;
    /**
     * Get detailed information about a specific repository
     */
    getRepository(params: unknown): Promise<McpToolResult>;
    /**
     * Create a new repository
     */
    createRepository(params: unknown): Promise<McpToolResult>;
    /**
     * Get repository clone URLs
     */
    getRepositoryCloneUrls(params: unknown): Promise<McpToolResult>;
    /**
     * List repository contents (files and directories)
     */
    listRepositoryContents(params: unknown): Promise<McpToolResult>;
    /**
     * Get repository statistics and insights
     */
    getRepositoryStats(params: unknown): Promise<McpToolResult>;
    /**
     * List user's repositories (for a specific user, not authenticated user)
     */
    listUserRepositories(params: unknown): Promise<McpToolResult>;
    /**
     * List organization repositories
     */
    listOrganizationRepositories(params: unknown): Promise<McpToolResult>;
}
//# sourceMappingURL=repositories.d.ts.map