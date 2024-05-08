import React, { useState } from 'react'

export const Breadcrumb = () => {
    // Sau này sẽ khởi tạo bằng context react
    const initialBreadcrumb = {
        items: ['Trang chủ', 'Quản trị viên'],
        links: ['/', '/'],
        activeIndex: 1,
    }
    const [breadcrumb] = useState(initialBreadcrumb);
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {breadcrumb.items && breadcrumb.items.map((item, index) => (
                    <li key={index} className={`breadcrumb-item ${index === breadcrumb.activeIndex ? 'active' : ''}`} aria-current={index === breadcrumb.activeIndex ? 'page' : undefined}>
                        {index === breadcrumb.activeIndex ? item : <a href={breadcrumb.links[index]}>{item}</a>}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
