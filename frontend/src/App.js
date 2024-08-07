import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Pedidos from './pages/pedidos/pedidos';
function App() {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/pedidos" element={<Pedidos />} />
    </Routes>
  </div>
  );
}

export default App;
