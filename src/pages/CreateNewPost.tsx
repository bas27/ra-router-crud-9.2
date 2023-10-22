import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateNewPostProps } from '../types/types'

const CreateNewPost = ({ setCheckUpdate }: CreateNewPostProps) => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  let id = 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }

  const navigate = useNavigate();

  const handleToPublishPost = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSaving(true)
    await fetch(import.meta.env.VITE_APP_URL + '/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, content: content })
    }).then((_res) => {
      setContent('');
      id += 1;
      navigate('/')
      setCheckUpdate(true)
    })

  }


  return (
    <>

      <div className="create">
        <div className="header">
          <div className="post-types">
            <a href="#/" className="post-types__item post-types__item-active">
              Публикация
            </a>
            <a href="#/" className="post-types__item">
              Фото/видео
            </a>
            <a href="#/" className="post-types__item">
              Прямой эфир
            </a>
            <a href="#/" className="post-types__item">
              Еще
            </a>
          </div>
          <Link to="/" className="close">
            <span className="material-icons-outlined">close</span>
          </Link>
        </div>
        <div className="form">
          <div className="form__avatar" />
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
        <div className="buttons">
          <button className="button" onClick={handleToPublishPost}>
            {isSaving ? 'Публикация...' : 'Опубликовать'}
          </button>
        </div>
      </div>

    </>
  )
}

export { CreateNewPost }
