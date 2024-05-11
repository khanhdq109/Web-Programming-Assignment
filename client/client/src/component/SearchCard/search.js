import React, { useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import './Search.css'

function Searchbook() {
  const { query } = useParams();

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);

  

  useEffect(() => {
    getBooks();
  }, [query]);

  function getBooks() {
    fetch('http://localhost:80/api.php/book/read', {
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
        let booksData = data.data;
          const filteredBooks = booksData.filter(bookData => {
            // Check if bookData.name equals the query or contains the query (case insensitive)
            return bookData.book_name.toLowerCase() === query.toLowerCase() || bookData.book_name.toLowerCase().includes(query.toLowerCase());
          });
          setBooks(filteredBooks);
      } else {
        throw new Error('API response is not an array');
      }
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
  }

  // Pagination Logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = books.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Display Cards
  const displayCards = () => {
    return currentCards.map((book, index) => (
        <div key={index} className="card-container">
          <Link to={`/product/detail/${book.book_id}`} className="nav-link">
          <div className="card"> 
            <img 
              src={book.img_url} 
              className="card-img-top" 
              alt={book.book_name} 
            />
            <div className="card-body">
              <h8 className="card-title">{book.book_name}</h8>
              <p className="card-text">{book.price} $</p>
              <Link to={`/product/detail/${book.book_id}`} className="nav-link">
                <a className='btn btn-danger'>Mua</a>
              </Link>
            </div>
          </div>
          </Link>
        </div>

    ));
  };

  // Pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="row mt-3" id="cardRow">
        {displayCards()}
      </div>
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

export default Searchbook;
