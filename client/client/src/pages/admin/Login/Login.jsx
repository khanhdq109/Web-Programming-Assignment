import React from 'react'
import { Breadcrumb } from '../../../component/Breadcrumb/Breadcrumb'
import background from '../assets/images/login-background.jpg'
import '../assets/scss/Login.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Login = () => {
    return (
        <div id="adminLoginPage">
            <div className="container mt-3">
                <Breadcrumb />
            </div>
            <div className="login-background" style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                height: '400px',
                width: '100%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <Form id="adminLoginForm">
                    <div>

                        <Form.Group className="mb-3" controlId="adminLoginFormEmail">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="email" placeholder="Enter your phone" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="adminLoginFormPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="adminLoginFormCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="danger" type="submit">
                            Đăng nhập
                        </Button>
                        <div className="mt-3">Bạn chưa có tài khoản? <a href="/" className="text-danger">Đăng ký tại đây</a></div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
