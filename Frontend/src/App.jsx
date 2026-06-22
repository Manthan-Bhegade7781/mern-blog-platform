import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogCreate from './pages/BlogCreate';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogDetails from './pages/BlogDetail';
import EditBlog from './pages/EditBlog';

const App = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/me`,
          {
              withCredentials:true
          }
        );

        setUser(res.data.user);
    } catch {
        setUser(null);
    }
  };

  useEffect(() => {
    fetchUser()}
    , []);

  return (
    <div className='bg-black text-white h-screen w-full'>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path='/' element={<Home/>}/>,
        <Route path='/create' element={<BlogCreate/>}/>,
        <Route
          path="/login"
          element={<Login fetchUser={fetchUser} />}
        />,
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/blog/:id' element={<BlogDetails user={user}/>}/>
        <Route path='/blog/edit/:id' element={<EditBlog/>}/>
      </Routes>

    </div>
  )
}

export default App
