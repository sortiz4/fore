export enum FileType {
  Image,
  Video,
  Unknown,
}

interface ApiBaseContentAlpha {
  readonly boardFlag?: string;
  readonly com?: string;
  readonly country?: string;
  readonly countryName?: string;
  readonly ext?: '.gif' | '.jpg' | '.pdf' | '.png' | '.swf' | '.webm';
  readonly filename?: string;
  readonly flagName?: string;
  readonly fsize?: number;
  readonly h?: number;
  readonly md5?: string;
  readonly mImg?: 1;
  readonly name: string;
  readonly no: number;
  readonly now: string;
  readonly resto: number;
  readonly tim?: number;
  readonly time: number;
  readonly tnH?: number;
  readonly tnW?: number;
  readonly trip?: string;
  readonly w?: number;
}

interface ApiBaseContentBravo {
  readonly bumplimit?: 1;
  readonly capcode?: string;
  readonly closed?: 1;
  readonly customSpoiler?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  readonly filedeleted?: 1;
  readonly id?: string;
  readonly imagelimit?: 1;
  readonly images?: number;
  readonly replies?: number;
  readonly semanticUrl?: string;
  readonly since4pass?: number;
  readonly spoiler?: 1;
  readonly sticky?: 1;
  readonly sub?: string;
  readonly tag?: string;
  readonly uniqueIps?: number;
}

interface ApiBaseContentCharlie {
  readonly lastModified?: number;
  readonly omittedImages?: number;
  readonly omittedPosts?: number;
}

interface ApiBaseContentDelta {
  readonly tailSize?: number;
}

interface ApiBoard {
  readonly board: string;
  readonly boardFlags?: Readonly<{ [key: string]: string }>;
  readonly bumpLimit: number;
  readonly codeTags?: 0 | 1;
  readonly cooldowns: ApiCooldowns;
  readonly countryFlags?: 0 | 1;
  readonly customSpoilers?: number;
  readonly forcedAnon?: 0 | 1;
  readonly imageLimit: number;
  readonly isArchived?: 0 | 1;
  readonly mathTags?: 0 | 1;
  readonly maxCommentChars: number;
  readonly maxFilesize: number;
  readonly maxWebmDuration: number;
  readonly maxWebmFilesize: number;
  readonly metaDescription: string;
  readonly minImageHeight?: number;
  readonly minImageWidth?: number;
  readonly oekaki?: 0 | 1;
  readonly pages: number;
  readonly perPage: number;
  readonly requireSubject?: 0 | 1;
  readonly sjisTags?: 0 | 1;
  readonly spoilers?: 0 | 1;
  readonly textOnly?: 0 | 1;
  readonly title: string;
  readonly userIds?: 0 | 1;
  readonly webmAudio?: 0 | 1;
  readonly wsBoard: 0 | 1;
}

interface ApiCooldowns {
  readonly images: number;
  readonly replies: number;
  readonly threads: number;
}

export interface ApiGetBoards {
  readonly boards: ApiBoard[];
}

export interface ApiGetCatalog {
  readonly page: number;
  readonly threads: ApiThread[];
}

export interface ApiGetIndices {
  readonly threads: ApiIndexThread[];
}

export interface ApiGetPosts {
  readonly posts: ApiThreadPost[];
}

export interface ApiGetThreads {
  readonly page: number;
  readonly threads: ApiThreadMetadata[];
}

interface ApiIndexPost extends ApiBaseContentAlpha, ApiBaseContentBravo, ApiBaseContentCharlie, ApiBaseContentDelta {
}

interface ApiIndexThread {
  readonly posts: ApiIndexPost[];
}

interface ApiThread extends ApiBaseContentAlpha, ApiBaseContentBravo, ApiBaseContentCharlie {
  readonly lastReplies?: ApiThreadReply[];
}

interface ApiThreadMetadata {
  readonly lastModified: number;
  readonly no: number;
  readonly replies: number;
}

