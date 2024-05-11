import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Table } from 'react-bootstrap'
import { AdminNav } from '../../../component/AdminNav/AdminNav'

export const Brand = () => {
    return (
        <div className="container">
            <AdminNav />
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <h1>Các nhãn hàng</h1>

                    <Table bordered className="mt-3">
                        <thead>
                            <tr>
                                <th>Tên nhãn hàng</th>
                                <th>Số lượng sản phẩm</th>
                                <th>Ngày đăng ký</th>
                                <th>Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Apple</td>
                                <td>10</td>
                                <td>01/01/2021</td>
                                <td>1000000</td>
                            </tr>
                            <tr>
                                <td>Samsung</td>
                                <td>15</td>
                                <td>01/01/2021</td>
                                <td>2000000</td>
                            </tr>
                            <tr>
                                <td>OnePlus</td>
                                <td>5</td>
                                <td>01/01/2021</td>
                                <td>500000</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
