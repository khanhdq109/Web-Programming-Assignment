import React from 'react';
import { Main } from './pages/admin/Layout/Main';
import { Login } from './pages/admin/Login/Login';
import MainGuest from './pages/guest/main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Register } from './pages/admin/Login/Register';


function App() {
    return (
        <div className="App">
          <Main>
          <Routes>
            <Route path="/login" element={<Login />} />  {/* Login route */}
            <Route path="/register" element={<Register />} />  {/* Register route */}
            <Route path="/*" element={<MainGuest />} />  {/* Guest interface as default route */}
          </Routes>
          </Main>
        </div>
      );
    }    

export default App;
