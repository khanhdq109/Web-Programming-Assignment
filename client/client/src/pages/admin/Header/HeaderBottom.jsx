import { faRegistered, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const HeaderBottom = () => {
    return (
        <div className="header-bottom">
            <div className="container d-flex justify-content-between align-items-center">
                <nav className="header-bottom-nav py-3">
                    <ul className="list-unstyled d-flex align-items-center gap-3 m-0">
                        <li><a className="header-bottom-nav-link" href="/">Trang chủ</a></li>
                        <li><a className="header-bottom-nav-link" href="/">Sản phẩm</a></li>
                        <li><a className="header-bottom-nav-link" href="/">Tin tức</a></li>
                        <li><a className="header-bottom-nav-link" href="/">Liên hệ</a></li>
                        <li><a className="header-bottom-nav-link active" href="/">Quản trị viên</a></li>
                    </ul>
                </nav>
                <div className="header-bottom-auth-btns">
                    <button>
                        <FontAwesomeIcon icon={faRightToBracket} />
                        <span>Đăng nhập</span>
                    </button>

                    <button>
                        <FontAwesomeIcon icon={faRegistered} />
                        <span>Đăng ký</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
