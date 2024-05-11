import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar/sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CardList from '../../component/CardList/CardList';
import Test from '../../component/CardList/test';
import Homepage from './homepage';
import CartOrder from './CartOder';
import ProfilePage from './Profile';
import ProductDetail from '../../component/ProductDetail/ProductDetail';
import { Login } from '../admin/Login/Login';
import { MainNav } from '../../component/MainNav/MainNav';
import News from './news';

function MainGuest() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <nav className="list-group">
            <div className="list-group-item list-group-item-action bg-success-subtle" aria-current="page">Categories</div>
            <a href="/Drama" className="list-group-item list-group-item-action">Drama</a>
            <a href="/Life-Style" className="list-group-item list-group-item-action">Life Style</a>
            <a href="/Culture" className="list-group-item list-group-item-action">Culture</a>
            <a href="/Love-Story" className="list-group-item list-group-item-action">Love Story</a>
            <a href="/Science" className="list-group-item list-group-item-action">Science</a>
            <a href="/Business" className="list-group-item list-group-item-action">Business</a>
            <a href="/Inspiration" className="list-group-item list-group-item-action">Inspiration</a>
            {/* Thêm các loại khác */}
          </nav>
        </div>
        <div className="col-md-9">
          <MainNav />
          <div className="main-content" style={{ margin: '5px', marginBottom: '0' }}>
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/home" exact element={<Homepage />} />
              <Route path="/news" exact element={<News />} />
              <Route path="/contact" exact element={<Test />} />
              <Route path="/order" exact element={<CartOrder/>} />
              <Route path="/profile" exact element={<ProfilePage/>} />
              <Route path="/product/detail/:book_id" element={<ProductDetail />} />
              {/* Define routes for different categories */}
              <Route path="/all" element={<CardList category="all" />} />
              <Route path="/Drama" element={<CardList category="Drama" />} />
              <Route path="/Life-Style" element={<CardList category="Life Style" />} />
              <Route path="/Culture" element={<CardList category="Culture" />} />
              <Route path="/Love-Story" element={<CardList category="Love Story" />} />
              <Route path="/Science" element={<CardList category="Science" />} />
              <Route path="/Business" element={<CardList category="Business" />} />
              <Route path="/Inspiration" element={<CardList category="Inspiration" />} />
              {/* Add more routes for other categories */}
            </Routes>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default MainGuest;