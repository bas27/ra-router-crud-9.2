import { useParams, useNavigate } from "react-router"
import { IPost, ViewPostProps } from '../types/types'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";


const ViewPost = ({ posts, setCheckUpdate }: ViewPostProps) => {


  const [post, setPost] = useState<IPost | null | undefined>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, _setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const p = posts ? posts.find(item => item.id === Number(id)) : null;



  useEffect(() => {
    setPost(p);
  }, [posts, id]);


  const handleDeletePost = async (event: React.MouseEvent) => {
    event.preventDefault();
    setDeleting(true)
    await fetch(import.meta.env.VITE_APP_URL + `/posts/${id}`, {
      method: 'DELETE'
    }).then((_res) => {
      setDeleting(false)
      setPost(null)
      navigate('/')
      setCheckUpdate(true);
    })

  }


  return (
    <div className="view">
      <div className="header">
        <Link to="/" className="close">
          <span className="material-icons-outlined">close</span>
        </Link>
      </div>
      {post && <Post post={post} />}
      <div className="buttons">
        <button className="button"
          onClick={() => navigate('edit')}
        >
          Изменить
        </button>
        <button
          className="button button-delete"
          onClick={handleDeletePost}
          disabled={deleting}
        >
          {deleting ? 'Удаление...' : 'Удалить'}
        </button>
      </div>
      {error && <div>{error}</div>}
    </div>
  )
}



export { ViewPost }
