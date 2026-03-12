import { GitHubClient } from '../github-client.js';
import { McpToolResult } from '../types/mcp.js';
import { 
  SearchRepositoriesParamsSchema,
  SearchIssuesParamsSchema,
  SearchCodeParamsSchema,
  SearchUsersParamsSchema,
  SearchRepositoriesParams,
  SearchIssuesParams,
  SearchCodeParams,
  SearchUsersParams
} from '../types/mcp.js';
import { validateParams, validateSearchQuery } from '../utils/validation.js';
import { handleGitHubError, createSuccessResult } from '../utils/error-handling.js';

export class SearchTools {
  constructor(private client: GitHubClient) {}

  /**
   * Search repositories
   */
  async searchRepositories(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(SearchRepositoriesParamsSchema, params) as SearchRepositoriesParams;
      validateSearchQuery(validatedParams.q);
      
      const searchResult = await this.client.searchRepositories({
        q: validatedParams.q,
        sort: validatedParams.sort,
        order: validatedParams.order,
        per_page: validatedParams.per_page,
        page: validatedParams.page
      });
      
      return createSuccessResult({
        total_count: searchResult.total_count,
        incomplete_results: searchResult.incomplete_results,
        items: searchResult.items.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          private: repo.private,
          fork: repo.fork,
          html_url: repo.html_url,
          clone_url: repo.clone_url,
          ssh_url: repo.ssh_url,
          language: repo.language,
          forks_count: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          watchers_count: repo.watchers_count,
          size: repo.size,
          default_branch: repo.default_branch,
          open_issues_count: repo.open_issues_count,
          topics: repo.topics || [],
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          owner: repo.owner ? {
            login: repo.owner.login,
            avatar_url: repo.owner.avatar_url,
            html_url: repo.owner.html_url,
            type: repo.owner.type
          } : null,
          score: repo.score
        }))
      }, `Found ${searchResult.total_count} repositories matching "${validatedParams.q}"`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Search issues and pull requests
   */
  async searchIssues(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(SearchIssuesParamsSchema, params) as SearchIssuesParams;
      validateSearchQuery(validatedParams.q);
      
      const searchResult = await this.client.searchIssues({
        q: validatedParams.q,
        sort: validatedParams.sort,
        order: validatedParams.order,
        per_page: validatedParams.per_page,
        page: validatedParams.page
      });
      
      return createSuccessResult({
        total_count: searchResult.total_count,
        incomplete_results: searchResult.incomplete_results,
        items: searchResult.items.map((issue: any) => ({
          id: issue.id,
          number: issue.number,
          title: issue.title,
          body: issue.body,
          state: issue.state,
          state_reason: issue.state_reason,
          user: issue.user ? {
            login: issue.user.login,
            avatar_url: issue.user.avatar_url,
            html_url: issue.user.html_url,
            type: issue.user.type
          } : null,
          labels: issue.labels ? issue.labels.map((label: any) => ({
            id: typeof label === 'object' ? label.id : undefined,
            name: typeof label === 'object' ? label.name : label,
            color: typeof label === 'object' ? label.color : undefined
          })) : [],
          assignee: issue.assignee ? {
            login: issue.assignee.login,
            avatar_url: issue.assignee.avatar_url,
            html_url: issue.assignee.html_url
          } : null,
          assignees: issue.assignees ? issue.assignees.map((assignee: any) => ({
            login: assignee.login,
            avatar_url: assignee.avatar_url,
            html_url: assignee.html_url
          })) : [],
          milestone: issue.milestone ? {
            id: issue.milestone.id,
            number: issue.milestone.number,
            title: issue.milestone.title,
            state: issue.milestone.state
          } : null,
          locked: issue.locked,
          comments: issue.comments,
          pull_request: issue.pull_request,
          closed_at: issue.closed_at,
          created_at: issue.created_at,
          updated_at: issue.updated_at,
          html_url: issue.html_url,
          url: issue.url,
          repository_url: issue.repository_url,
          score: issue.score
        }))
      }, `Found ${searchResult.total_count} issues/PRs matching "${validatedParams.q}"`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Search code
   */
  async searchCode(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(SearchCodeParamsSchema, params) as SearchCodeParams;
      validateSearchQuery(validatedParams.q);
      
      const searchResult = await this.client.searchCode({
        q: validatedParams.q,
        sort: validatedParams.sort,
        order: validatedParams.order,
        per_page: validatedParams.per_page,
        page: validatedParams.page
      });
      
      return createSuccessResult({
        total_count: searchResult.total_count,
        incomplete_results: searchResult.incomplete_results,
        items: searchResult.items.map((item: any) => ({
          name: item.name,
          path: item.path,
          sha: item.sha,
          url: item.url,
          git_url: item.git_url,
          html_url: item.html_url,
          repository: item.repository ? {
            id: item.repository.id,
            name: item.repository.name,
            full_name: item.repository.full_name,
            description: item.repository.description,
            html_url: item.repository.html_url,
            owner: item.repository.owner ? {
              login: item.repository.owner.login,
              avatar_url: item.repository.owner.avatar_url,
              html_url: item.repository.owner.html_url,
              type: item.repository.owner.type
            } : null
          } : null,
          score: item.score
        }))
      }, `Found ${searchResult.total_count} code results matching "${validatedParams.q}"`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Search users
   */
  async searchUsers(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(SearchUsersParamsSchema, params) as SearchUsersParams;
      validateSearchQuery(validatedParams.q);
      
      const searchResult = await this.client.searchUsers({
        q: validatedParams.q,
        sort: validatedParams.sort,
        order: validatedParams.order,
        per_page: validatedParams.per_page,
        page: validatedParams.page
      });
      
      return createSuccessResult({
        total_count: searchResult.total_count,
        incomplete_results: searchResult.incomplete_results,
        items: searchResult.items.map((user: any) => ({
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          gravatar_id: user.gravatar_id,
          url: user.url,
          html_url: user.html_url,
          followers_url: user.followers_url,
          following_url: user.following_url,
          gists_url: user.gists_url,
          starred_url: user.starred_url,
          subscriptions_url: user.subscriptions_url,
          organizations_url: user.organizations_url,
          repos_url: user.repos_url,
          events_url: user.events_url,
          received_events_url: user.received_events_url,
          type: user.type,
          site_admin: user.site_admin,
          score: user.score
        }))
      }, `Found ${searchResult.total_count} users matching "${validatedParams.q}"`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }
}