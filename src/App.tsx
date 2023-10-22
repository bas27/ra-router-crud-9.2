
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import {CreateNewPost} from './pages/CreateNewPost';
import { ViewPost } from './pages/ViewPost';
import { useState, useEffect } from 'react';
import { EditPost } from './pages/EditPost';
import { IPost } from './types/types';
import Page404 from './pages/Page404';


function App() {

  const [posts, setPosts] = useState<IPost[]|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const [checkUpdate, setCheckUpdate] = useState(false);



  const fetchPosts = async () => {
    try {
      setIsLoading(true)
    const res = await fetch(import.meta.env.VITE_APP_URL + '/posts')
    if (!res.ok) throw new Error('Oops. Somethong went wrong');
    const data = await res.json();
    setPosts(data)
    } catch(err:any) {
      setError(err)
    } finally {
      setIsLoading(false)
      setCheckUpdate(false)
    }
  }

  useEffect (() => {
    fetchPosts()
  }, [checkUpdate])

   return (
        <Router>
            <div className='page'>
              <Routes>
                <Route path='/' element={<Home posts={posts} isLoading={isLoading} error={error}/>}/>
                <Route path='/posts/new' element={<CreateNewPost  setCheckUpdate={setCheckUpdate}/>}/>
                <Route path='/posts/:id' element={<ViewPost posts={posts} setCheckUpdate={setCheckUpdate}/>}/>
                <Route path='/posts/:id/edit' element={<EditPost posts={posts} setCheckUpdate={setCheckUpdate}/>}/>
                <Route path='/*' element={<Page404/>}/>

              </Routes>
            </div>
        </Router>

   )
}

export default App
