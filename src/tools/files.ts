import { GitHubClient } from '../github-client.js';
import { McpToolResult } from '../types/mcp.js';
import { 
  FileParamsSchema,
  CreateFileParamsSchema,
  UpdateFileParamsSchema,
  DeleteFileParamsSchema,
  FileParams,
  CreateFileParams,
  UpdateFileParams,
  DeleteFileParams
} from '../types/mcp.js';
import { validateParams, validateGitHubParams } from '../utils/validation.js';
import { handleGitHubError, createSuccessResult } from '../utils/error-handling.js';

export class FileTools {
  constructor(private client: GitHubClient) {}

  /**
   * Get file content from a repository
   */
  async getFileContent(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(FileParamsSchema, params) as FileParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo,
        path: validatedParams.path,
        ref: validatedParams.ref
      });
      
      const fileData = await this.client.getFileContent(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.path,
        validatedParams.ref
      );
      
      // Handle both single file and array response
      const file = Array.isArray(fileData) ? fileData[0] : fileData;
      
      if (file.type === 'file' && file.content) {
        // Decode base64 content
        const content = Buffer.from(file.content, 'base64').toString('utf-8');
        
        return createSuccessResult({
          name: file.name,
          path: file.path,
          sha: file.sha,
          size: file.size,
          type: file.type,
          content: content,
          encoding: file.encoding,
          url: file.url,
          html_url: file.html_url,
          git_url: file.git_url,
          download_url: file.download_url
        }, `File content for ${validatedParams.path} in ${validatedParams.owner}/${validatedParams.repo}`);
      } else {
        return createSuccessResult({
          name: file.name,
          path: file.path,
          sha: file.sha,
          size: file.size,
          type: file.type,
          url: file.url,
          html_url: file.html_url,
          git_url: file.git_url,
          download_url: file.download_url,
          message: file.type === 'dir' ? 'This is a directory, not a file' : 'File content not available'
        }, `Information for ${validatedParams.path} in ${validatedParams.owner}/${validatedParams.repo}`);
      }
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Create a new file in a repository
   */
  async createFile(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(CreateFileParamsSchema, params) as CreateFileParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo,
        path: validatedParams.path
      });
      
      // Encode content to base64
      const encodedContent = Buffer.from(validatedParams.content).toString('base64');
      
      const result = await this.client.createFile(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.path,
        {
          message: validatedParams.message,
          content: encodedContent,
          branch: validatedParams.branch,
          committer: validatedParams.committer,
          author: validatedParams.author
        }
      );
      
      return createSuccessResult({
        content: {
          name: result.content?.name,
          path: result.content?.path,
          sha: result.content?.sha,
          size: result.content?.size,
          url: result.content?.url,
          html_url: result.content?.html_url,
          git_url: result.content?.git_url,
          download_url: result.content?.download_url
        },
        commit: {
          sha: result.commit.sha,
          url: result.commit.url,
          html_url: result.commit.html_url,
          author: result.commit.author,
          committer: result.commit.committer,
          message: result.commit.message
        }
      }, `Successfully created file ${validatedParams.path} in ${validatedParams.owner}/${validatedParams.repo}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Update an existing file in a repository
   */
  async updateFile(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(UpdateFileParamsSchema, params) as UpdateFileParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo,
        path: validatedParams.path,
        sha: validatedParams.sha
      });
      
      // Encode content to base64
      const encodedContent = Buffer.from(validatedParams.content).toString('base64');
      
      const result = await this.client.updateFile(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.path,
        {
          message: validatedParams.message,
          content: encodedContent,
          sha: validatedParams.sha,
          branch: validatedParams.branch,
          committer: validatedParams.committer,
          author: validatedParams.author
        }
      );
      
      return createSuccessResult({
        content: {
          name: result.content?.name,
          path: result.content?.path,
          sha: result.content?.sha,
          size: result.content?.size,
          url: result.content?.url,
          html_url: result.content?.html_url,
          git_url: result.content?.git_url,
          download_url: result.content?.download_url
        },
        commit: {
          sha: result.commit.sha,
          url: result.commit.url,
          html_url: result.commit.html_url,
          author: result.commit.author,
          committer: result.commit.committer,
          message: result.commit.message
        }
      }, `Successfully updated file ${validatedParams.path} in ${validatedParams.owner}/${validatedParams.repo}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }

  /**
   * Delete a file from a repository
   */
  async deleteFile(params: unknown): Promise<McpToolResult> {
    try {
      const validatedParams = validateParams(DeleteFileParamsSchema, params) as DeleteFileParams;
      validateGitHubParams({ 
        owner: validatedParams.owner, 
        repo: validatedParams.repo,
        path: validatedParams.path,
        sha: validatedParams.sha
      });
      
      const result = await this.client.deleteFile(
        validatedParams.owner,
        validatedParams.repo,
        validatedParams.path,
        {
          message: validatedParams.message,
          sha: validatedParams.sha,
          branch: validatedParams.branch,
          committer: validatedParams.committer,
          author: validatedParams.author
        }
      );
      
      return createSuccessResult({
        content: result.content, // null for deleted files
        commit: {
          sha: result.commit.sha,
          url: result.commit.url,
          html_url: result.commit.html_url,
          author: result.commit.author,
          committer: result.commit.committer,
          message: result.commit.message
        }
      }, `Successfully deleted file ${validatedParams.path} from ${validatedParams.owner}/${validatedParams.repo}`);
    } catch (error) {
      return handleGitHubError(error);
    }
  }
}