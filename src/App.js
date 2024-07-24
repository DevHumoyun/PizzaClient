// import './App.css';
import './index.css';
import Navbar from './components/Navbar/Navbar';
// import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Signup2 from './pages/Signup2/Signup2';
import Login from './pages/Login/Login';
import WatchProduct from './components/watchProduct/WatchProduct1'
import Home from './pages/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile/Profile';
import { getOneUser } from './server/usersServer';
import { setUser } from './redux/reduxStore/authSlice';
import { useEffect } from 'react';
import Menu from './components/Menu/Menu';

function App() {
  const {user } = useSelector(state => state.authSlice)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const handleGetUser = async () => {
    if(!user){
      const id = localStorage.getItem('myId')
      if(!id){
        return 
      } 
      const data = await getOneUser(id)
      dispatch(setUser(data.user))
      console.log(user , data.user);
    }
  }
  useEffect(() => {
    handleGetUser()
  } ,[])
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Home />} />
        
        <Route path='/menu/' element={<Menu />} />
        {/* {!user && <Route path='/signup' element={<Signup />} />}
        {user && <Route path='/signup2' element={<Signup2 />} />}
        {!user && <Route path='/login' element={<Login />} />} */}
        <Route path='/profile/*' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
