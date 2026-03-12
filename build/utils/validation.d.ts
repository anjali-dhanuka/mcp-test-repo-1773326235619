import { z } from 'zod';
/**
 * Validates input parameters using a Zod schema
 */
export declare function validateParams<T>(schema: z.ZodSchema<T>, params: unknown): T;
/**
 * Validates that a string is a valid GitHub username
 */
export declare function validateGitHubUsername(username: string): boolean;
/**
 * Validates that a string is a valid GitHub repository name
 */
export declare function validateRepositoryName(name: string): boolean;
/**
 * Validates that a string is a valid GitHub organization name
 */
export declare function validateOrganizationName(org: string): boolean;
/**
 * Validates that a string is a valid Git reference (branch, tag, or SHA)
 */
export declare function validateGitRef(ref: string): boolean;
/**
 * Validates that a string is a valid file path
 */
export declare function validateFilePath(path: string): boolean;
/**
 * Validates that a string is a valid commit SHA
 */
export declare function validateCommitSha(sha: string): boolean;
/**
 * Validates that a number is a valid issue or PR number
 */
export declare function validateIssueNumber(num: number): boolean;
/**
 * Validates that a string is a valid label name
 */
export declare function validateLabelName(label: string): boolean;
/**
 * Validates that a string is a valid milestone number or title
 */
export declare function validateMilestone(milestone: string | number): boolean;
/**
 * Validates that a string is a valid email address
 */
export declare function validateEmail(email: string): boolean;
/**
 * Validates that a string is a valid URL
 */
export declare function validateUrl(url: string): boolean;
/**
 * Validates pagination parameters
 */
export declare function validatePagination(page?: number, perPage?: number): void;
/**
 * Validates that a string is valid base64
 */
export declare function validateBase64(str: string): boolean;
/**
 * Validates search query parameters
 */
export declare function validateSearchQuery(query: string): void;
/**
 * Validates that an array contains only valid strings
 */
export declare function validateStringArray(arr: unknown, fieldName: string): string[];
/**
 * Validates GitHub-specific parameters
 */
export declare function validateGitHubParams(params: {
    owner?: string;
    repo?: string;
    org?: string;
    username?: string;
    ref?: string;
    path?: string;
    sha?: string;
}): void;
//# sourceMappingURL=validation.d.ts.map