import { faCartShopping, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import logo from '../assets/images/logo.png';

export const HeaderTop = () => {
    return (
        <div className="container">
            <div className="header-top">
                <div className="header-logo">
                    <img width={215} height={98} src={logo} alt="" className="header-logo-img" />
                </div>

                <div className="header-search-bar">
                    <input type="text" placeholder="Search for product..." />
                    <FontAwesomeIcon icon={faSearch} />
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
