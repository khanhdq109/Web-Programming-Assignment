import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../component/Breadcrumb/Breadcrumb';
import background from '../assets/images/login-background.jpg';
import '../assets/scss/Login.scss';
import { UserService } from '../services/UserService';
import { Alert } from 'react-bootstrap';

export const Login = () => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [fields, setFields] = useState({
        username: '',
        password: '',
    });

    const handleFieldsValueChange = (e) => {
        setFields(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });

        setError(null);
    }

    useEffect(() => {
        if (localStorage.getItem('admin') !== null)
            navigate('/admin/dashboard');
    }, [navigate])

    const handleSubmitForm = async e => {
        e.preventDefault();
        const userService = new UserService();
        const json = await userService.adminLogin(fields.username, fields.password);
        if (json.status === 'Success') {
            const adminUser = json.data[0];
            localStorage.setItem('admin', JSON.stringify(adminUser));
            navigate('/admin/dashboard');
        } else {
            setError("Sai tên đăng nhập hoặc mật khẩu");
        }
    }

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
                <Form id="adminLoginForm" onSubmit={handleSubmitForm}>
                    <div>
                        {!!error && (
                            <Alert variant="danger">
                                {error}
                            </Alert>
                        )}

                        <Form.Group className="mb-3" controlId="adminLoginFormEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" value={fields.username} onChange={handleFieldsValueChange} type="text" placeholder="Usename" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="adminLoginFormPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={fields.password} onChange={handleFieldsValueChange} type="password" placeholder="Password" />
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
