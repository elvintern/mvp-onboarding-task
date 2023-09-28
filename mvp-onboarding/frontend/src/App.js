import './style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './NavBar';
import Customers from './Customers/Customers';
import Products from './Products/Products';
import Stores from './Stores/Stores';
import Sales from './Sales/Sales';

function App() {
  return (
    <Router>
      <Nav />
      <div className="container--body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Stores" element={<Stores />} />
          <Route path="/Sales" element={<Sales />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
