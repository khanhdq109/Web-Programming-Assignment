import React, { useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export const Sidebar = () => {
    const location = useLocation();
    useEffect(() => {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        const currentLink = document.querySelector(`.nav-link[href='${location.pathname}']`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }, [location.pathname]);
    return (
        <Nav variant="pills" className="flex-column">
            <Nav.Item>
                <Link className="nav-link" to="/admin/dashboard">Thông tin chung</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/admin/brands">Thể loại</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/admin/members">Thành viên</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/admin/comments">Bình luận và đánh giá</Link>
            </Nav.Item>
        </Nav>
    )
}
