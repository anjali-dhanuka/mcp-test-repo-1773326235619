import { z } from 'zod';
import { ValidationError } from './error-handling.js';

/**
 * Validates input parameters using a Zod schema
 */
export function validateParams<T>(schema: z.ZodSchema<T>, params: unknown): T {
  try {
    return schema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      if (firstError) {
        const field = firstError.path.join('.');
        const message = firstError.message;
        throw new ValidationError(`${field}: ${message}`, field);
      }
      throw new ValidationError('Validation failed', 'unknown');
    }
    throw error;
  }
}

/**
 * Validates that a string is a valid GitHub username
 */
export function validateGitHubUsername(username: string): boolean {
  // GitHub username rules:
  // - May only contain alphanumeric characters or single hyphens
  // - Cannot begin or end with a hyphen
  // - Maximum 39 characters
  const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
  return usernameRegex.test(username);
}

/**
 * Validates that a string is a valid GitHub repository name
 */
export function validateRepositoryName(name: string): boolean {
  // GitHub repository name rules:
  // - Can contain alphanumeric characters, hyphens, underscores, and periods
  // - Cannot start with a period or hyphen
  // - Cannot end with a period
  // - Maximum 100 characters
  const repoNameRegex = /^[a-zA-Z0-9_][a-zA-Z0-9._-]{0,98}[a-zA-Z0-9_-]$|^[a-zA-Z0-9_]$/;
  return repoNameRegex.test(name) && !name.startsWith('.') && !name.endsWith('.');
}

/**
 * Validates that a string is a valid GitHub organization name
 */
export function validateOrganizationName(org: string): boolean {
  // Organization names follow similar rules to usernames
  return validateGitHubUsername(org);
}

/**
 * Validates that a string is a valid Git reference (branch, tag, or SHA)
 */
export function validateGitRef(ref: string): boolean {
  // Git reference rules:
  // - Cannot contain spaces, ~, ^, :, ?, *, [, \, or ASCII control characters
  // - Cannot start or end with /
  // - Cannot contain consecutive slashes
  // - Cannot end with .lock
  const gitRefRegex = /^(?!.*[~^:?*[\\\s])(?!.*\/\/)(?!\/)(?!.*\/$)(?!.*\.lock$)[^\x00-\x1f\x7f]+$/;
  return gitRefRegex.test(ref) && ref.length > 0 && ref.length <= 250;
}

/**
 * Validates that a string is a valid file path
 */
export function validateFilePath(path: string): boolean {
  // File path validation:
  // - Cannot be empty
  // - Cannot contain null bytes
  // - Cannot be just . or ..
  // - Cannot start with /
  if (!path || path === '.' || path === '..' || path.startsWith('/')) {
    return false;
  }
  
  // Check for null bytes
  if (path.includes('\0')) {
    return false;
  }
  
  // Check for invalid path components
  const components = path.split('/');
  for (const component of components) {
    if (component === '' || component === '.' || component === '..') {
      return false;
    }
  }
  
  return true;
}

/**
 * Validates that a string is a valid commit SHA
 */
export function validateCommitSha(sha: string): boolean {
  // Git SHA validation:
  // - Must be 40 characters long (full SHA) or 7+ characters (short SHA)
  // - Must contain only hexadecimal characters
  const fullShaRegex = /^[a-f0-9]{40}$/i;
  const shortShaRegex = /^[a-f0-9]{7,40}$/i;
  
  return fullShaRegex.test(sha) || shortShaRegex.test(sha);
}

/**
 * Validates that a number is a valid issue or PR number
 */
export function validateIssueNumber(num: number): boolean {
  return Number.isInteger(num) && num > 0 && num <= Number.MAX_SAFE_INTEGER;
}

/**
 * Validates that a string is a valid label name
 */
export function validateLabelName(label: string): boolean {
  // GitHub label name rules:
  // - Cannot be empty
  // - Maximum 50 characters
  // - Cannot contain only whitespace
  return label.trim().length > 0 && label.length <= 50;
}

/**
 * Validates that a string is a valid milestone number or title
 */
export function validateMilestone(milestone: string | number): boolean {
  if (typeof milestone === 'number') {
    return validateIssueNumber(milestone);
  }
  
  // Milestone title validation
  return milestone.trim().length > 0 && milestone.length <= 255;
}

/**
 * Validates that a string is a valid email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates that a string is a valid URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates pagination parameters
 */
export function validatePagination(page?: number, perPage?: number): void {
  if (page !== undefined) {
    if (!Number.isInteger(page) || page < 1) {
      throw new ValidationError('Page must be a positive integer', 'page');
    }
  }
  
  if (perPage !== undefined) {
    if (!Number.isInteger(perPage) || perPage < 1 || perPage > 100) {
      throw new ValidationError('Per page must be an integer between 1 and 100', 'per_page');
    }
  }
}

/**
 * Validates that a string is valid base64
 */
export function validateBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

/**
 * Validates search query parameters
 */
export function validateSearchQuery(query: string): void {
  if (!query || query.trim().length === 0) {
    throw new ValidationError('Search query cannot be empty', 'q');
  }
  
  if (query.length > 256) {
    throw new ValidationError('Search query cannot exceed 256 characters', 'q');
  }
}

/**
 * Validates that an array contains only valid strings
 */
export function validateStringArray(arr: unknown, fieldName: string): string[] {
  if (!Array.isArray(arr)) {
    throw new ValidationError(`${fieldName} must be an array`, fieldName);
  }
  
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'string') {
      throw new ValidationError(`${fieldName}[${i}] must be a string`, fieldName);
    }
  }
  
  return arr as string[];
}

/**
 * Validates GitHub-specific parameters
 */
export function validateGitHubParams(params: {
  owner?: string;
  repo?: string;
  org?: string;
  username?: string;
  ref?: string;
  path?: string;
  sha?: string;
}): void {
  if (params.owner && !validateGitHubUsername(params.owner)) {
    throw new ValidationError('Invalid GitHub username format', 'owner');
  }
  
  if (params.repo && !validateRepositoryName(params.repo)) {
    throw new ValidationError('Invalid repository name format', 'repo');
  }
  
  if (params.org && !validateOrganizationName(params.org)) {
    throw new ValidationError('Invalid organization name format', 'org');
  }
  
  if (params.username && !validateGitHubUsername(params.username)) {
    throw new ValidationError('Invalid GitHub username format', 'username');
  }
  
  if (params.ref && !validateGitRef(params.ref)) {
    throw new ValidationError('Invalid Git reference format', 'ref');
  }
  
  if (params.path && !validateFilePath(params.path)) {
    throw new ValidationError('Invalid file path format', 'path');
  }
  
  if (params.sha && !validateCommitSha(params.sha)) {
    throw new ValidationError('Invalid commit SHA format', 'sha');
  }
}