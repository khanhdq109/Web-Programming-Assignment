import React from 'react';
import { AdminNav } from '../../../component/AdminNav/AdminNav';
import { Sidebar } from '../Sidebar/Sidebar';
import '../assets/scss/Comment.scss'

export const Comment = () => {
    // Generate comments data
    const comments = [
        { id: 1, author: 'はしばし', content: 'この商品はとてもいい商品ですから、もう一回買いたいんだ、配達品が無料のほうがいい' },
        { id: 2, author: 'Jane', content: 'This is the most interested book that i ever read' },
        { id: 3, author: 'Mike', content: 'Thanks for sharing.' },
        { id: 4, author: 'John', content: 'I really enjoyed reading this article. Great job!' },
        { id: 5, author: 'Sarah', content: 'The information provided here is very helpful. Thank you!' },
        { id: 6, author: 'はしばし', content: 'この商品はとてもいい商品ですから、もう一回買いたいんだ、配達品が無料のほうがいい' },
        { id: 7, author: 'Jane', content: 'This is the most interested book that i ever read' },
        { id: 8, author: 'Mike', content: 'Thanks for sharing.' },
        { id: 9, author: 'John', content: 'I really enjoyed reading this article. Great job!' },
        { id: 10, author: 'Sarah', content: 'The information provided here is very helpful. Thank you!' }
        // Add more comments here
    ];

    return (
        <div className="container">
            <AdminNav />
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    {/* Render comments */}
                    {comments.map(comment => (
                        <div key={comment.id} className="comment shadow p-4 mb-3">
                            <h4>{comment.author}</h4>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};