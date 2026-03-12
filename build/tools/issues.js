import { IssueParamsSchema, ListIssuesParamsSchema, CreateIssueParamsSchema, UpdateIssueParamsSchema, CommentParamsSchema } from '../types/mcp.js';
import { validateParams, validateGitHubParams } from '../utils/validation.js';
import { handleGitHubError, createSuccessResult } from '../utils/error-handling.js';
export class IssueTools {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * List issues for a repository
     */
    async listIssues(params) {
        try {
            const validatedParams = validateParams(ListIssuesParamsSchema, params);
            validateGitHubParams({
                owner: validatedParams.owner,
                repo: validatedParams.repo
            });
            const issues = await this.client.listIssues(validatedParams.owner, validatedParams.repo, {
                state: validatedParams.state,
                labels: validatedParams.labels,
                sort: validatedParams.sort,
                direction: validatedParams.direction,
                since: validatedParams.since,
                assignee: validatedParams.assignee,
                creator: validatedParams.creator,
                mentioned: validatedParams.mentioned,
                milestone: validatedParams.milestone,
                per_page: validatedParams.per_page,
                page: validatedParams.page
            });
            return createSuccessResult(issues.map(issue => ({
                id: issue.id,
                number: issue.number,
                title: issue.title,
                body: issue.body,
                state: issue.state,
                state_reason: issue.state_reason,
                user: {
                    login: issue.user.login,
                    avatar_url: issue.user.avatar_url,
                    html_url: issue.user.html_url,
                    type: issue.user.type
                },
                labels: issue.labels.map(label => ({
                    id: label.id,
                    name: label.name,
                    description: label.description,
                    color: label.color
                })),
                assignee: issue.assignee ? {
                    login: issue.assignee.login,
                    avatar_url: issue.assignee.avatar_url,
                    html_url: issue.assignee.html_url
                } : null,
                assignees: issue.assignees.map(assignee => ({
                    login: assignee.login,
                    avatar_url: assignee.avatar_url,
                    html_url: assignee.html_url
                })),
                milestone: issue.milestone ? {
                    id: issue.milestone.id,
                    number: issue.milestone.number,
                    title: issue.milestone.title,
                    description: issue.milestone.description,
                    state: issue.milestone.state
                } : null,
                locked: issue.locked,
                comments: issue.comments,
                pull_request: issue.pull_request,
                closed_at: issue.closed_at,
                created_at: issue.created_at,
                updated_at: issue.updated_at,
                html_url: issue.html_url,
                url: issue.url
            })), `Found ${issues.length} issues in ${validatedParams.owner}/${validatedParams.repo}`);
        }
        catch (error) {
            return handleGitHubError(error);
        }
    }
    /**
     * Get detailed information about a specific issue
     */
    async getIssue(params) {
        try {
            const validatedParams = validateParams(IssueParamsSchema, params);
            validateGitHubParams({
                owner: validatedParams.owner,
                repo: validatedParams.repo
            });
            const issue = await this.client.getIssue(validatedParams.owner, validatedParams.repo, validatedParams.issue_number);
            return createSuccessResult({
                id: issue.id,
                number: issue.number,
                title: issue.title,
                body: issue.body,
                state: issue.state,
                state_reason: issue.state_reason,
                user: {
                    id: issue.user.id,
                    login: issue.user.login,
                    avatar_url: issue.user.avatar_url,
                    html_url: issue.user.html_url,
                    type: issue.user.type,
                    site_admin: issue.user.site_admin
                },
                labels: issue.labels.map(label => ({
                    id: label.id,
                    name: label.name,
                    description: label.description,
                    color: label.color,
                    default: label.default
                })),
                assignee: issue.assignee ? {
                    id: issue.assignee.id,
                    login: issue.assignee.login,
                    avatar_url: issue.assignee.avatar_url,
                    html_url: issue.assignee.html_url,
                    type: issue.assignee.type
                } : null,
                assignees: issue.assignees.map(assignee => ({
                    id: assignee.id,
                    login: assignee.login,
                    avatar_url: assignee.avatar_url,
                    html_url: assignee.html_url,
                    type: assignee.type
                })),
                milestone: issue.milestone ? {
                    id: issue.milestone.id,
                    number: issue.milestone.number,
                    title: issue.milestone.title,
                    description: issue.milestone.description,
                    state: issue.milestone.state,
                    creator: {
                        login: issue.milestone.creator.login,
                        avatar_url: issue.milestone.creator.avatar_url,
                        html_url: issue.milestone.creator.html_url
                    },
                    open_issues: issue.milestone.open_issues,
                    closed_issues: issue.milestone.closed_issues,
                    created_at: issue.milestone.created_at,
                    updated_at: issue.milestone.updated_at,
                    closed_at: issue.milestone.closed_at,
                    due_on: issue.milestone.due_on
                } : null,
                locked: issue.locked,
                active_lock_reason: issue.active_lock_reason,
                comments: issue.comments,
                pull_request: issue.pull_request,
                closed_at: issue.closed_at,
                created_at: issue.created_at,
                updated_at: issue.updated_at,
                closed_by: issue.closed_by ? {
                    login: issue.closed_by.login,
                    avatar_url: issue.closed_by.avatar_url,
                    html_url: issue.closed_by.html_url
                } : null,
                author_association: issue.author_association,
                draft: issue.draft,
                html_url: issue.html_url,
                url: issue.url
            }, `Issue #${issue.number}: ${issue.title}`);
        }
        catch (error) {
            return handleGitHubError(error);
        }
    }
    /**
     * Create a new issue
     */
    async createIssue(params) {
        try {
            const validatedParams = validateParams(CreateIssueParamsSchema, params);
            validateGitHubParams({
                owner: validatedParams.owner,
                repo: validatedParams.repo
            });
            const issue = await this.client.createIssue(validatedParams.owner, validatedParams.repo, {
                title: validatedParams.title,
                body: validatedParams.body,
                assignees: validatedParams.assignees,
                milestone: validatedParams.milestone,
                labels: validatedParams.labels
            });
            return createSuccessResult({
                id: issue.id,
                number: issue.number,
                title: issue.title,
                body: issue.body,
                state: issue.state,
                user: {
                    login: issue.user.login,
                    avatar_url: issue.user.avatar_url,
                    html_url: issue.user.html_url
                },
                labels: issue.labels.map(label => ({
                    id: label.id,
                    name: label.name,
                    color: label.color
                })),
                assignees: issue.assignees.map(assignee => ({
                    login: assignee.login,
                    avatar_url: assignee.avatar_url,
                    html_url: assignee.html_url
                })),
                milestone: issue.milestone ? {
                    id: issue.milestone.id,
                    number: issue.milestone.number,
                    title: issue.milestone.title
                } : null,
                created_at: issue.created_at,
                updated_at: issue.updated_at,
                html_url: issue.html_url,
                url: issue.url
            }, `Successfully created issue #${issue.number}: ${issue.title}`);
        }
        catch (error) {
            return handleGitHubError(error);
        }
    }
    /**
     * Update an existing issue
     */
    async updateIssue(params) {
        try {
            const validatedParams = validateParams(UpdateIssueParamsSchema, params);
            validateGitHubParams({
                owner: validatedParams.owner,
                repo: validatedParams.repo
            });
            const issue = await this.client.updateIssue(validatedParams.owner, validatedParams.repo, validatedParams.issue_number, {
                title: validatedParams.title,
                body: validatedParams.body,
                state: validatedParams.state,
                assignees: validatedParams.assignees,
                milestone: validatedParams.milestone,
                labels: validatedParams.labels
            });
            return createSuccessResult({
                id: issue.id,
                number: issue.number,
                title: issue.title,
                body: issue.body,
                state: issue.state,
                user: {
                    login: issue.user.login,
                    avatar_url: issue.user.avatar_url,
                    html_url: issue.user.html_url
                },
                labels: issue.labels.map(label => ({
                    id: label.id,
                    name: label.name,
                    color: label.color
                })),
                assignees: issue.assignees.map(assignee => ({
                    login: assignee.login,
                    avatar_url: assignee.avatar_url,
                    html_url: assignee.html_url
                })),
                milestone: issue.milestone ? {
                    id: issue.milestone.id,
                    number: issue.milestone.number,
                    title: issue.milestone.title
                } : null,
                created_at: issue.created_at,
                updated_at: issue.updated_at,
                html_url: issue.html_url,
                url: issue.url
            }, `Successfully updated issue #${issue.number}: ${issue.title}`);
        }
        catch (error) {
            return handleGitHubError(error);
        }
    }
    /**
     * Add a comment to an issue
     */
    async addComment(params) {
        try {
            const validatedParams = validateParams(CommentParamsSchema, params);
            validateGitHubParams({
                owner: validatedParams.owner,
                repo: validatedParams.repo
            });
            const comment = await this.client.createIssueComment(validatedParams.owner, validatedParams.repo, validatedParams.issue_number, validatedParams.body);
            return createSuccessResult({
                id: comment.id,
                body: comment.body,
                user: {
                    login: comment.user.login,
                    avatar_url: comment.user.avatar_url,
                    html_url: comment.user.html_url
                },
                created_at: comment.created_at,
                updated_at: comment.updated_at,
                html_url: comment.html_url,
                url: comment.url,
                author_association: comment.author_association
            }, `Successfully added comment to issue #${validatedParams.issue_number}`);
        }
        catch (error) {
            return handleGitHubError(error);
        }
    }
    /**
     * Close an issue
     */
    async closeIssue(params) {
        try {
            const validatedParams = validateParams(IssueParamsSchema, params);
            validateGitHubParams({
                owner: validatedParams.owner,
                repo: validatedParams.repo
            });
            const issue = await this.client.updateIssue(validatedParams.owner, validatedParams.repo, validatedParams.issue_number, { state: 'closed' });
            return createSuccessResult({
                id: issue.id,
                number: issue.number,
                title: issue.title,
                state: issue.state,
                closed_at: issue.closed_at,
                html_url: issue.html_url
            }, `Successfully closed issue #${issue.number}: ${issue.title}`);
        }
        catch (error) {
            return handleGitHubError(error);
        }
    }
    /**
     * Reopen an issue
     */
    async reopenIssue(params) {
        try {
            const validatedParams = validateParams(IssueParamsSchema, params);
            validateGitHubParams({
                owner: validatedParams.owner,
                repo: validatedParams.repo
            });
            const issue = await this.client.updateIssue(validatedParams.owner, validatedParams.repo, validatedParams.issue_number, { state: 'open' });
            return createSuccessResult({
                id: issue.id,
                number: issue.number,
                title: issue.title,
                state: issue.state,
                updated_at: issue.updated_at,
                html_url: issue.html_url
            }, `Successfully reopened issue #${issue.number}: ${issue.title}`);
        }
        catch (error) {
            return handleGitHubError(error);
        }
    }
}
//# sourceMappingURL=issues.js.map