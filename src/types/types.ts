export  interface IPost {
  id: number,
  content: string,
  created: number
}

export  type PostListProps = {
  posts: IPost[]|null|undefined;
}


export type HomeProps = {
  posts: IPost[] | null,
  isLoading: boolean,
  error: boolean | null;
}

export type PostProps = {
  post: IPost | null | any,
}



export type ViewPostProps = {
  posts: IPost[] | null;
  setCheckUpdate: (arg:boolean) => void
}

export type CreateNewPostProps = {
  setCheckUpdate: (arg:boolean) => void
}


export type EditPostProps = {
  posts: IPost[] | null | undefined,
  setCheckUpdate: (arg:boolean) => void
}