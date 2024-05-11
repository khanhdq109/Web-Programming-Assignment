import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Brand } from "../Brand/Brand"
import { Dashboard } from "../Dashboard/Dashboard"
import { Register } from "../Login/Register"
import { Member } from "../Member/Member"
import { useEffect } from "react"
import { Login } from "../Login/Login"

export const Admin = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {   
        if(localStorage.getItem('admin') == null && location.pathname !== '/admin/register') {
            navigate('/admin/login');
        } 
        else if(location.pathname === '/admin/register') {
            navigate('/admin/register')
        }
        else {
            if(location.pathname === '/admin/login' || location.pathname === '/admin/register' || location.pathname === '/admin')
                navigate('/admin/dashboard')
        }
    }, [location.pathname, navigate])
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Member />} />
            <Route path="/brands" element={<Brand />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
