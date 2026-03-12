export class GitHubError extends Error {
    status;
    response;
    constructor(message, status, response) {
        super(message);
        this.status = status;
        this.response = response;
        this.name = 'GitHubError';
    }
}
export class ValidationError extends Error {
    field;
    constructor(message, field) {
        super(message);
        this.field = field;
        this.name = 'ValidationError';
    }
}
export class AuthenticationError extends Error {
    constructor(message = 'GitHub authentication failed') {
        super(message);
        this.name = 'AuthenticationError';
    }
}
export class RateLimitError extends Error {
    resetTime;
    constructor(message = 'GitHub API rate limit exceeded', resetTime) {
        super(message);
        this.resetTime = resetTime;
        this.name = 'RateLimitError';
    }
}
export function handleGitHubError(error) {
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
export function createSuccessResult(data, message) {
    const content = [];
    if (message) {
        content.push({
            type: 'text',
            text: message
        });
    }
    content.push({
        type: 'text',
        text: JSON.stringify(data, null, 2)
    });
    return { content };
}
export function createTextResult(text) {
    return {
        content: [{
                type: 'text',
                text
            }]
    };
}
export function validateRequiredFields(obj, fields) {
    for (const field of fields) {
        if (!obj[field]) {
            throw new ValidationError(`Missing required field: ${field}`, field);
        }
    }
}
export function sanitizeInput(input) {
    // Basic input sanitization
    return input.trim().replace(/[<>]/g, '');
}
export function formatRepositoryUrl(owner, repo) {
    return `https://github.com/${owner}/${repo}`;
}
export function formatIssueUrl(owner, repo, issueNumber) {
    return `https://github.com/${owner}/${repo}/issues/${issueNumber}`;
}
export function formatPullRequestUrl(owner, repo, pullNumber) {
    return `https://github.com/${owner}/${repo}/pull/${pullNumber}`;
}
export function formatUserUrl(username) {
    return `https://github.com/${username}`;
}
export function formatOrganizationUrl(org) {
    return `https://github.com/${org}`;
}
//# sourceMappingURL=error-handling.js.map