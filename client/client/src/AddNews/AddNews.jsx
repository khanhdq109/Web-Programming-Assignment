import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AdminNav } from '../component/AdminNav/AdminNav';
import { Sidebar } from '../pages/admin/Sidebar/Sidebar';
import { NewService } from '../pages/admin/services/NewService';

const AddNews = () => {
    const [title, setTitle] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [tag, setTag] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handlePublishDateChange = (e) => {
        setPublishDate(e.target.value);
    };

    const handleTagChange = (e) => {
        setTag(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newService = new NewService();
        const json = await newService.addNews(title, publishDate, tag, content);
        console.log(json);
        if (json.status === 'Success') {
            alert('Add news successfully');
        } else {
            alert('Add news failed');
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

                    <h1>Thêm tin tức</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" value={title} onChange={handleTitleChange} />
                        </Form.Group>
                        <Form.Group controlId="publishDate">
                            <Form.Label>Publish Date:</Form.Label>
                            <Form.Control type="date" value={publishDate} onChange={handlePublishDateChange} />
                        </Form.Group>
                        <Form.Group controlId="tag">
                            <Form.Label>Tag:</Form.Label>
                            <Form.Control type="text" value={tag} onChange={handleTagChange} />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>Content:</Form.Label>
                            <Form.Control as="textarea" value={content} onChange={handleContentChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddNews;