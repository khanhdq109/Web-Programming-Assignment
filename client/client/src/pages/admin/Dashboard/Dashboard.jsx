import React, { useEffect, useRef, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import BookService from '../services/BookService';
import { Sidebar } from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { AdminNav } from '../../../component/AdminNav/AdminNav';
import { NewService } from '../services/NewService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [news, setNews] = useState([]);
    const [activeIndex, setActiveIndex] = useState();
    const ulRef = useRef();
    const tabContentRef = useRef();

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const tabParam = urlSearchParams.get('tab');
        if (tabParam) {
            const index = parseInt(tabParam);
            setActiveIndex(index);
        } else {
            setActiveIndex(0);
        }
    }, []);

    useEffect(() => {
        const fecthData = async () => {
            const bookService = new BookService();
            const bookJson = await bookService.findAll();
            if (bookJson.status === 'Success')
                setBooks(bookJson.data);

            const newService = new NewService();
            const newsJson = await newService.findAll();
            if (newsJson.status === 'Success')
                setNews(newsJson.data);
        }
        fecthData();
    }, [])
    useEffect(() => {
        const links = ulRef.current.querySelectorAll('.nav-link');
        const tabPanes = tabContentRef.current.querySelectorAll('.tab-pane');

        tabPanes.forEach((tabPane, index) => {
            tabPane.classList.toggle('show', index === activeIndex);
            tabPane.classList.toggle('active', index === activeIndex);
        })

        links.forEach((link, index) => {
            link.classList.toggle('active', index === activeIndex);
        })

        links.forEach((link, index) => {
            link.addEventListener('click', () => {
                setActiveIndex(index);
            });
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener('click', () => {
                    setActiveIndex(0);
                });
            });
        }
    }, [activeIndex])

    // Function to delete a book
    const deleteBook = async (id) => {
        const bookService = new BookService();
        const json = await bookService.deleteBook(id);
        console.log(json);
        if (json.status === 'Success') {
            alert('Delete book successfully');
            const newBooks = books.filter(book => book.book_id !== id)
            setBooks(newBooks);
        } else {
            alert('Delete book failed');
        }
    };

    const deleteNews = async (id) => {
        const newService = new NewService();
        const json = await newService.deleteNews(id);
        console.log(json);
        if (json.status === 'Success') {
            alert('Delete news successfully');
            const newNews = news.filter(n => n.id !== id);
            setNews(newNews);
        } else {
            alert('Delete news failed');
        }
    }

    return (
        <div className='container'>
            <AdminNav />
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <ul ref={ulRef} className="nav nav-tabs">
                        <li className="nav-item">
                            <Link to='#' className="nav-link active" id="books-tab" data-toggle="tab" role="tab" aria-controls="books" aria-selected="true">Kho sách</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='#' className="nav-link" id="news-tab" data-toggle="tab" role="tab" aria-controls="news" aria-selected="false">Tin tức</Link>
                        </li>
                    </ul>
                    <div ref={tabContentRef} className="tab-content mt-3">
                        <div className="tab-pane fade show active" id="books" role="tabpanel" aria-labelledby="books-tab">
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
                                                <Link to={`/admin/edit-book/${book.book_id}`} className="btn btn-warning">Sửa sách</Link>
                                                <Button variant="danger" onClick={() => deleteBook(book.book_id)}>Xoá</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="tab-pane fade" id="news" role="tabpanel" aria-labelledby="news-tab">
                            <h1>Tin tức</h1>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Tiêu đề</th>
                                        <th>Ngày đăng</th>
                                        <th>Tag</th>
                                        <th>Chọn hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news.map((n) => (
                                        <tr key={n.id}>
                                            <td>{n.title}</td>
                                            <td>{n.publish_date}</td>
                                            <td>{n.tag}</td>
                                            <td>
                                                <Link to={`/admin/edit-news/${n.id}`} className="btn btn-warning">
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Link>
                                                <Button onClick={() => { deleteNews(n.id) }} className="ms-3" variant="danger">Xoá</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};