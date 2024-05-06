import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar/sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CardList from '../../component/CardList/CardList';
import Test from '../../component/CardList/test';
import Homepage from './homepage';

function MainGuest() {

  return (
    <Router>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <nav className="list-group">
            <a href="#" className="list-group-item list-group-item-action bg-success-subtle" aria-current="page">Categories</a>
            <a href="/all" className="list-group-item list-group-item-action">Tất cả</a>
            <a href="/khoa-hoc" className="list-group-item list-group-item-action">Khoa Học</a>
            <a href="/van-hoc" className="list-group-item list-group-item-action">Văn Học</a>
            {/* Thêm các loại khác */}
          </nav>
        </div>
        <div className="col-md-9">
          <Sidebar />
          <div className="main-content" style={{ margin: '5px', marginBottom: '0' }}>
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/home" exact element={<Homepage />} />
              <Route path="/news" exact element={<Test />} />
              <Route path="/contact" exact element={<Test />} />
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
  </Router>
  );
}

export default MainGuest;