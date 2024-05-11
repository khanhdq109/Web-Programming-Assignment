import '../assets/scss/Header.scss';
import { faCartShopping, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
export const Header = () => {
    const [searchQuery, setSearchQuery] = useState(''); // State to manage the search query
    const navigate = useNavigate(); // Initialize useHistory hook

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${searchQuery}`); // Use navigate to push search query
    };


    return (
        <div className="container">
            <div className="header-top">
                <div className="header-logo">
                    <img width={215} height={98} src={logo} alt="" className="header-logo-img" />
                </div>

                {/* Use onSubmit event to trigger search */}
                    <div className="header-search-bar">
                        <form onSubmit={handleSearchSubmit}> 
                            <input
                            type="text"
                            placeholder="Search for product..."
                            value={searchQuery}
                            onChange={handleSearchInputChange} // Handle changes in search input
                            className="form-control"
                            />
                            <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </form>
                    </div>
                

                <div className="header-actions">
                    <button className="header-action-btn header-love-btn">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>0</span>
                    </button>
                    <button className="header-action-btn header-cart-btn">
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>0</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
