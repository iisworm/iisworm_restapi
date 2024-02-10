export interface Post {
  id: string;
  title: string;
  content: string;
  tags?: string;
}

export interface Album {
  identifier: string;
  title: string;
  posts?: {
    [key: string]: Post
  }
}