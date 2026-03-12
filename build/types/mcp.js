import { z } from 'zod';
// Validation schemas for tool parameters
export const RepositoryParamsSchema = z.object({
    owner: z.string().describe('Repository owner (username or organization)'),
    repo: z.string().describe('Repository name'),
});
export const ListRepositoriesParamsSchema = z.object({
    type: z.enum(['all', 'owner', 'public', 'private', 'member']).optional().describe('Repository type filter'),
    sort: z.enum(['created', 'updated', 'pushed', 'full_name']).optional().describe('Sort repositories by'),
    direction: z.enum(['asc', 'desc']).optional().describe('Sort direction'),
    per_page: z.number().min(1).max(100).optional().describe('Number of results per page (1-100)'),
    page: z.number().min(1).optional().describe('Page number'),
});
export const CreateRepositoryParamsSchema = z.object({
    name: z.string().describe('Repository name'),
    description: z.string().optional().describe('Repository description'),
    private: z.boolean().optional().describe('Whether the repository is private'),
    has_issues: z.boolean().optional().describe('Whether issues are enabled'),
    has_projects: z.boolean().optional().describe('Whether projects are enabled'),
    has_wiki: z.boolean().optional().describe('Whether wiki is enabled'),
    auto_init: z.boolean().optional().describe('Whether to initialize with README'),
    gitignore_template: z.string().optional().describe('Gitignore template to use'),
    license_template: z.string().optional().describe('License template to use'),
    homepage: z.string().optional().describe('Repository homepage URL'),
});
export const IssueParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    issue_number: z.number().describe('Issue number'),
});
export const ListIssuesParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    state: z.enum(['open', 'closed', 'all']).optional().describe('Issue state filter'),
    labels: z.string().optional().describe('Comma-separated list of label names'),
    sort: z.enum(['created', 'updated', 'comments']).optional().describe('Sort issues by'),
    direction: z.enum(['asc', 'desc']).optional().describe('Sort direction'),
    since: z.string().optional().describe('Only issues updated after this time (ISO 8601)'),
    per_page: z.number().min(1).max(100).optional().describe('Number of results per page (1-100)'),
    page: z.number().min(1).optional().describe('Page number'),
});
export const CreateIssueParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    title: z.string().describe('Issue title'),
    body: z.string().optional().describe('Issue body/description'),
    assignees: z.array(z.string()).optional().describe('Array of usernames to assign'),
    milestone: z.number().optional().describe('Milestone number'),
    labels: z.array(z.string()).optional().describe('Array of label names'),
});
export const UpdateIssueParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    issue_number: z.number().describe('Issue number'),
    title: z.string().optional().describe('Issue title'),
    body: z.string().optional().describe('Issue body/description'),
    state: z.enum(['open', 'closed']).optional().describe('Issue state'),
    assignees: z.array(z.string()).optional().describe('Array of usernames to assign'),
    milestone: z.number().nullable().optional().describe('Milestone number (null to remove)'),
    labels: z.array(z.string()).optional().describe('Array of label names'),
});
export const PullRequestParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    pull_number: z.number().describe('Pull request number'),
});
export const ListPullRequestsParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    state: z.enum(['open', 'closed', 'all']).optional().describe('Pull request state filter'),
    head: z.string().optional().describe('Filter by head branch (user:ref-name or organization:ref-name)'),
    base: z.string().optional().describe('Filter by base branch'),
    sort: z.enum(['created', 'updated', 'popularity', 'long-running']).optional().describe('Sort pull requests by'),
    direction: z.enum(['asc', 'desc']).optional().describe('Sort direction'),
    per_page: z.number().min(1).max(100).optional().describe('Number of results per page (1-100)'),
    page: z.number().min(1).optional().describe('Page number'),
});
export const CreatePullRequestParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    title: z.string().describe('Pull request title'),
    head: z.string().describe('Branch where changes are implemented (user:ref-name or organization:ref-name)'),
    base: z.string().describe('Branch you want changes pulled into'),
    body: z.string().optional().describe('Pull request body/description'),
    maintainer_can_modify: z.boolean().optional().describe('Whether maintainers can modify the pull request'),
    draft: z.boolean().optional().describe('Whether to create as draft pull request'),
});
export const UpdatePullRequestParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    pull_number: z.number().describe('Pull request number'),
    title: z.string().optional().describe('Pull request title'),
    body: z.string().optional().describe('Pull request body/description'),
    state: z.enum(['open', 'closed']).optional().describe('Pull request state'),
    base: z.string().optional().describe('Base branch'),
    maintainer_can_modify: z.boolean().optional().describe('Whether maintainers can modify the pull request'),
});
export const MergePullRequestParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    pull_number: z.number().describe('Pull request number'),
    commit_title: z.string().optional().describe('Title for the merge commit'),
    commit_message: z.string().optional().describe('Extra detail for the merge commit'),
    merge_method: z.enum(['merge', 'squash', 'rebase']).optional().describe('Merge method to use'),
});
export const FileParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    path: z.string().describe('File path'),
    ref: z.string().optional().describe('Branch, tag, or commit SHA (defaults to default branch)'),
});
export const CreateFileParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    path: z.string().describe('File path'),
    message: z.string().describe('Commit message'),
    content: z.string().describe('File content (base64 encoded)'),
    branch: z.string().optional().describe('Branch name (defaults to default branch)'),
    committer: z.object({
        name: z.string(),
        email: z.string(),
    }).optional().describe('Committer information'),
    author: z.object({
        name: z.string(),
        email: z.string(),
    }).optional().describe('Author information'),
});
export const UpdateFileParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    path: z.string().describe('File path'),
    message: z.string().describe('Commit message'),
    content: z.string().describe('File content (base64 encoded)'),
    sha: z.string().describe('SHA of the file being replaced'),
    branch: z.string().optional().describe('Branch name (defaults to default branch)'),
    committer: z.object({
        name: z.string(),
        email: z.string(),
    }).optional().describe('Committer information'),
    author: z.object({
        name: z.string(),
        email: z.string(),
    }).optional().describe('Author information'),
});
export const DeleteFileParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    path: z.string().describe('File path'),
    message: z.string().describe('Commit message'),
    sha: z.string().describe('SHA of the file being deleted'),
    branch: z.string().optional().describe('Branch name (defaults to default branch)'),
    committer: z.object({
        name: z.string(),
        email: z.string(),
    }).optional().describe('Committer information'),
    author: z.object({
        name: z.string(),
        email: z.string(),
    }).optional().describe('Author information'),
});
export const ListContentsParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    path: z.string().optional().describe('Directory path (defaults to root)'),
    ref: z.string().optional().describe('Branch, tag, or commit SHA (defaults to default branch)'),
});
export const UserParamsSchema = z.object({
    username: z.string().describe('GitHub username'),
});
export const OrganizationParamsSchema = z.object({
    org: z.string().describe('Organization name'),
});
export const SearchRepositoriesParamsSchema = z.object({
    q: z.string().describe('Search query'),
    sort: z.enum(['stars', 'forks', 'help-wanted-issues', 'updated']).optional().describe('Sort repositories by'),
    order: z.enum(['desc', 'asc']).optional().describe('Sort order'),
    per_page: z.number().min(1).max(100).optional().describe('Number of results per page (1-100)'),
    page: z.number().min(1).optional().describe('Page number'),
});
export const SearchIssuesParamsSchema = z.object({
    q: z.string().describe('Search query'),
    sort: z.enum(['comments', 'reactions', 'reactions-+1', 'reactions--1', 'reactions-smile', 'reactions-thinking_face', 'reactions-heart', 'reactions-tada', 'interactions', 'created', 'updated']).optional().describe('Sort issues by'),
    order: z.enum(['desc', 'asc']).optional().describe('Sort order'),
    per_page: z.number().min(1).max(100).optional().describe('Number of results per page (1-100)'),
    page: z.number().min(1).optional().describe('Page number'),
});
export const SearchCodeParamsSchema = z.object({
    q: z.string().describe('Search query'),
    sort: z.enum(['indexed']).optional().describe('Sort code by'),
    order: z.enum(['desc', 'asc']).optional().describe('Sort order'),
    per_page: z.number().min(1).max(100).optional().describe('Number of results per page (1-100)'),
    page: z.number().min(1).optional().describe('Page number'),
});
export const SearchUsersParamsSchema = z.object({
    q: z.string().describe('Search query'),
    sort: z.enum(['followers', 'repositories', 'joined']).optional().describe('Sort users by'),
    order: z.enum(['desc', 'asc']).optional().describe('Sort order'),
    per_page: z.number().min(1).max(100).optional().describe('Number of results per page (1-100)'),
    page: z.number().min(1).optional().describe('Page number'),
});
export const CommentParamsSchema = z.object({
    owner: z.string().describe('Repository owner'),
    repo: z.string().describe('Repository name'),
    issue_number: z.number().describe('Issue or pull request number'),
    body: z.string().describe('Comment body'),
});
//# sourceMappingURL=mcp.js.map