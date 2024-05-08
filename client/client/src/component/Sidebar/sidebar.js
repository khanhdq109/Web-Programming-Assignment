import React from 'react';
import { Link } from 'react-router-dom';
import { faRegistered, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                                    <Link to="/all" className="nav-link">Sản phẩm</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/news" className="nav-link">Tin tức</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/contact" className="nav-link">Liên hệ</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/login" className="nav-link">Quản trị viên</Link>
                                </li>

                            </ul>
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                <Link to="/profile" className="nav-link">
                                    <FontAwesomeIcon icon={faRightToBracket} />
                                    <span>Đăng nhập</span>
                                </Link>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <FontAwesomeIcon icon={faRegistered} />
                                        <span>Đăng ký</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </nav>
    </div>
  );
}

export default Sidebar;