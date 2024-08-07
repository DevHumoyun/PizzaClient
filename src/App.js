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
import Korzinka2 from './pages/Korzinka2/Korzinka2';
import { setKorzinka, setPriceKorzinka } from './redux/reduxStore/korzinkaSlice';
import Process from './pages/Process/Process';

function App() {
  const {user } = useSelector(state => state.authSlice);
  const {korzinka } = useSelector(state => state.korzinkaSlice)
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
    }
  }
  useEffect(() => {
    dispatch(setPriceKorzinka())
    
  } ,[korzinka])

  useEffect(() => {
    dispatch(setKorzinka())
    handleGetUser()
  } ,[])
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/process' element={<Process />} />
        <Route path='/menu/' element={<Menu />} />
        <Route path='/profile/*' element={<Profile />} />
        <Route path='/korzinka2' element={<Korzinka2/>} />
      </Routes>
    </div>
  );
}

export default App;
