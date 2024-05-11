import React from 'react';
import { Main } from './pages/admin/Layout/Main';
import { Login } from './pages/admin/Login/Login';
import MainGuest from './pages/guest/main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Register } from './pages/admin/Login/Register';
import { Dashboard } from './pages/admin/Dashboard/Dashboard';
import { Admin } from './pages/admin/Layout/Admin';
import LoginGuest from './pages/guest/login/login';
import RegisterGuest from './pages/guest/register/register';

function App() {
    return (
        <div className="App">
          <Main>
          <Routes>
            <Route path='/admin/*' element={<Admin />} />
            <Route path="/login" element={<Login />} />  {/* Login route */}
            <Route path="/register" element={<Register />} />  {/* Register route */}
            <Route path="/*" element={<MainGuest />} />
            <Route path="/Guest/*" element={<MainGuest />} />
              {/* Guest interface as default route */}
            <Route path="/guest/login" element={<LoginGuest />} />
            <Route path="/guest/register" element={<RegisterGuest />} />
          </Routes>
          </Main>
        </div>
      );
    }    

export default App;
