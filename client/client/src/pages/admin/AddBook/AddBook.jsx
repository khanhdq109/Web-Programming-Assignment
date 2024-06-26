import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Sidebar } from '../Sidebar/Sidebar';
import BookService from '../services/BookService';
import { AdminNav } from '../../../component/AdminNav/AdminNav';

export const AddBook = () => {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [bookCover, setBookCover] = useState('');
    const [pageNum, setPageNum] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [description, setDescription] = useState('');
    const [onSale, setOnSale] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'bookName') {
            setBookName(value);
        } else if (name === 'author') {
            setAuthor(value);
        } else if (name === 'price') {
            setPrice(value);
        } else if (name === 'imgUrl') {
            setImgUrl(value);
        } else if (name === 'bookCover') {
            setBookCover(value);
        } else if (name === 'pageNum') {
            setPageNum(value);
        } else if (name === 'publisher') {
            setPublisher(value);
        } else if (name === 'publicationDate') {
            setPublicationDate(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'onSale') {
            setOnSale(e.target.checked);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookService = new BookService();
        const json = await bookService.addBook(bookName, author, price, imgUrl, bookCover, pageNum, publisher, publicationDate, description, onSale);
        console.log(json);
        if (json.status === 'Success') {
            alert('Add book successfully');
        } else {
            alert('Add book failed');
        }
    };

    return (
        <div className="container">
            <AdminNav />
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="bookName">
                            <Form.Label>Book Name:</Form.Label>
                            <Form.Control type="text" name="bookName" value={bookName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="bookName">
                            <Form.Label>Author:</Form.Label>
                            <Form.Control type="text" name="author" value={author} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="text" name="price" value={price} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="imgUrl">
                            <Form.Label>Image URL:</Form.Label>
                            <Form.Control type="text" name="imgUrl" value={imgUrl} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="bookCover">
                            <Form.Label>Book Cover:</Form.Label>
                            <Form.Control type="text" name="bookCover" value={bookCover} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="pageNum">
                            <Form.Label>Page Number:</Form.Label>
                            <Form.Control type="text" name="pageNum" value={pageNum} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="publisher">
                            <Form.Label>Publisher:</Form.Label>
                            <Form.Control type="text" name="publisher" value={publisher} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="publicationDate">
                            <Form.Label>Publication Date:</Form.Label>
                            <Form.Control type="date" name="publicationDate" value={publicationDate} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" name="description" value={description} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="onSale">
                            <Form.Check type="checkbox" name="onSale" checked={onSale} onChange={handleInputChange} label="On Sale" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Book</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};