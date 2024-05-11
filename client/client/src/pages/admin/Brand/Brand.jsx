import React, { useEffect, useState } from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Table } from 'react-bootstrap'
import { AdminNav } from '../../../component/AdminNav/AdminNav'
import { CategoryService } from '../services/CategoryService'

export const Brand = () => {
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const service = new CategoryService();
            const json = await service.findAll();
            if(json.status === 'Success')
                setBrands(json.data);
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
                    <h1>Các nhãn hàng</h1>

                    <Table bordered className="mt-3">
                        <thead>
                            <tr>
                                <th>Tên thể loại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!brands && brands.map(brand => (
                                <tr>
                                    <td>{brand.category_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
