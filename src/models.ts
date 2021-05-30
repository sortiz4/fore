export enum FileType {
  Image,
  Video,
  Unknown,
}

export interface ApiBaseContentAlpha {
  boardFlag?: string;
  com?: string;
  country?: string;
  countryName?: string;
  ext?: '.gif' | '.jpg' | '.pdf' | '.png' | '.swf' | '.webm';
  filename?: string;
  flagName?: string;
  fsize?: number;
  h?: number;
  md5?: string;
  mImg?: 1;
  name: string;
  no: number;
  now: string;
  resto: number;
  tim?: number;
  time: number;
  tnH?: number;
  tnW?: number;
  trip?: string;
  w?: number;
}

export interface ApiBaseContentBravo {
  bumplimit?: 1;
  capcode?: string;
  closed?: 1;
  customSpoiler?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  filedeleted?: 1;
  id?: string;
  imagelimit?: 1;
  images?: number;
  replies?: number;
  semanticUrl?: string;
  since4pass?: number;
  spoiler?: 1;
  sticky?: 1;
  sub?: string;
  tag?: string;
  uniqueIps?: number;
}

export interface ApiBaseContentCharlie {
  lastModified?: number;
  omittedImages?: number;
  omittedPosts?: number;
}

export interface ApiBaseContentDelta {
  tailSize?: number;
}

export interface ApiBoard {
  board: string;
  boardFlags?: { [key: string]: string };
  bumpLimit: number;
  codeTags?: 0 | 1;
  cooldowns: ApiCooldowns;
  countryFlags?: 0 | 1;
  customSpoilers?: number;
  forcedAnon?: 0 | 1;
  imageLimit: number;
  isArchived?: 0 | 1;
  mathTags?: 0 | 1;
  maxCommentChars: number;
  maxFilesize: number;
  maxWebmDuration: number;
  maxWebmFilesize: number;
  metaDescription: string;
  minImageHeight?: number;
  minImageWidth?: number;
  oekaki?: 0 | 1;
  pages: number;
  perPage: number;
  requireSubject?: 0 | 1;
  sjisTags?: 0 | 1;
  spoilers?: 0 | 1;
  textOnly?: 0 | 1;
  title: string;
  userIds?: 0 | 1;
  webmAudio?: 0 | 1;
  wsBoard: 0 | 1;
}

export interface ApiCooldowns {
  images: number;
  replies: number;
  threads: number;
}

export interface ApiGetBoards {
  boards: ApiBoard[];
}

export interface ApiGetCatalog {
  page: number;
  threads: ApiThread[];
}

export interface ApiGetIndices {
  threads: ApiIndexThread[];
}

export interface ApiGetPosts {
  posts: ApiThreadPost[];
}

export interface ApiGetThreads {
  page: number;
  threads: ApiThreadMetadata[];
}

export interface ApiIndexPost extends ApiBaseContentAlpha, ApiBaseContentBravo, ApiBaseContentCharlie, ApiBaseContentDelta {
}

export interface ApiIndexThread {
  posts: ApiIndexPost[];
}

export interface ApiThread extends ApiBaseContentAlpha, ApiBaseContentBravo, ApiBaseContentCharlie {
  lastReplies?: ApiThreadReply[];
}

export interface ApiThreadMetadata {
  lastModified: number;
  no: number;
  replies: number;
}

export interface ApiThreadPost extends ApiBaseContentAlpha, ApiBaseContentBravo, ApiBaseContentDelta {
  archived?: 1;
  archivedOn?: number;
}

export interface ApiThreadReply extends ApiBaseContentAlpha {
  id: string;
}

export type Board = ApiBoard;
export type Post = ApiIndexPost;
export type Thread = ApiThread;
