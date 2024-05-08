import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="container-fluid bg-light-subtle">
            <div className="row">
                <div className="col-md-4">
                    <img src={require('./img/logo.png')} alt="Your Library" />
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <form className="form-inline">
                        <div className="input-group">
                            <input type="search" className="form-control" placeholder="Search For Products" />
                            <button href="#" className="btn btn-light" style={{ marginLeft: '1px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                <Link to="/Order" className="nav-link">
                    <div className="btn btn-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        <span className="position-absolute rounded-pill text-bg-danger">+99 <span className="visually-hidden">unread messages</span></span>
                    </div>
                </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
