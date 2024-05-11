import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Sidebar } from '../Sidebar/Sidebar';
import { NewService } from '../services/NewService';
import { AdminNav } from '../../../component/AdminNav/AdminNav';
import { useNavigate } from 'react-router-dom';

export const EditNews = () => {
    const [title, setTitle] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [tag, setTag] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const newsId = window.location.pathname.split('/').pop();
            const newService = new NewService();
            const json = await newService.findById(newsId);
            console.log(json);
            if (json.status === 'Success') {
                const data = json.data[0];
                setTitle(data.title);
                setPublishDate(data.publish_date);
                setTag(data.tag);
                setContent(data.content);
            }
        };
        fetchData();
    }, []);

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
        const newsId = window.location.pathname.split('/').pop();
        const newService = new NewService();
        const json = await newService.update(newsId, title, publishDate, tag, content);
        console.log(json);
        if (json.status === 'Success') {
            alert('Update news successfully');
            navigate('/admin/dashboard?tab=1')
        } else {
            alert('Update news failed');
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
}