interface ApiThreadPost extends ApiBaseContentAlpha, ApiBaseContentBravo, ApiBaseContentDelta {
  readonly archived?: 1;
  readonly archivedOn?: number;
}

interface ApiThreadReply extends ApiBaseContentAlpha {
  readonly id: string;
}

export interface Board {
  readonly description: string;
  readonly name: string;
  readonly path: string;
  readonly title: string;
}

export interface Content {
  readonly fileCanBePreviewed: boolean;
  readonly fileName: string;
  readonly fileThumbnail: string;
  readonly fileType: FileType;
  readonly fileUrl: string;
  readonly id: number;
  readonly link: string;
  readonly name: string;
  readonly replyCount: number;
  readonly replyText: string;
  readonly text: string;
  readonly time: number;
}

export interface Post extends Content {
  readonly replies: Post[];
}

export interface Thread extends Content {
  readonly title: string;
}

function getFileName(name: string, extension: string): string {
  return `${name}${extension}`;
}

function getFileThumbnail(id: number, board: string): string {
  return `${getUrl()}/${board}/${id}s.jpg`;
}

function getFileType(extension: string): FileType {
  switch (extension) {
    case '.gif':
    case '.jpeg':
    case '.jpg':
    case '.png':
    case '.webp':
      return FileType.Image;
    case '.mp4':
    case '.webm':
      return FileType.Video;
  }
  return FileType.Unknown;
}

function getFileUrl(id: number, board: string, extension: string): string {
  return `${getUrl()}/${board}/${id}${extension}`;
}

function getLink(id: number): string {
  return `p${id}`;
}

function getPostReplies(posts: Post[], id: number): Post[] {
  return posts.filter(p => !!p.text ? p.text.includes(`${id}`) : false);
}

function getReplyText(replies: number): string {
  return `${replies} ${replies === 1 ? 'reply' : 'replies'}`;
}

function getTitle(title: string, id: number): string {
  return title ?? `No. ${id}`;
}

function getUrl(): string {
  return 'https://i.4cdn.org';
}

export function mapApiBoardToBoard(board: ApiBoard): Board {
  return {
    description: board.metaDescription,
    name: board.title,
    path: board.board,
    title: `/${board.board}/ - ${board.title}`,
  }
}

export function mapApiPostToPost(board: string, post: ApiIndexPost | ApiThreadPost): Post {
  const fileType = getFileType(post.ext);
  return {
    fileCanBePreviewed: fileType !== FileType.Unknown,
    fileName: getFileName(post.filename, post.ext),
    fileThumbnail: getFileThumbnail(post.tim, board),
    fileType,
    fileUrl: getFileUrl(post.tim, board, post.ext),
    id: post.no,
    link: getLink(post.no),
    name: post.name,
    replies: null,
    replyCount: post.replies,
    replyText: getReplyText(post.replies),
    text: post.com,
    time: post.tim,
  }
}

export function mapApiThreadToThread(board: string, thread: ApiThread): Thread {
  const fileType = getFileType(thread.ext);
  return {
    fileCanBePreviewed: fileType !== FileType.Unknown,
    fileName: getFileName(thread.filename, thread.ext),
    fileThumbnail: getFileThumbnail(thread.tim, board),
    fileType,
    fileUrl: getFileUrl(thread.tim, board, thread.ext),
    id: thread.no,
    link: getLink(thread.no),
    name: thread.name,
    replyCount: thread.replies,
    replyText: getReplyText(thread.replies),
    text: thread.com,
    time: thread.tim,
    title: getTitle(thread.sub, thread.no),
  }
}

export function updatePostsWithReplies(posts: Post[]): Post[] {
  for (const post of posts) {
    const replies = getPostReplies(posts, post.id);
    Object.assign(post, { replies, replyCount: replies.length, replyText: getReplyText(replies.length) });
  }
  return posts;
}
