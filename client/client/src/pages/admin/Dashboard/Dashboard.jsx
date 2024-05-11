import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import BookService from '../services/BookService';
import { Sidebar } from '../Sidebar/Sidebar';

export const Dashboard = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            const bookService = new BookService();
            const json = await bookService.findAll();
            if (json.status === 'Success')
                setBooks(json.data);
        }
        fecthData();
    }, [])

    // Function to delete a book
    const deleteBook = async (id) => {
        const bookService = new BookService();
        const json = await bookService.deleteBook(id);
        console.log(json);
        if (json.status === 'Success') {
            alert('Delete book successfully');
            setBooks(books.filter(book => book.id !== id));
        } else {
            alert('Delete book failed');
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <h1>Kho sách</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tiêu đề</th>
                                <th>Tác giả</th>
                                <th>Chọn hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td><img src={book.img_url} width={100} height={100} alt="" /></td>
                                    <td>{book.book_name}</td>
                                    <td>{book.author}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteBook(book.book_id)}>Xoá</Button>
                                        {/* <Button variant="warning" onClick={() => update(book.id)}>Delete</Button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    );
};