import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Sidebar } from '../Sidebar/Sidebar'
import { AdminNav } from '../../../component/AdminNav/AdminNav'
import { UserService } from '../services/UserService'

export const Member = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const userService = new UserService();
            const json = await userService.findAll();
            if(json.status === 'Success')
                setUsers(json.data);
        }
        fetchData();
    }, []);
    return (
        <div className="container">
            <AdminNav />
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
                            {!!users && users.map(user => (
                                <tr key={user.user_id}>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.bday}</td>
                                    <td><button className="btn btn-primary">Sửa</button></td>
                                    <td><button className="btn btn-danger">Xóa</button></td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
