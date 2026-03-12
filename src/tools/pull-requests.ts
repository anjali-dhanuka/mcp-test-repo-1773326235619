import { GitHubClient } from '../github-client.js';
import { McpToolResult } from '../types/mcp.js';
import { 
  PullRequestParamsSchema,
  ListPullRequestsParamsSchema,
  CreatePullRequestParamsSchema,
  UpdatePullRequestParamsSchema,
  MergePullRequestParamsSchema,
  CommentParamsSchema,
  PullRequestParams,
  ListPullRequestsParams,
  CreatePullRequestParams,
  UpdatePullRequestParams,
  MergePullRequestParams,
  CommentParams
} from '../types/mcp.js';
import { validateParams, validateGitHubParams } from '../utils/validation.js';
import { handleGitHubError, createSuccessResult } from '../utils/error-handling.js';

export class PullRequestTools {
  constructor(private client: GitHubClient) {}

  /**
   * List pull requests for a repository
   */
  async listPullRequests(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(ListPullRequestsParamsSchema, params) as ListPullRequestsParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo 
      });
      
      const pullRequests = await this.client.listPullRequests(
        validatedParams.owner,
        validatedParams.repo,
        {
          state: validatedParams.state,
          head: validatedParams.head,
          base: validatedParams.base,
          sort: validatedParams.sort,
          direction: validatedParams.direction,
          per_page: validatedParams.per_page,
          page: validatedParams.page
        }
      );
      
      return createSuccessResult(
        pullRequests.map((pr: any) => ({
          id: pr.id,
          number: pr.number,
          title: pr.title,
          body: pr.body,
          state: pr.state,
          user: pr.user ? {
            login: pr.user.login,
            avatar_url: pr.user.avatar_url,
            html_url: pr.user.html_url,
            type: pr.user.type
          } : null,
          head: {
            label: pr.head.label,
            ref: pr.head.ref,
            sha: pr.head.sha,
            user: pr.head.user ? {
              login: pr.head.user.login,
              avatar_url: pr.head.user.avatar_url,
              html_url: pr.head.user.html_url
            } : null,
            repo: pr.head.repo ? {
              name: pr.head.repo.name,
              full_name: pr.head.repo.full_name,
              html_url: pr.head.repo.html_url
            } : null
          },
          base: {
            label: pr.base.label,
            ref: pr.base.ref,
            sha: pr.base.sha,
            user: pr.base.user ? {
              login: pr.base.user.login,
              avatar_url: pr.base.user.avatar_url,
              html_url: pr.base.user.html_url
            } : null,
            repo: pr.base.repo ? {
              name: pr.base.repo.name,
              full_name: pr.base.repo.full_name,
              html_url: pr.base.repo.html_url
            } : null
          },
          draft: pr.draft,
          merged: pr.merged,
          mergeable: pr.mergeable,
          mergeable_state: pr.mergeable_state,
          merged_by: pr.merged_by ? {
            login: pr.merged_by.login,
            avatar_url: pr.merged_by.avatar_url,
            html_url: pr.merged_by.html_url
          } : null,
          merge_commit_sha: pr.merge_commit_sha,
          assignees: pr.assignees ? pr.assignees.map((assignee: any) => ({
            login: assignee.login,
            avatar_url: assignee.avatar_url,
            html_url: assignee.html_url
          })) : [],
          labels: pr.labels ? pr.labels.map((label: any) => ({
            id: typeof label === 'object' ? label.id : undefined,
            name: typeof label === 'object' ? label.name : label,
            color: typeof label === 'object' ? label.color : undefined
          })) : [],
          commits: pr.commits,
          additions: pr.additions,
          deletions: pr.deletions,
          changed_files: pr.changed_files,
          created_at: pr.created_at,
          updated_at: pr.updated_at,
          closed_at: pr.closed_at,
          merged_at: pr.merged_at,
          html_url: pr.html_url,
          url: pr.url
        })),
        `Found ${pullRequests.length} pull requests in ${validatedParams.owner}/${validatedParams.repo}`
      );
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Get detailed information about a specific pull request
   */
  async getPullRequest(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(PullRequestParamsSchema, params) as PullRequestParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo 
      });
      
      const pr = await this.client.getPullRequest(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.pull_number
      );
      
      return createSuccessResult({
        id: pr.id,
        number: pr.number,
        title: pr.title,
        body: pr.body,
        state: pr.state,
        user: pr.user ? {
          id: pr.user.id,
          login: pr.user.login,
          avatar_url: pr.user.avatar_url,
          html_url: pr.user.html_url,
          type: pr.user.type,
          site_admin: pr.user.site_admin
        } : null,
        head: {
          label: pr.head.label,
          ref: pr.head.ref,
          sha: pr.head.sha,
          user: pr.head.user ? {
            login: pr.head.user.login,
            avatar_url: pr.head.user.avatar_url,
            html_url: pr.head.user.html_url
          } : null,
          repo: pr.head.repo ? {
            id: pr.head.repo.id,
            name: pr.head.repo.name,
            full_name: pr.head.repo.full_name,
            html_url: pr.head.repo.html_url,
            clone_url: pr.head.repo.clone_url
          } : null
        },
        base: {
          label: pr.base.label,
          ref: pr.base.ref,
          sha: pr.base.sha,
          user: pr.base.user ? {
            login: pr.base.user.login,
            avatar_url: pr.base.user.avatar_url,
            html_url: pr.base.user.html_url
          } : null,
          repo: pr.base.repo ? {
            id: pr.base.repo.id,
            name: pr.base.repo.name,
            full_name: pr.base.repo.full_name,
            html_url: pr.base.repo.html_url,
            clone_url: pr.base.repo.clone_url
          } : null
        },
        draft: pr.draft,
        merged: pr.merged,
        mergeable: pr.mergeable,
        mergeable_state: pr.mergeable_state,
        merged_by: pr.merged_by ? {
          login: pr.merged_by.login,
          avatar_url: pr.merged_by.avatar_url,
          html_url: pr.merged_by.html_url
        } : null,
        merge_commit_sha: pr.merge_commit_sha,
        assignees: pr.assignees ? pr.assignees.map((assignee: any) => ({
          id: assignee.id,
          login: assignee.login,
          avatar_url: assignee.avatar_url,
          html_url: assignee.html_url,
          type: assignee.type
        })) : [],
        labels: pr.labels ? pr.labels.map((label: any) => ({
          id: typeof label === 'object' ? label.id : undefined,
          name: typeof label === 'object' ? label.name : label,
          description: typeof label === 'object' ? label.description : undefined,
          color: typeof label === 'object' ? label.color : undefined,
          default: typeof label === 'object' ? label.default : undefined
        })) : [],
        commits: pr.commits,
        additions: pr.additions,
        deletions: pr.deletions,
        changed_files: pr.changed_files,
        created_at: pr.created_at,
        updated_at: pr.updated_at,
        closed_at: pr.closed_at,
        merged_at: pr.merged_at,
        html_url: pr.html_url,
        url: pr.url
      }, `Pull Request #${pr.number}: ${pr.title}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Create a new pull request
   */
  async createPullRequest(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(CreatePullRequestParamsSchema, params) as CreatePullRequestParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo 
      });
      
      const pr = await this.client.createPullRequest(
        validatedParams.owner,
        validatedParams.repo,
        {
          title: validatedParams.title,
          head: validatedParams.head,
          base: validatedParams.base,
          body: validatedParams.body,
          maintainer_can_modify: validatedParams.maintainer_can_modify,
          draft: validatedParams.draft
        }
      );
      
      return createSuccessResult({
        id: pr.id,
        number: pr.number,
        title: pr.title,
        body: pr.body,
        state: pr.state,
        user: pr.user ? {
          login: pr.user.login,
          avatar_url: pr.user.avatar_url,
          html_url: pr.user.html_url
        } : null,
        head: {
          label: pr.head.label,
          ref: pr.head.ref,
          sha: pr.head.sha
        },
        base: {
          label: pr.base.label,
          ref: pr.base.ref,
          sha: pr.base.sha
        },
        draft: pr.draft,
        merged: pr.merged,
        created_at: pr.created_at,
        updated_at: pr.updated_at,
        html_url: pr.html_url,
        url: pr.url
      }, `Successfully created pull request #${pr.number}: ${pr.title}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Update an existing pull request
   */
  async updatePullRequest(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(UpdatePullRequestParamsSchema, params) as UpdatePullRequestParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo 
      });
      
      const pr = await this.client.updatePullRequest(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.pull_number,
        {
          title: validatedParams.title,
          body: validatedParams.body,
          state: validatedParams.state,
          base: validatedParams.base,
          maintainer_can_modify: validatedParams.maintainer_can_modify
        }
      );
      
      return createSuccessResult({
        id: pr.id,
        number: pr.number,
        title: pr.title,
        body: pr.body,
        state: pr.state,
        user: pr.user ? {
          login: pr.user.login,
          avatar_url: pr.user.avatar_url,
          html_url: pr.user.html_url
        } : null,
        head: {
          label: pr.head.label,
          ref: pr.head.ref,
          sha: pr.head.sha
        },
        base: {
          label: pr.base.label,
          ref: pr.base.ref,
          sha: pr.base.sha
        },
        draft: pr.draft,
        merged: pr.merged,
        created_at: pr.created_at,
        updated_at: pr.updated_at,
        html_url: pr.html_url,
        url: pr.url
      }, `Successfully updated pull request #${pr.number}: ${pr.title}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Merge a pull request
   */
  async mergePullRequest(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(MergePullRequestParamsSchema, params) as MergePullRequestParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo 
      });
      
      const result = await this.client.mergePullRequest(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.pull_number,
        {
          commit_title: validatedParams.commit_title,
          commit_message: validatedParams.commit_message,
          merge_method: validatedParams.merge_method
        }
      );
      
      return createSuccessResult({
        sha: result.sha,
        merged: result.merged,
        message: result.message
      }, `Successfully merged pull request #${validatedParams.pull_number}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Add a comment to a pull request
   */
  async addComment(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(CommentParamsSchema, params) as CommentParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo 
      });
      
      const comment = await this.client.createPullRequestComment(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.issue_number, // PR comments use issue_number
        validatedParams.body
      );
      
      return createSuccessResult({
        id: comment.id,
        body: comment.body,
        user: comment.user ? {
          login: comment.user.login,
          avatar_url: comment.user.avatar_url,
          html_url: comment.user.html_url
        } : null,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        html_url: comment.html_url,
        url: comment.url,
        author_association: comment.author_association
      }, `Successfully added comment to pull request #${validatedParams.issue_number}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }
}