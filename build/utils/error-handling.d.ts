import { McpToolResult } from '../types/mcp.js';
export declare class GitHubError extends Error {
    status?: number | undefined;
    response?: any | undefined;
    constructor(message: string, status?: number | undefined, response?: any | undefined);
}
export declare class ValidationError extends Error {
    field?: string | undefined;
    constructor(message: string, field?: string | undefined);
}
export declare class AuthenticationError extends Error {
    constructor(message?: string);
}
export declare class RateLimitError extends Error {
    resetTime?: Date | undefined;
    constructor(message?: string, resetTime?: Date | undefined);
}
export declare function handleGitHubError(error: any): McpToolResult;
export declare function createSuccessResult(data: any, message?: string): McpToolResult;
export declare function createTextResult(text: string): McpToolResult;
export declare function validateRequiredFields(obj: any, fields: string[]): void;
export declare function sanitizeInput(input: string): string;
export declare function formatRepositoryUrl(owner: string, repo: string): string;
export declare function formatIssueUrl(owner: string, repo: string, issueNumber: number): string;
export declare function formatPullRequestUrl(owner: string, repo: string, pullNumber: number): string;
export declare function formatUserUrl(username: string): string;
export declare function formatOrganizationUrl(org: string): string;
//# sourceMappingURL=error-handling.d.ts.map