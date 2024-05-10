import React from 'react'
import { Table } from 'react-bootstrap'
import { Sidebar } from '../Sidebar/Sidebar'

export const Member = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <h1>Thành viên</h1>

                    <Table bordered className="mt-3">
                        <thead>
                            <tr>
                                <th>Tên thành viên</th>
                                <th>Email</th>
                                <th>Ngày đăng ký</th>
                                <th colSpan={2}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nguyễn Văn A</td>
                                <td>nguyenvana@gmail.com</td>
                                <td>01/01/2021</td>
                                <td><button className="btn btn-primary">Sửa</button></td>
                                <td><button className="btn btn-danger">Xóa</button></td>
                            </tr>
                            <tr>
                                <td>Nguyễn Văn B</td>
                                <td>nguyenvanb@gmail.com</td>
                                <td>01/01/2021</td>
                                <td><button className="btn btn-primary">Sửa</button></td>
                                <td><button className="btn btn-danger">Xóa</button></td>
                            </tr>
                            <tr>
                                <td>Nguyễn Văn C</td>
                                <td>nguyenvanc@gmail.com</td>
                                <td>01/01/2021</td>
                                <td><button className="btn btn-primary">Sửa</button></td>
                                <td><button className="btn btn-danger">Xóa</button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
