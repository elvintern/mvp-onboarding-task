import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './NavBar';
import Customers from './Customers/Customers';
import './style.css';

function App() {
  return (
    <Router>
      <Nav />
      <div className="container--body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Customers" element={<Customers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
