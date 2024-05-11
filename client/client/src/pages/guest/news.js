import React, { useState, useEffect } from 'react';

const News = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(1);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        getNews();
    }, []);
    
    function getNews() {
        fetch('http://localhost:80/api.php/news/read', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data.data)) {
                setNews(data.data);
            } else {
                throw new Error('API response is not an array');
            }
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
    }

    const toggleContent = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const displayCardNews = () => {
        return currentCards.map((newsItem, index) => (
            <div key={index}>
                <div className="row">
                    <div className="col-4">
                        <img src={newsItem.img} style={{ width: '100%', height: expandedIndex === index ? '50%' : '100%' }} />
                    </div>
                    <div className="col">
                        <div className="card bg-light" style={{ width: '100%' }}>
                            <div className="card-body text-right">
                                <h5 className="card-title">{newsItem.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{newsItem.publish_date}</h6>
                                <p className="card-text">{expandedIndex === index ? newsItem.content : `${newsItem.content.slice(0, 100)}...`}
                                    <button className="btn btn-link" onClick={() => toggleContent(index)}>
                                        {expandedIndex === index ? 'Collapse' : 'Read More'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = news.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(news.length / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container-fluid"> 
            {displayCardNews()}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} href="#!" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default News;
