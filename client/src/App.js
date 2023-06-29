// import logo from './logo.svg';
import './App.css';
import AdminLogin from './components/adminLogin';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from './components/userLogin';
import UserSignup from './components/userSignup';
import AddFlight from './components/addFlight';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/admin-login" element={<AdminLogin/>} />
        <Route exact path="/user-login" element={<UserLogin/>} />
        <Route exact path="/user-signup" element={<UserSignup/>} />
        <Route exact path="/add-flight" element={<AddFlight/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
