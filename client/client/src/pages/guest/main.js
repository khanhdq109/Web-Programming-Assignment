import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar/sidebar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import CardList from '../../component/CardList/CardList';
import Test from '../../component/CardList/test';
import Homepage from './homepage';
import CartOrder from './CartOder';
import ProfilePage from './Profile';
import ProductDetail from '../../component/ProductDetail/ProductDetail';
import { Login } from '../admin/Login/Login';
import { MainNav } from '../../component/MainNav/MainNav';
import Searchbook from '../../component/SearchCard/search';
import Footer from '../../component/Footer/Footer';
import News from './news';
import { useParams } from 'react-router-dom';
import { getUserId } from '../../component/AutheUser';
const categories = [
  { name: 'Drama', path: '/Drama' },
  { name: 'Life Style', path: '/Life-Style' },
  { name: 'Culture', path: '/Culture' },
  { name: 'Love Story', path: '/Love-Story' },
  { name: 'Science', path: '/Science' },
  { name: 'Business', path: '/Business' },
  { name: 'Inspiration', path: '/Inspiration' },
];

function MainGuest() {
  console.log(getUserId());

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
        <nav className="list-group">
          <div className="list-group-item list-group-item-action bg-success-subtle" aria-current="page">Categories</div>
          {categories.map((category) => (
            <Link
              key={category.name} // Add a unique key for each link
              to={category.path}
              className="list-group-item list-group-item-action"
            >
              {category.name}
            </Link>
          ))}
        </nav>
        </div>
        <div className="col-md-9">
          <MainNav/>
          <div className="main-content" style={{ margin: '5px', marginBottom: '0',width: '100%', height: '100vh' }}>
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/home" exact element={<Homepage />} />
              <Route path="/news" exact element={<News />} />
              <Route path="/order/:user_id" element={<CartOrder/>} />
              <Route path="/profile/:user_id" element={<ProfilePage />} />  
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

              <Route path="/search/:query" element={<Searchbook />} />
            </Routes>
          </div>
          
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MainGuest;