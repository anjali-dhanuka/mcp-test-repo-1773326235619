import { GitHubClient } from '../github-client.js';
import { McpToolResult } from '../types/mcp.js';
import {
  RepositoryParamsSchema,
  ListRepositoriesParamsSchema,
  CreateRepositoryParamsSchema,
  ListContentsParamsSchema,
  RepositoryParams,
  ListRepositoriesParams,
  CreateRepositoryParams,
  ListContentsParams
} from '../types/mcp.js';
import { validateParams, validateGitHubParams } from '../utils/validation.js';
import { handleGitHubError, createSuccessResult } from '../utils/error-handling.js';
import { z } from 'zod';

export class RepositoryTools {
  constructor(private client: GitHubClient) {}

  /**
   * List repositories for the authenticated user
   */
  async listRepositories(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(ListRepositoriesParamsSchema, params);
      
      const repositories = await this.client.listRepositories(validatedParams);
      
      return createSuccessResult(
        repositories.map(repo => ({
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
          topics: repo.topics,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          owner: {
            login: repo.owner.login,
            avatar_url: repo.owner.avatar_url,
            html_url: repo.owner.html_url,
            type: repo.owner.type
          }
        })),
        `Found ${repositories.length} repositories`
      );
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Get detailed information about a specific repository
   */
  async getRepository(params: unknown): Promise<McpToolResult> {
    try {
      const { owner, repo } = validateParams(RepositoryParamsSchema, params);
      validateGitHubParams({ owner, repo });
      
      const repository = await this.client.getRepository(owner, repo);
      
      return createSuccessResult({
        id: repository.id,
        name: repository.name,
        full_name: repository.full_name,
        description: repository.description,
        private: repository.private,
        fork: repository.fork,
        html_url: repository.html_url,
        clone_url: repository.clone_url,
        ssh_url: repository.ssh_url,
        git_url: repository.git_url,
        homepage: repository.homepage,
        language: repository.language,
        forks_count: repository.forks_count,
        stargazers_count: repository.stargazers_count,
        watchers_count: repository.watchers_count,
        size: repository.size,
        default_branch: repository.default_branch,
        open_issues_count: repository.open_issues_count,
        topics: repository.topics,
        has_issues: repository.has_issues,
        has_projects: repository.has_projects,
        has_wiki: repository.has_wiki,
        has_pages: repository.has_pages,
        has_downloads: repository.has_downloads,
        archived: repository.archived,
        disabled: repository.disabled,
        visibility: repository.visibility,
        created_at: repository.created_at,
        updated_at: repository.updated_at,
        pushed_at: repository.pushed_at,
        permissions: repository.permissions,
        owner: {
          id: repository.owner.id,
          login: repository.owner.login,
          avatar_url: repository.owner.avatar_url,
          html_url: repository.owner.html_url,
          type: repository.owner.type,
          site_admin: repository.owner.site_admin
        }
      }, `Repository information for ${repository.full_name}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Create a new repository
   */
  async createRepository(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(CreateRepositoryParamsSchema, params);
      validateGitHubParams({ repo: validatedParams.name });
      
      const repository = await this.client.createRepository(validatedParams);
      
      return createSuccessResult({
        id: repository.id,
        name: repository.name,
        full_name: repository.full_name,
        description: repository.description,
        private: repository.private,
        html_url: repository.html_url,
        clone_url: repository.clone_url,
        ssh_url: repository.ssh_url,
        git_url: repository.git_url,
        default_branch: repository.default_branch,
        created_at: repository.created_at,
        owner: {
          login: repository.owner.login,
          html_url: repository.owner.html_url,
          type: repository.owner.type
        }
      }, `Successfully created repository: ${repository.full_name}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Get repository clone URLs
   */
  async getRepositoryCloneUrls(params: unknown): Promise<McpToolResult> {
    try {
      const { owner, repo } = validateParams(RepositoryParamsSchema, params);
      validateGitHubParams({ owner, repo });
      
      const repository = await this.client.getRepository(owner, repo);
      
      return createSuccessResult({
        repository: repository.full_name,
        clone_urls: {
          https: repository.clone_url,
          ssh: repository.ssh_url,
          git: repository.git_url
        },
        default_branch: repository.default_branch
      }, `Clone URLs for ${repository.full_name}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * List repository contents (files and directories)
   */
  async listRepositoryContents(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(ListContentsParamsSchema, params);
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo,
        path: validatedParams.path,
        ref: validatedParams.ref
      });
      
      const contents = await this.client.getFileContent(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.path || '',
        validatedParams.ref
      );
      
      // Handle both single file and directory listing
      const items = Array.isArray(contents) ? contents : [contents];
      
      return createSuccessResult(
        items.map(item => ({
          name: item.name,
          path: item.path,
          type: item.type,
          size: item.size,
          sha: item.sha,
          url: item.url,
          html_url: item.html_url,
          download_url: item.download_url
        })),
        `Contents of ${validatedParams.owner}/${validatedParams.repo}${validatedParams.path ? `/${validatedParams.path}` : ''}`
      );
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Get repository statistics and insights
   */
  async getRepositoryStats(params: unknown): Promise<McpToolResult> {
    try {
      const { owner, repo } = validateParams(RepositoryParamsSchema, params);
      validateGitHubParams({ owner, repo });
      
      const repository = await this.client.getRepository(owner, repo);
      
      return createSuccessResult({
        repository: repository.full_name,
        statistics: {
          stars: repository.stargazers_count,
          forks: repository.forks_count,
          watchers: repository.watchers_count,
          open_issues: repository.open_issues_count,
          size_kb: repository.size,
          language: repository.language,
          topics: repository.topics,
          created: repository.created_at,
          last_updated: repository.updated_at,
          last_pushed: repository.pushed_at
        },
        features: {
          has_issues: repository.has_issues,
          has_projects: repository.has_projects,
          has_wiki: repository.has_wiki,
          has_pages: repository.has_pages,
          has_downloads: repository.has_downloads
        },
        status: {
          private: repository.private,
          fork: repository.fork,
          archived: repository.archived,
          disabled: repository.disabled,
          visibility: repository.visibility
        }
      }, `Statistics for ${repository.full_name}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * List user's repositories (for a specific user, not authenticated user)
   */
  async listUserRepositories(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(
        ListRepositoriesParamsSchema.extend({
          username: require('zod').string().describe('GitHub username')
        }),
        params
      );
      validateGitHubParams({ username: validatedParams.username });
      
      const repositories = await this.client.listUserRepositories(
        validatedParams.username,
        {
          type: validatedParams.type,
          sort: validatedParams.sort,
          direction: validatedParams.direction,
          per_page: validatedParams.per_page,
          page: validatedParams.page
        }
      );
      
      return createSuccessResult(
        repositories.map(repo => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          private: repo.private,
          fork: repo.fork,
          html_url: repo.html_url,
          clone_url: repo.clone_url,
          language: repo.language,
          forks_count: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          watchers_count: repo.watchers_count,
          size: repo.size,
          default_branch: repo.default_branch,
          open_issues_count: repo.open_issues_count,
          topics: repo.topics,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at
        })),
        `Found ${repositories.length} repositories for user ${validatedParams.username}`
      );
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * List organization repositories
   */
  async listOrganizationRepositories(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(
        ListRepositoriesParamsSchema.extend({
          org: require('zod').string().describe('Organization name')
        }),
        params
      );
      validateGitHubParams({ org: validatedParams.org });
      
      const repositories = await this.client.listOrganizationRepositories(
        validatedParams.org,
        {
          type: validatedParams.type as any,
          sort: validatedParams.sort,
          direction: validatedParams.direction,
          per_page: validatedParams.per_page,
          page: validatedParams.page
        }
      );
      
      return createSuccessResult(
        repositories.map(repo => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          private: repo.private,
          fork: repo.fork,
          html_url: repo.html_url,
          clone_url: repo.clone_url,
          language: repo.language,
          forks_count: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          watchers_count: repo.watchers_count,
          size: repo.size,
          default_branch: repo.default_branch,
          open_issues_count: repo.open_issues_count,
          topics: repo.topics,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          owner: {
            login: repo.owner.login,
            avatar_url: repo.owner.avatar_url,
            html_url: repo.owner.html_url,
            type: repo.owner.type
          }
        })),
        `Found ${repositories.length} repositories for organization ${validatedParams.org}`
      );
    } catch (error) {
      return handleGitHubError(error);
    }
  }
}