import { PostListProps } from '../types/types'
import Post from './Post'


const PostsList = ({ posts }: PostListProps) => {



  return (
    <div className='posts'>
      {posts && posts.map((item) => {
        return (<div className='postWrapper' key={item.id} >
          <Post post={item} />
        </div>)
      })}
    </div>
  )
}

export { PostsList }
