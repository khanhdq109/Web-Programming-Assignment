import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="row-md-3">
            <nav class="navbar navbar-expand-sm bg-secondary-subtle">
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            <ul class="navbar-nav me-auto">
                                <li class="nav-item">
                                    <Link to="/home" className="nav-link" aria-current="page">Trang chủ</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/news" className="nav-link">Tin tức</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/contact" className="nav-link">Liên hệ</Link>
                                </li>
                            </ul>
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Đăng nhập</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Đăng ký</a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </nav>
    </div>
  );
}

export default Sidebar;