import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CardList.css'

function CardList({ category }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);

  

  useEffect(() => {
    fetchBooks(category);
  }, [category]);

  const fetchBooks = async (selectedCategory) => {
    try {
      const response = await fetch('http://localhost:80/api.php/book/read', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!Array.isArray(data.data)) {
        throw new Error('API response is not an array');
      }

      const booksData = data.data;
      let filteredBooks;

      if (selectedCategory !== 'all') {
        filteredBooks = await Promise.all(
          booksData.map(async (bookData) => {
            const categories = await fetchCategory(bookData.book_id);
            if (categories.data.some((cat) => cat.category_name === selectedCategory)) {
              return bookData;
            }
            return null; // Exclude books not belonging to the category
          })
        );
      } else {
        filteredBooks = booksData;
      }

      setBooks(filteredBooks.filter(Boolean)); // Remove null values from filtered data
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchCategory = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:80/api.php/category/readCategories/${bookId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


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

export default CardList;
