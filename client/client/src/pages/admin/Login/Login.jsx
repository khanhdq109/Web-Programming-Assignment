import React, { useState } from 'react'
import { Breadcrumb } from '../../../component/Breadcrumb/Breadcrumb'
import background from '../assets/images/login-background.jpg'
import '../assets/scss/Login.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export const Login = () => {

    const [fields, setFields] = useState({
        username: '',
        password: '',
    });

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
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={fields.username} type="text" placeholder="Usename" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="adminLoginFormPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={fields.password} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="adminLoginFormCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="danger" type="submit">
                            Đăng nhập
                        </Button>
                        <div className="mt-3">Bạn chưa có tài khoản? <Link to="/admin/register" className="text-danger">Đăng ký tại đây</Link></div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
