import { z } from 'zod';
export interface McpToolResult {
    content: Array<{
        type: 'text' | 'image' | 'resource';
        text?: string;
        data?: string;
        mimeType?: string;
    }>;
    isError?: boolean;
}
export declare const RepositoryParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
}, {
    owner: string;
    repo: string;
}>;
export declare const ListRepositoriesParamsSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["all", "owner", "public", "private", "member"]>>;
    sort: z.ZodOptional<z.ZodEnum<["created", "updated", "pushed", "full_name"]>>;
    direction: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    per_page: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type?: "owner" | "all" | "public" | "private" | "member" | undefined;
    sort?: "created" | "updated" | "pushed" | "full_name" | undefined;
    direction?: "asc" | "desc" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
}, {
    type?: "owner" | "all" | "public" | "private" | "member" | undefined;
    sort?: "created" | "updated" | "pushed" | "full_name" | undefined;
    direction?: "asc" | "desc" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
}>;
export declare const CreateRepositoryParamsSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    private: z.ZodOptional<z.ZodBoolean>;
    has_issues: z.ZodOptional<z.ZodBoolean>;
    has_projects: z.ZodOptional<z.ZodBoolean>;
    has_wiki: z.ZodOptional<z.ZodBoolean>;
    auto_init: z.ZodOptional<z.ZodBoolean>;
    gitignore_template: z.ZodOptional<z.ZodString>;
    license_template: z.ZodOptional<z.ZodString>;
    homepage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    private?: boolean | undefined;
    description?: string | undefined;
    has_issues?: boolean | undefined;
    has_projects?: boolean | undefined;
    has_wiki?: boolean | undefined;
    auto_init?: boolean | undefined;
    gitignore_template?: string | undefined;
    license_template?: string | undefined;
    homepage?: string | undefined;
}, {
    name: string;
    private?: boolean | undefined;
    description?: string | undefined;
    has_issues?: boolean | undefined;
    has_projects?: boolean | undefined;
    has_wiki?: boolean | undefined;
    auto_init?: boolean | undefined;
    gitignore_template?: string | undefined;
    license_template?: string | undefined;
    homepage?: string | undefined;
}>;
export declare const IssueParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    issue_number: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    issue_number: number;
}, {
    owner: string;
    repo: string;
    issue_number: number;
}>;
export declare const ListIssuesParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "all"]>>;
    labels: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodEnum<["created", "updated", "comments"]>>;
    direction: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    since: z.ZodOptional<z.ZodString>;
    per_page: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    sort?: "created" | "updated" | "comments" | undefined;
    direction?: "asc" | "desc" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    state?: "all" | "open" | "closed" | undefined;
    labels?: string | undefined;
    since?: string | undefined;
}, {
    owner: string;
    repo: string;
    sort?: "created" | "updated" | "comments" | undefined;
    direction?: "asc" | "desc" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    state?: "all" | "open" | "closed" | undefined;
    labels?: string | undefined;
    since?: string | undefined;
}>;
export declare const CreateIssueParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    title: z.ZodString;
    body: z.ZodOptional<z.ZodString>;
    assignees: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    milestone: z.ZodOptional<z.ZodNumber>;
    labels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    title: string;
    labels?: string[] | undefined;
    body?: string | undefined;
    assignees?: string[] | undefined;
    milestone?: number | undefined;
}, {
    owner: string;
    repo: string;
    title: string;
    labels?: string[] | undefined;
    body?: string | undefined;
    assignees?: string[] | undefined;
    milestone?: number | undefined;
}>;
export declare const UpdateIssueParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    issue_number: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodEnum<["open", "closed"]>>;
    assignees: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    milestone: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    labels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    issue_number: number;
    state?: "open" | "closed" | undefined;
    labels?: string[] | undefined;
    title?: string | undefined;
    body?: string | undefined;
    assignees?: string[] | undefined;
    milestone?: number | null | undefined;
}, {
    owner: string;
    repo: string;
    issue_number: number;
    state?: "open" | "closed" | undefined;
    labels?: string[] | undefined;
    title?: string | undefined;
    body?: string | undefined;
    assignees?: string[] | undefined;
    milestone?: number | null | undefined;
}>;
export declare const PullRequestParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    pull_number: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    pull_number: number;
}, {
    owner: string;
    repo: string;
    pull_number: number;
}>;
export declare const ListPullRequestsParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    state: z.ZodOptional<z.ZodEnum<["open", "closed", "all"]>>;
    head: z.ZodOptional<z.ZodString>;
    base: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodEnum<["created", "updated", "popularity", "long-running"]>>;
    direction: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    per_page: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    sort?: "created" | "updated" | "popularity" | "long-running" | undefined;
    direction?: "asc" | "desc" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    state?: "all" | "open" | "closed" | undefined;
    head?: string | undefined;
    base?: string | undefined;
}, {
    owner: string;
    repo: string;
    sort?: "created" | "updated" | "popularity" | "long-running" | undefined;
    direction?: "asc" | "desc" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    state?: "all" | "open" | "closed" | undefined;
    head?: string | undefined;
    base?: string | undefined;
}>;
export declare const CreatePullRequestParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    title: z.ZodString;
    head: z.ZodString;
    base: z.ZodString;
    body: z.ZodOptional<z.ZodString>;
    maintainer_can_modify: z.ZodOptional<z.ZodBoolean>;
    draft: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    title: string;
    head: string;
    base: string;
    body?: string | undefined;
    maintainer_can_modify?: boolean | undefined;
    draft?: boolean | undefined;
}, {
    owner: string;
    repo: string;
    title: string;
    head: string;
    base: string;
    body?: string | undefined;
    maintainer_can_modify?: boolean | undefined;
    draft?: boolean | undefined;
}>;
export declare const UpdatePullRequestParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    pull_number: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodEnum<["open", "closed"]>>;
    base: z.ZodOptional<z.ZodString>;
    maintainer_can_modify: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    pull_number: number;
    state?: "open" | "closed" | undefined;
    title?: string | undefined;
    body?: string | undefined;
    base?: string | undefined;
    maintainer_can_modify?: boolean | undefined;
}, {
    owner: string;
    repo: string;
    pull_number: number;
    state?: "open" | "closed" | undefined;
    title?: string | undefined;
    body?: string | undefined;
    base?: string | undefined;
    maintainer_can_modify?: boolean | undefined;
}>;
export declare const MergePullRequestParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    pull_number: z.ZodNumber;
    commit_title: z.ZodOptional<z.ZodString>;
    commit_message: z.ZodOptional<z.ZodString>;
    merge_method: z.ZodOptional<z.ZodEnum<["merge", "squash", "rebase"]>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    pull_number: number;
    commit_title?: string | undefined;
    commit_message?: string | undefined;
    merge_method?: "merge" | "squash" | "rebase" | undefined;
}, {
    owner: string;
    repo: string;
    pull_number: number;
    commit_title?: string | undefined;
    commit_message?: string | undefined;
    merge_method?: "merge" | "squash" | "rebase" | undefined;
}>;
export declare const FileParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    path: z.ZodString;
    ref: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    path: string;
    ref?: string | undefined;
}, {
    owner: string;
    repo: string;
    path: string;
    ref?: string | undefined;
}>;
export declare const CreateFileParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    path: z.ZodString;
    message: z.ZodString;
    content: z.ZodString;
    branch: z.ZodOptional<z.ZodString>;
    committer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
    }, {
        name: string;
        email: string;
    }>>;
    author: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
    }, {
        name: string;
        email: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: string;
    branch?: string | undefined;
    committer?: {
        name: string;
        email: string;
    } | undefined;
    author?: {
        name: string;
        email: string;
    } | undefined;
}, {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: string;
    branch?: string | undefined;
    committer?: {
        name: string;
        email: string;
    } | undefined;
    author?: {
        name: string;
        email: string;
    } | undefined;
}>;
export declare const UpdateFileParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    path: z.ZodString;
    message: z.ZodString;
    content: z.ZodString;
    sha: z.ZodString;
    branch: z.ZodOptional<z.ZodString>;
    committer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
    }, {
        name: string;
        email: string;
    }>>;
    author: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
    }, {
        name: string;
        email: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: string;
    sha: string;
    branch?: string | undefined;
    committer?: {
        name: string;
        email: string;
    } | undefined;
    author?: {
        name: string;
        email: string;
    } | undefined;
}, {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: string;
    sha: string;
    branch?: string | undefined;
    committer?: {
        name: string;
        email: string;
    } | undefined;
    author?: {
        name: string;
        email: string;
    } | undefined;
}>;
export declare const DeleteFileParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    path: z.ZodString;
    message: z.ZodString;
    sha: z.ZodString;
    branch: z.ZodOptional<z.ZodString>;
    committer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
    }, {
        name: string;
        email: string;
    }>>;
    author: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
    }, {
        name: string;
        email: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    path: string;
    message: string;
    sha: string;
    branch?: string | undefined;
    committer?: {
        name: string;
        email: string;
    } | undefined;
    author?: {
        name: string;
        email: string;
    } | undefined;
}, {
    owner: string;
    repo: string;
    path: string;
    message: string;
    sha: string;
    branch?: string | undefined;
    committer?: {
        name: string;
        email: string;
    } | undefined;
    author?: {
        name: string;
        email: string;
    } | undefined;
}>;
export declare const ListContentsParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    path: z.ZodOptional<z.ZodString>;
    ref: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    path?: string | undefined;
    ref?: string | undefined;
}, {
    owner: string;
    repo: string;
    path?: string | undefined;
    ref?: string | undefined;
}>;
export declare const UserParamsSchema: z.ZodObject<{
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
}, {
    username: string;
}>;
export declare const OrganizationParamsSchema: z.ZodObject<{
    org: z.ZodString;
}, "strip", z.ZodTypeAny, {
    org: string;
}, {
    org: string;
}>;
export declare const SearchRepositoriesParamsSchema: z.ZodObject<{
    q: z.ZodString;
    sort: z.ZodOptional<z.ZodEnum<["stars", "forks", "help-wanted-issues", "updated"]>>;
    order: z.ZodOptional<z.ZodEnum<["desc", "asc"]>>;
    per_page: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    q: string;
    sort?: "updated" | "stars" | "forks" | "help-wanted-issues" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    order?: "asc" | "desc" | undefined;
}, {
    q: string;
    sort?: "updated" | "stars" | "forks" | "help-wanted-issues" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    order?: "asc" | "desc" | undefined;
}>;
export declare const SearchIssuesParamsSchema: z.ZodObject<{
    q: z.ZodString;
    sort: z.ZodOptional<z.ZodEnum<["comments", "reactions", "reactions-+1", "reactions--1", "reactions-smile", "reactions-thinking_face", "reactions-heart", "reactions-tada", "interactions", "created", "updated"]>>;
    order: z.ZodOptional<z.ZodEnum<["desc", "asc"]>>;
    per_page: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    q: string;
    sort?: "created" | "updated" | "comments" | "reactions" | "reactions-+1" | "reactions--1" | "reactions-smile" | "reactions-thinking_face" | "reactions-heart" | "reactions-tada" | "interactions" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    order?: "asc" | "desc" | undefined;
}, {
    q: string;
    sort?: "created" | "updated" | "comments" | "reactions" | "reactions-+1" | "reactions--1" | "reactions-smile" | "reactions-thinking_face" | "reactions-heart" | "reactions-tada" | "interactions" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    order?: "asc" | "desc" | undefined;
}>;
export declare const SearchCodeParamsSchema: z.ZodObject<{
    q: z.ZodString;
    sort: z.ZodOptional<z.ZodEnum<["indexed"]>>;
    order: z.ZodOptional<z.ZodEnum<["desc", "asc"]>>;
    per_page: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    q: string;
    sort?: "indexed" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    order?: "asc" | "desc" | undefined;
}, {
    q: string;
    sort?: "indexed" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    order?: "asc" | "desc" | undefined;
}>;
export declare const SearchUsersParamsSchema: z.ZodObject<{
    q: z.ZodString;
    sort: z.ZodOptional<z.ZodEnum<["followers", "repositories", "joined"]>>;
    order: z.ZodOptional<z.ZodEnum<["desc", "asc"]>>;
    per_page: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    q: string;
    sort?: "followers" | "repositories" | "joined" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    order?: "asc" | "desc" | undefined;
}, {
    q: string;
    sort?: "followers" | "repositories" | "joined" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
    order?: "asc" | "desc" | undefined;
}>;
export declare const CommentParamsSchema: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    issue_number: z.ZodNumber;
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    issue_number: number;
    body: string;
}, {
    owner: string;
    repo: string;
    issue_number: number;
    body: string;
}>;
export type RepositoryParams = z.infer<typeof RepositoryParamsSchema>;
export type ListRepositoriesParams = z.infer<typeof ListRepositoriesParamsSchema>;
export type CreateRepositoryParams = z.infer<typeof CreateRepositoryParamsSchema>;
export type IssueParams = z.infer<typeof IssueParamsSchema>;
export type ListIssuesParams = z.infer<typeof ListIssuesParamsSchema>;
export type CreateIssueParams = z.infer<typeof CreateIssueParamsSchema>;
export type UpdateIssueParams = z.infer<typeof UpdateIssueParamsSchema>;
export type PullRequestParams = z.infer<typeof PullRequestParamsSchema>;
export type ListPullRequestsParams = z.infer<typeof ListPullRequestsParamsSchema>;
export type CreatePullRequestParams = z.infer<typeof CreatePullRequestParamsSchema>;
export type UpdatePullRequestParams = z.infer<typeof UpdatePullRequestParamsSchema>;
export type MergePullRequestParams = z.infer<typeof MergePullRequestParamsSchema>;
export type FileParams = z.infer<typeof FileParamsSchema>;
export type CreateFileParams = z.infer<typeof CreateFileParamsSchema>;
export type UpdateFileParams = z.infer<typeof UpdateFileParamsSchema>;
export type DeleteFileParams = z.infer<typeof DeleteFileParamsSchema>;
export type ListContentsParams = z.infer<typeof ListContentsParamsSchema>;
export type UserParams = z.infer<typeof UserParamsSchema>;
export type OrganizationParams = z.infer<typeof OrganizationParamsSchema>;
export type SearchRepositoriesParams = z.infer<typeof SearchRepositoriesParamsSchema>;
export type SearchIssuesParams = z.infer<typeof SearchIssuesParamsSchema>;
export type SearchCodeParams = z.infer<typeof SearchCodeParamsSchema>;
export type SearchUsersParams = z.infer<typeof SearchUsersParamsSchema>;
export type CommentParams = z.infer<typeof CommentParamsSchema>;
//# sourceMappingURL=mcp.d.ts.map