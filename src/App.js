// import './App.css';
import './index.css';
import Navbar from './components/Navbar/Navbar';
// import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Signup2 from './pages/Signup2/Signup2';
import Login from './pages/Login/Login';
import WatchProduct from './components/watchProduct/WatchProduct1'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        {/* <Route path='/signup' element={<Signup />} /> */}
        <Route path='/signup2' element={<Signup2 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/watchProduct' element={<WatchProduct />} />
      </Routes>
      <Navbar/>
      {/* <Header/> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
