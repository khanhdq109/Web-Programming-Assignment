import { faRegistered, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../pages/admin/assets/scss/Header.scss'

export const MainNav = () => {

    const location = useLocation();
    const ulRef = useRef();
    useEffect(() => {
        const links = ulRef.current.querySelectorAll('li a');
        Array.from(links).forEach(link => {
            const path = new URL(link.href).pathname;
            link.classList.toggle('active', path === location.pathname);
        })
        
    }, [location.pathname]);

    return (
        <div className="header-bottom">
            <div className="container d-flex justify-content-between align-items-center">
                <nav className="header-bottom-nav py-3">
                    <ul ref={ulRef} className="list-unstyled d-flex align-items-center gap-3 m-0">
                        <li><Link className="header-bottom-nav-link active" to="/home">Trang chủ</Link></li>
                        <li><Link className="header-bottom-nav-link" to="/all">Sản phẩm</Link></li>
                        <li><Link className="header-bottom-nav-link" to="/news">Tin tức</Link></li>
                        <li><Link className="header-bottom-nav-link" to="/dashboard">Quản trị viên</Link></li>
                    </ul>
                </nav>
                <div className="header-bottom-auth-btns">
                    <button>
                        <Link to="/login">
                            <FontAwesomeIcon icon={faRightToBracket} />
                            <span>Đăng nhập</span>
                        </Link>
                    </button>

                    <button>
                        <Link to="/register">
                            <FontAwesomeIcon icon={faRegistered} />
                            <span>Đăng ký</span>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
