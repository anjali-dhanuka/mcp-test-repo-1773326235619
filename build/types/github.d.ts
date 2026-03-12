export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    private: boolean;
    fork: boolean;
    html_url: string;
    clone_url: string;
    ssh_url: string;
    git_url: string;
    homepage: string | null;
    language: string | null;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    size: number;
    default_branch: string;
    open_issues_count: number;
    topics: string[];
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_downloads: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    pushed_at: string | null;
    created_at: string;
    updated_at: string;
    permissions?: {
        admin: boolean;
        maintain: boolean;
        push: boolean;
        triage: boolean;
        pull: boolean;
    };
    owner: GitHubUser;
}
export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name?: string | null;
    company?: string | null;
    blog?: string | null;
    location?: string | null;
    email?: string | null;
    hireable?: boolean | null;
    bio?: string | null;
    twitter_username?: string | null;
    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    created_at?: string;
    updated_at?: string;
}
export interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body: string | null;
    state: 'open' | 'closed';
    state_reason: string | null;
    user: GitHubUser;
    labels: GitHubLabel[];
    assignee: GitHubUser | null;
    assignees: GitHubUser[];
    milestone: GitHubMilestone | null;
    locked: boolean;
    active_lock_reason: string | null;
    comments: number;
    pull_request?: {
        url: string;
        html_url: string;
        diff_url: string;
        patch_url: string;
    };
    closed_at: string | null;
    created_at: string;
    updated_at: string;
    closed_by: GitHubUser | null;
    author_association: string;
    draft?: boolean;
    html_url: string;
    url: string;
    repository?: GitHubRepository;
}
export interface GitHubPullRequest {
    id: number;
    number: number;
    title: string;
    body: string | null;
    state: 'open' | 'closed' | 'merged';
    user: GitHubUser;
    head: {
        label: string;
        ref: string;
        sha: string;
        user: GitHubUser;
        repo: GitHubRepository;
    };
    base: {
        label: string;
        ref: string;
        sha: string;
        user: GitHubUser;
        repo: GitHubRepository;
    };
    draft: boolean;
    merged: boolean;
    mergeable: boolean | null;
    mergeable_state: string;
    merged_by: GitHubUser | null;
    merge_commit_sha: string | null;
    assignee: GitHubUser | null;
    assignees: GitHubUser[];
    requested_reviewers: GitHubUser[];
    labels: GitHubLabel[];
    milestone: GitHubMilestone | null;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
    html_url: string;
    url: string;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    merged_at: string | null;
}
export interface GitHubLabel {
    id: number;
    name: string;
    description: string | null;
    color: string;
    default: boolean;
}
export interface GitHubMilestone {
    id: number;
    number: number;
    title: string;
    description: string | null;
    state: 'open' | 'closed';
    creator: GitHubUser;
    open_issues: number;
    closed_issues: number;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    due_on: string | null;
}
export interface GitHubComment {
    id: number;
    body: string;
    user: GitHubUser;
    created_at: string;
    updated_at: string;
    html_url: string;
    url: string;
    author_association: string;
}
export interface GitHubFile {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    type: 'file' | 'dir';
    content?: string;
    encoding?: string;
}
export interface GitHubOrganization {
    id: number;
    login: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string | null;
    gravatar_id: string | null;
    name?: string | null;
    company?: string | null;
    blog?: string | null;
    location?: string | null;
    email?: string | null;
    twitter_username?: string | null;
    html_url: string;
    created_at?: string;
    updated_at?: string;
    type: string;
    total_private_repos?: number;
    owned_private_repos?: number;
    private_gists?: number;
    disk_usage?: number;
    collaborators?: number;
    billing_email?: string | null;
    plan?: {
        name: string;
        space: number;
        private_repos: number;
        filled_seats: number;
        seats: number;
    };
    default_repository_permission?: string;
    members_can_create_repositories?: boolean;
    two_factor_requirement_enabled?: boolean;
    members_allowed_repository_creation_type?: string;
    members_can_create_public_repositories?: boolean;
    members_can_create_private_repositories?: boolean;
    members_can_create_internal_repositories?: boolean;
    members_can_create_pages?: boolean;
    members_can_fork_private_repositories?: boolean;
}
export interface GitHubSearchResult<T> {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
}
export interface GitHubError {
    message: string;
    documentation_url?: string;
    errors?: Array<{
        resource: string;
        field: string;
        code: string;
    }>;
}
export interface PaginationParams {
    page?: number;
    per_page?: number;
}
export interface RepositoryFilters extends PaginationParams {
    visibility?: 'all' | 'public' | 'private';
    affiliation?: 'owner' | 'collaborator' | 'organization_member';
    type?: 'all' | 'owner' | 'public' | 'private' | 'member';
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
}
export interface IssueFilters extends PaginationParams {
    state?: 'open' | 'closed' | 'all';
    labels?: string;
    sort?: 'created' | 'updated' | 'comments';
    direction?: 'asc' | 'desc';
    since?: string;
    assignee?: string;
    creator?: string;
    mentioned?: string;
    milestone?: string | number;
}
export interface PullRequestFilters extends PaginationParams {
    state?: 'open' | 'closed' | 'all';
    head?: string;
    base?: string;
    sort?: 'created' | 'updated' | 'popularity' | 'long-running';
    direction?: 'asc' | 'desc';
}
//# sourceMappingURL=github.d.ts.map