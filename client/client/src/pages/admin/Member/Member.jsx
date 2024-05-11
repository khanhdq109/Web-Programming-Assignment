import React, { useEffect, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import { Sidebar } from '../Sidebar/Sidebar'
import { AdminNav } from '../../../component/AdminNav/AdminNav'
import { UserService } from '../services/UserService'
import { CustomModal } from '../../../component/Modal/CustomModal'

export const Member = () => {
    const [users, setUsers] = useState([]);
    const [recall, setRecall] = useState(0);
    const [success, setSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const userService = new UserService();
            const json = await userService.findAll();
            if(json.status === 'Success')
                setUsers(json.data);
        }
        fetchData();
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    }, [recall]);

    const handleDeleteUser = async e => {
        const userService = new UserService();
        const json = await userService.deleteUser(userId);
        if(json.status === 'Success') {
            setSuccess(true);
            setRecall(prev => prev + 1);
            setShow(false);
        }
    }

    const handleUpdateUser = e => {
        
    }
    
    const handleOpenModal = e => {
        const element = e.target;
        const userId = element.getAttribute('userId');
        setShow(true);
        setUserId(userId);
    }

    return (
        <div className="container">
            <AdminNav />
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <h1>Thành viên</h1>
                    {!!success && (
                        <Alert variant="success">
                            Xoá thành viên thành công
                        </Alert>
                    )}
                    <Table bordered className="mt-3">
                        <thead>
                            <tr>
                                <th>Tên thành viên</th>
                                <th>Email</th>
                                <th>Ngày sinh</th>
                                <th colSpan={2}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!users && users.map(user => (
                                <tr key={user.user_id}>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.bday}</td>
                                    <td><button userId={user.user_id} className="btn btn-primary">Sửa</button></td>
                                    <td><button onClick={handleOpenModal} userId={user.user_id} className="btn btn-danger">Xóa</button></td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                </div>
            </div>

            <CustomModal 
                title='Bạn có muốn xoá thành viên này' 
                body='Vui lòng xác nhận ở bên dưới' 
                confirmText='Xoá' 
                show={show}
                handleConfirm={handleDeleteUser}
                handleCancel={() => setShow(false)} />
        </div>
    )
}
