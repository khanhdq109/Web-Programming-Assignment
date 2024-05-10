import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar/sidebar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import CardList from '../../component/CardList/CardList';
import Test from '../../component/CardList/test';
import Homepage from './homepage';
import CartOrder from './CartOder';
import ProfilePage from './Profile';
import ProductDetail from '../../component/ProductDetail/ProductDetail';
import { Login } from '../admin/Login/Login';
import { MainNav } from '../../component/MainNav/MainNav';
import { Register } from '../admin/Login/Register';
import { Dashboard } from '../admin/Dashboard/Dashboard';
import { Brand } from '../admin/Brand/Brand';
import { Member } from '../admin/Member/Member';

function MainGuest() {
  const location = useLocation();
  const pathname = location.pathname;
  const hiddenSidebarLink = ['/dashboard', '/brands', '/members'].includes(pathname);
  const colLeftNum = hiddenSidebarLink ? 'col-md-12 d-none' : 'col-md-3';
  const colRightNum = hiddenSidebarLink ? 'col-md-12' : 'col-md-9';
  return (
    <div className="container-fluid">
      <div className="row">
        <div className={colLeftNum}>
          <nav className="list-group">
            <div className="list-group-item list-group-item-action bg-success-subtle" aria-current="page">Categories</div>
            <a href="/khoa-hoc" className="list-group-item list-group-item-action">Khoa Học</a>
            <a href="/van-hoc" className="list-group-item list-group-item-action">Văn Học</a>
            {/* Thêm các loại khác */}
          </nav>
        </div>
        <div className={colRightNum}>
          <MainNav />
          <div className="main-content" style={{ margin: '5px', marginBottom: '0' }}>
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/home" exact element={<Homepage />} />
              <Route path="/news" exact element={<Test />} />
              <Route path="/contact" exact element={<Test />} />
              <Route path="/order" exact element={<CartOrder/>} />
              <Route path="/profile" exact element={<ProfilePage/>} />
              <Route path="/product/detail" exact element={<ProductDetail/>} />
              <Route path="/dashboard" exact element={<Dashboard/>} />
              <Route path="/brands" exact element={<Brand/>} />
              <Route path="/members" exact element={<Member/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              {/* Define routes for different categories */}
              <Route path="/all" element={<CardList category="all" />} />
              <Route path="/khoa-hoc" element={<CardList category="Khoa Học" />} />
              <Route path="/van-hoc" element={<CardList category="Văn Học" />} />
              {/* Add more routes for other categories */}
            </Routes>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default MainGuest;