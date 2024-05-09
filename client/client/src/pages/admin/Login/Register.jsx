import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import '../assets/scss/Register.scss'
export const Register = () => {
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
                                        <Form id="floatingInput" className="mx-1 mx-md-4">
                                            <FloatingLabel controlId="floatingInput" label="Họ">
                                                <Form.Control type="text" placeholder="Họ" />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Tên">
                                                <Form.Control type="text" placeholder="Tên" />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="SĐT">
                                                <Form.Control type="text" placeholder="SĐT" />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Email">
                                                <Form.Control type="email" placeholder="Email" />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Password">
                                                <Form.Control type="password" placeholder="Password" />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Repeat your password">
                                                <Form.Control type="password" placeholder="Repeat your password" />
                                            </FloatingLabel>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-3">
                                                <Button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger btn-lg">Đăng ký</Button>
                                            </div>

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