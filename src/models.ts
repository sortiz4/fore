export interface Cooldowns {
  images: number;
  replies: number;
  threads: number;
}

export interface Board {
  board: string;
  bumpLimit: number;
  codeTags?: number;
  cooldowns: Cooldowns;
  countryFlags?: number;
  customSpoilers?: number;
  forcedAnon?: number;
  imageLimit: number;
  isArchived: number;
  mathTags?: number;
  maxCommentChars: number;
  maxFilesize: number;
  maxWebmDuration: number;
  maxWebmFilesize: number;
  metaDescription: string;
  minImageHeight?: number;
  minImageWidth?: number;
  oekaki?: number;
  pages: number;
  perPage: number;
  requireSubject?: number;
  sjisTags?: number;
  spoilers?: number;
  textOnly?: number;
  title: string;
  trollFlags?: number;
  userIds?: number;
  webmAudio?: number;
  wsBoard: number;
}

export interface TrollFlags {
  ac: string;
  an: string;
  bl: string;
  cf: string;
  cm: string;
  ct: string;
  dm: string;
  eu: string;
  fc: string;
  gn: string;
  gy: string;
  jh: string;
  kn: string;
  mf: string;
  nb: string;
  nz: string;
  pc: string;
  pr: string;
  re: string;
  tm: string;
  tr: string;
  un: string;
  wp: string;
}

export interface GetBoards {
  boards: Board[];
  trollFlags: TrollFlags;
}

export interface ThreadMetadata {
  lastModified: number;
  no: number;
  replies: number;
}

export interface GetThreads {
  page: number;
  threads: ThreadMetadata[];
}

export interface LastReply {
  com: string;
  ext: string;
  filename: string;
  fsize?: number;
  h?: number;
  md5: string;
  name: string;
  no: number;
  now: string;
  resto: number;
  tim?: number;
  time: number;
  tnH?: number;
  tnW?: number;
  trip: string;
  w?: number;
}

export interface Thread {
  bumplimit: number;
  com: string;
  customSpoiler: number;
  ext: string;
  filename: string;
  fsize: number;
  h: number;
  imagelimit: number;
  images: number;
  lastModified: number;
  lastReplies: LastReply[];
  md5: string;
  name: string;
  no: number;
  now: string;
  omittedImages: number;
  omittedPosts: number;
  replies: number;
  resto: number;
  semanticUrl: string;
  sub: string;
  tim: number;
  time: number;
  tnH: number;
  tnW: number;
  w: number;
}

export interface GetCatalog {
  page: number;
  threads: Thread[];
}

export interface ThreadPosts {
  posts: Post[];
}

export interface GetIndices {
  threads: ThreadPosts[];
}

export interface Post {
  bumplimit: number;
  com: string;
  customSpoiler: number;
  ext: string;
  filename: string;
  fsize: number;
  h: number;
  imagelimit: number;
  images: number;
  md5: string;
  name: string;
  no: number;
  now: string;
  omittedImages: number;
  omittedPosts: number;
  replies: number;
  resto: number;
  semanticUrl: string;
  sub: string;
  tailSize?: number;
  tim: number;
  time: number;
  tnH: number;
  tnW: number;
  uniqueIps: number;
  w: number;
}

export interface GetPosts {
  posts: Post[];
}
