import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditPostProps } from '../types/types'
import { IPost } from "../types/types";


const EditPost = ({ posts, setCheckUpdate }: EditPostProps) => {

  const [_post, setPost] = useState<IPost | null | undefined>(null);
  const [content, setContent] = useState<string | undefined>('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, _setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const edditedID = Number(id);
  const p = posts ? posts.find(item => item.id === edditedID) : null;



  useEffect(() => {
    setPost(p);
    setContent(p?.content)
  }, [posts, id]);


  const handleToEditPost = async (event: React.MouseEvent) => {
    const date = new Date();
    event.preventDefault();
    setIsSaving(true)
    await fetch(import.meta.env.VITE_APP_URL + `/posts/${edditedID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: edditedID, content: content, created: date })
    }).then((_res) => {
      setContent('');
      navigate('/')
      setCheckUpdate(true)
    })

  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }

  return (
    <div className="update">
      <div className="header">
        <div>Редактировать публикацию</div>
        <Link to={`/posts/${id}`} className="close">
          <span className="material-icons-outlined">close</span>
        </Link>
      </div>
      <div className="form">
        <img src="https://i.pravatar.cc/150" alt="" className="author__avatar" />
        <input
          className="form__textarea"
          name="content"
          value={content}
          onChange={handleChange}
        />
        <a href="#/" className="form__smile">
          <span className="material-icons-outlined">emoji_emotions</span>
        </a>
      </div>
      {error && <div>{error}</div>}
      <div className="buttons">
        <button className="button" onClick={handleToEditPost}>
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}



export { EditPost }
