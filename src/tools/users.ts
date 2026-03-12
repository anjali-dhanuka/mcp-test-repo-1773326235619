import { GitHubClient } from '../github-client.js';
import { McpToolResult } from '../types/mcp.js';
import { 
  UserParamsSchema,
  OrganizationParamsSchema,
  UserParams,
  OrganizationParams
} from '../types/mcp.js';
import { validateParams, validateGitHubParams } from '../utils/validation.js';
import { handleGitHubError, createSuccessResult } from '../utils/error-handling.js';

export class UserTools {
  constructor(private client: GitHubClient) {}

  /**
   * Get user information
   */
  async getUser(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(UserParamsSchema, params) as UserParams;
      validateGitHubParams({ username: validatedParams.username });
      
      const user = await this.client.getUser(validatedParams.username);
      
      return createSuccessResult({
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
        name: user.name,
        company: user.company,
        blog: user.blog,
        location: user.location,
        email: user.email,
        hireable: user.hireable,
        bio: user.bio,
        twitter_username: user.twitter_username,
        public_repos: user.public_repos,
        public_gists: user.public_gists,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        updated_at: user.updated_at
      }, `User information for ${user.login}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Get authenticated user information
   */
  async getAuthenticatedUser(): Promise<McpToolResult> {
    try {
      const user = await this.client.getAuthenticatedUser();
      
      return createSuccessResult({
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
        name: user.name,
        company: user.company,
        blog: user.blog,
        location: user.location,
        email: user.email,
        hireable: user.hireable,
        bio: user.bio,
        twitter_username: user.twitter_username,
        public_repos: user.public_repos,
        public_gists: user.public_gists,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        updated_at: user.updated_at,
        private_gists: user.private_gists,
        total_private_repos: user.total_private_repos,
        owned_private_repos: user.owned_private_repos,
        disk_usage: user.disk_usage,
        collaborators: user.collaborators,
        two_factor_authentication: user.two_factor_authentication,
        plan: user.plan ? {
          name: user.plan.name,
          space: user.plan.space,
          private_repos: user.plan.private_repos,
          collaborators: user.plan.collaborators
        } : undefined
      }, `Authenticated user information for ${user.login}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Get organization information
   */
  async getOrganization(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(OrganizationParamsSchema, params) as OrganizationParams;
      validateGitHubParams({ org: validatedParams.org });
      
      const org = await this.client.getOrganization(validatedParams.org);
      
      return createSuccessResult({
        id: org.id,
        login: org.login,
        url: org.url,
        repos_url: org.repos_url,
        events_url: org.events_url,
        hooks_url: org.hooks_url,
        issues_url: org.issues_url,
        members_url: org.members_url,
        public_members_url: org.public_members_url,
        avatar_url: org.avatar_url,
        description: org.description,
        gravatar_id: org.gravatar_id,
        name: org.name,
        company: org.company,
        blog: org.blog,
        location: org.location,
        email: org.email,
        twitter_username: org.twitter_username,
        html_url: org.html_url,
        created_at: org.created_at,
        updated_at: org.updated_at,
        type: org.type,
        total_private_repos: org.total_private_repos,
        owned_private_repos: org.owned_private_repos,
        private_gists: org.private_gists,
        disk_usage: org.disk_usage,
        collaborators: org.collaborators,
        billing_email: org.billing_email,
        plan: org.plan ? {
          name: org.plan.name,
          space: org.plan.space,
          private_repos: org.plan.private_repos,
          filled_seats: org.plan.filled_seats,
          seats: org.plan.seats
        } : undefined,
        default_repository_permission: org.default_repository_permission,
        members_can_create_repositories: org.members_can_create_repositories,
        two_factor_requirement_enabled: org.two_factor_requirement_enabled,
        members_allowed_repository_creation_type: org.members_allowed_repository_creation_type,
        members_can_create_public_repositories: org.members_can_create_public_repositories,
        members_can_create_private_repositories: org.members_can_create_private_repositories,
        members_can_create_internal_repositories: org.members_can_create_internal_repositories,
        members_can_create_pages: org.members_can_create_pages,
        members_can_fork_private_repositories: org.members_can_fork_private_repositories
      }, `Organization information for ${org.login}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }
}