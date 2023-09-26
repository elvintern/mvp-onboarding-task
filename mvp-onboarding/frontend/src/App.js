import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './NavBar';
import Customers from './Customers/Customers';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Customers" element={<Customers />} />
      </Routes>
    </Router>
  );
}

export default App;
