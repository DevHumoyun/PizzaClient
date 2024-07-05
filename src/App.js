// import './App.css';
import './index.css';
import Navbar from './components/Navbar/Navbar';
// import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Navbar/>
      {/* <Header/> */}
      <Footer/>
    </div>
  );
}

export default App;
