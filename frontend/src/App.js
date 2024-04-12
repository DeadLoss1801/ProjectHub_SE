import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Contact from './components/Contact';
import About from './components/About';
import SignUp from './components/Signup';
import Proposal from './components/Proposal';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signup'} element={<SignUp />} />
          <Route path={'/about'} element={<About />} />
          <Route path={'/contact'} element={<Contact />} />
          <Route path={'/proposal'} element={<Proposal />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
