import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/scss/Register.scss';
import { UserService } from '../services/UserService';
export const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const [date, setDate] = useState();
    const [register, setRegister] = useState({
        isAction: false,
        isRegistered: false,
    });

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handleFullNameChange = e => {
        setFullName(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleRepeatChange = e => {
        setRepeat(e.target.value);
    }

    const handleDateChange = e => {
        setDate(e.target.value);
    }
    
    useEffect(() => {
        if(localStorage.getItem('admin') !== null)
            navigate('/admin/dashboard');
    }, [navigate])

    const handleSubmitForm = async e => {
        e.preventDefault();
        console.log({ date });
        const userService = new UserService();
        if (password === repeat) {
            const json = await userService.adminRegister(username, email, fullName, date, password);
            if (json.status === 'Success')
                setRegister({
                    isAction: true,
                    isRegistered: true,
                });
            else
                setRegister({
                    isAction: true,
                    isRegistered: false,
                });
        }

    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <Container className="h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col lg={12} xl={11}>
                        <Card text="black" style={{ borderRadius: '25px' }}>
                            <Card.Body className="p-md-2">
                                <Row className="justify-content-center">
                                    <Col md={10} lg={6} xl={5} order={2} order-lg={1}>
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-uppercase" style={{ color: '#626262' }}>Đăng ký</p>
                                        <Form onSubmit={handleSubmitForm} id="floatingInput" className="mx-1 mx-md-4">
                                            {!!register.isAction && (
                                                <Alert variant={register.isRegistered ? "success" : "danger"}>
                                                    {register.isRegistered ? (
                                                        <>
                                                            <span>Đăng ký thành công <Link to="/admin/login">Đi đến trang đăng nhập</Link></span>
                                                        </>
                                                    ) : "Trùng tên đăng nhập hoặc email"}
                                                </Alert>
                                            )}
                                            <FloatingLabel controlId="floatingInput" label="Username">
                                                <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Email">
                                                <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Họ và tên">
                                                <Form.Control type="text" placeholder="Họ và tên" value={fullName} onChange={handleFullNameChange} />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Ngày sinh">
                                                <Form.Control type="date" placeholder="Ngày sinh" value={date} onChange={handleDateChange} />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Password">
                                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Repeat your password">
                                                <Form.Control type="password" placeholder="Repeat your password" value={repeat} onChange={handleRepeatChange} />
                                            </FloatingLabel>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-3">
                                                <Button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger btn-lg">Đăng ký</Button>
                                            </div>

                                            <div className="pb-3">Bạn đã có tài khoản? <Link to="/admin/login">Đăng nhập tại đây</Link></div>
                                        </Form>

                                    </Col>
                                    <Col md={10} lg={6} xl={7} className="d-flex align-items-center" order={1} order-lg={2}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Bootstrap registration" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}