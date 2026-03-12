import { GitHubClient } from '../github-client.js';
import { McpToolResult } from '../types/mcp.js';
export declare class IssueTools {
    private client;
    constructor(client: GitHubClient);
    /**
     * List issues for a repository
     */
    listIssues(params: unknown): Promise<McpToolResult>;
    /**
     * Get detailed information about a specific issue
     */
    getIssue(params: unknown): Promise<McpToolResult>;
    /**
     * Create a new issue
     */
    createIssue(params: unknown): Promise<McpToolResult>;
    /**
     * Update an existing issue
     */
    updateIssue(params: unknown): Promise<McpToolResult>;
    /**
     * Add a comment to an issue
     */
    addComment(params: unknown): Promise<McpToolResult>;
    /**
     * Close an issue
     */
    closeIssue(params: unknown): Promise<McpToolResult>;
    /**
     * Reopen an issue
     */
    reopenIssue(params: unknown): Promise<McpToolResult>;
}
//# sourceMappingURL=issues.d.ts.map