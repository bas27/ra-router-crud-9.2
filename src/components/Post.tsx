import { PostProps } from "../types/types"
import moment from 'moment';
import '../App.css'
import { useNavigate } from "react-router";


const Post = ({ post }: PostProps) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const date1 = moment(post?.created);
  const date2 = moment(now);

  const getDiff = (a: moment.Moment, b: moment.Moment) => {
    let res: number;
    if (+(b.diff(a, 'years')) >= 1) {
      res = b.diff(a, 'years')
      return `${res} years ago`
    } else if (+(b.diff(a, 'months')) >= 1) {
      res = b.diff(a, 'months')
      return `${res} months ago`
    } else if (+(b.diff(a, 'days')) >= 1) {
      res = b.diff(a, 'days')
      return `${res} days ago`
    } else if (+(b.diff(a, 'hours')) >= 1) {
      res = b.diff(a, 'hours')
      return `${res} hours ago`
    } else if (+(b.diff(a, 'minutes')) >= 1) {
      res = b.diff(a, 'minutes')
      return `${res} minutes ago`
    }
    return 'now'
  }
  const diff = getDiff(date1, date2)
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/posts/${post.id}`)
  }



  return (
    <article className="post">
      <div className="author">
        <img src="https://i.pravatar.cc/150" alt="" className="author__avatar" />
        <div>
          <a href="#/" className="author__name">
            Alexander B
          </a>
          <div className="author__status">
            <div>Основатель группы</div>
            &nbsp;&sdot;&nbsp;
            <div className="date">{diff}</div>
          </div>
        </div>
      </div>
      <div
        className='post__text'
        onClick={handleClick}
      >
        {post.content}
      </div>
      <div className="reactions">
        <a href="#/" className="reactions__link">
          <span className="material-icons-outlined">thumb_up</span>Нравится
        </a>
        <a href="#/" className="reactions__link">
          <span className="material-icons-outlined">chat_bubble_outline</span>
          <span>Комментировать</span>
        </a>
      </div>
    </article>
  );
};


export default Post
