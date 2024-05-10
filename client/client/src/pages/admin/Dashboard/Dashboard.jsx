import { faBagShopping, faComment, faEye, faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../assets/scss/Dashboard.scss'
import { Table } from "react-bootstrap"
import { useEffect, useRef } from "react"
import { Sidebar } from "../Sidebar/Sidebar"

export const Dashboard = () => {
    const tbodyRef = useRef();

    useEffect(() => {
        const statusConstants = {
            DELIVERED: "Đã giao",
            PENDING: "Chờ xử lý",
            CANCELLED: "Đã hủy"
        }
        const statusBackground = {
            [statusConstants.DELIVERED]: "#00ff99",
            [statusConstants.PENDING]: "#ffcc00",
            [statusConstants.CANCELLED]: "#ff9999"
        }
        const tds = tbodyRef.current.querySelectorAll('td:last-child');
        Array.from(tds).forEach(td => {
            td.style.background = statusBackground[td.innerText];
        })
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <div className="box-wrapper row row-cols-4">
                        <div className="col">
                            <div className="box" style={{ background: '#ff9999' }}>
                                <div className="box-icon">
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                                <div className="box-amount">1000</div>
                                <span>Lượt xem</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box" style={{ background: '#6699ff' }}>
                                <div className="box-icon">
                                    <FontAwesomeIcon icon={faBagShopping} />
                                </div>
                                <div className="box-amount">80</div>
                                <span>Sản phẩm đã bán</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box" style={{ background: '#00ff99' }}>
                                <div className="box-icon">
                                    <FontAwesomeIcon icon={faComment} />
                                </div>
                                <div className="box-amount">200</div>
                                <span>Feedback</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box" style={{ background: '#ffcc00' }}>
                                <div className="box-icon">
                                    <FontAwesomeIcon icon={faWallet} />
                                </div>
                                <div className="box-amount">7000</div>
                                <span>Doanh thu</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="mt-5">Đơn đặt hàng gần đây</h1>

                    <Table bordered className="mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody ref={tbodyRef}>
                            <tr>
                                <td>Product 1</td>
                                <td>1000</td>
                                <td>2021-09-01</td>
                                <td>Đã giao</td>
                            </tr>
                            <tr>
                                <td>Product 2</td>
                                <td>2000</td>
                                <td>2021-09-02</td>
                                <td>Chờ xử lý</td>
                            </tr>
                            <tr>
                                <td>Product 3</td>
                                <td>3000</td>
                                <td>2021-09-03</td>
                                <td>Đã giao</td>
                            </tr>
                            <tr>
                                <td>Product 4</td>
                                <td>4000</td>
                                <td>2021-09-04</td>
                                <td>Đã giao</td>
                            </tr>
                            <tr>
                                <td>Product 5</td>
                                <td>5000</td>
                                <td>2021-09-05</td>
                                <td>Đã hủy</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
