import logo from './logo.svg';
import './App.css';
import Navbar from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './about';
import Home from './home';
import api from './components/UniApi/api'

function App() {
  return (
    <div>
     <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
