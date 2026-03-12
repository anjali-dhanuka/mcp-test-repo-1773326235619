import { McpToolResult } from '../types/mcp.js';

export class GitHubError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'GitHubError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'GitHub authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends Error {
  constructor(
    message: string = 'GitHub API rate limit exceeded',
    public resetTime?: Date
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export function handleGitHubError(error: any): McpToolResult {
  console.error('GitHub API Error:', error);

  // Handle Octokit errors
  if (error.status) {
    switch (error.status) {
      case 401:
        return {
          content: [{
            type: 'text',
            text: `Authentication failed: ${error.message}\n\nPlease check your GitHub token and ensure it has the necessary permissions.`
          }],
          isError: true
        };
      
      case 403:
        if (error.message.includes('rate limit')) {
          const resetTime = error.response?.headers?.['x-ratelimit-reset'];
          const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
          return {
            content: [{
              type: 'text',
              text: `Rate limit exceeded: ${error.message}${resetDate ? `\nRate limit resets at: ${resetDate.toISOString()}` : ''}\n\nPlease wait before making more requests.`
            }],
            isError: true
          };
        }
        return {
          content: [{
            type: 'text',
            text: `Access forbidden: ${error.message}\n\nThis may be due to insufficient permissions or the resource being private.`
          }],
          isError: true
        };
      
      case 404:
        return {
          content: [{
            type: 'text',
            text: `Resource not found: ${error.message}\n\nPlease check that the repository, issue, or other resource exists and you have access to it.`
          }],
          isError: true
        };
      
      case 422:
        return {
          content: [{
            type: 'text',
            text: `Validation failed: ${error.message}\n\nPlease check your input parameters and try again.`
          }],
          isError: true
        };
      
      default:
        return {
          content: [{
            type: 'text',
            text: `GitHub API error (${error.status}): ${error.message}`
          }],
          isError: true
        };
    }
  }

  // Handle custom errors
  if (error instanceof ValidationError) {
    return {
      content: [{
        type: 'text',
        text: `Validation error${error.field ? ` in field '${error.field}'` : ''}: ${error.message}`
      }],
      isError: true
    };
  }

  if (error instanceof AuthenticationError) {
    return {
      content: [{
        type: 'text',
        text: `${error.message}\n\nPlease ensure your GITHUB_TOKEN environment variable is set with a valid GitHub personal access token.`
      }],
      isError: true
    };
  }

  if (error instanceof RateLimitError) {
    return {
      content: [{
        type: 'text',
        text: `${error.message}${error.resetTime ? `\nRate limit resets at: ${error.resetTime.toISOString()}` : ''}`
      }],
      isError: true
    };
  }

  // Handle network errors
  if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
    return {
      content: [{
        type: 'text',
        text: `Network error: Unable to connect to GitHub API. Please check your internet connection.`
      }],
      isError: true
    };
  }

  // Handle timeout errors
  if (error.code === 'ETIMEDOUT') {
    return {
      content: [{
        type: 'text',
        text: `Request timeout: The GitHub API request took too long to respond. Please try again.`
      }],
      isError: true
    };
  }

  // Generic error handling
  return {
    content: [{
      type: 'text',
      text: `Unexpected error: ${error.message || 'An unknown error occurred'}`
    }],
    isError: true
  };
}

export function createSuccessResult(data: any, message?: string): McpToolResult {
  const content = [];
  
  if (message) {
    content.push({
      type: 'text' as const,
      text: message
    });
  }
  
  content.push({
    type: 'text' as const,
    text: JSON.stringify(data, null, 2)
  });
  
  return { content };
}

export function createTextResult(text: string): McpToolResult {
  return {
    content: [{
      type: 'text',
      text
    }]
  };
}

export function validateRequiredFields(obj: any, fields: string[]): void {
  for (const field of fields) {
    if (!obj[field]) {
      throw new ValidationError(`Missing required field: ${field}`, field);
    }
  }
}

export function sanitizeInput(input: string): string {
  // Basic input sanitization
  return input.trim().replace(/[<>]/g, '');
}

export function formatRepositoryUrl(owner: string, repo: string): string {
  return `https://github.com/${owner}/${repo}`;
}

export function formatIssueUrl(owner: string, repo: string, issueNumber: number): string {
  return `https://github.com/${owner}/${repo}/issues/${issueNumber}`;
}

export function formatPullRequestUrl(owner: string, repo: string, pullNumber: number): string {
  return `https://github.com/${owner}/${repo}/pull/${pullNumber}`;
}

export function formatUserUrl(username: string): string {
  return `https://github.com/${username}`;
}

export function formatOrganizationUrl(org: string): string {
  return `https://github.com/${org}`;
}