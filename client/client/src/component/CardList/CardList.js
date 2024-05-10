import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CardList.css'

function CardList({ category }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);

  

  useEffect(() => {
    getBooks();
  }, []);

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
        if (category !== "all") {
          let categoryPromises = [];
          let arrBooks = [];
          
          // Iterate over each book data
          booksData.forEach(bookData => {
            // Push the promise returned by getCategory to categoryPromises array
            categoryPromises.push(
              getCategory(bookData.book_id).then(categories => {
                let categoryData = categories.data;
                // Check if the book belongs to the desired category
                categoryData.forEach(bookid => {
                  if (bookid.category_name === category) {
                    arrBooks.push(bookData);
                    return; // Exit the loop if found
                  }
                });
              })
            );
          });
          // Wait for all promises to resolve
          Promise.all(categoryPromises)
            .then(() => {
              setBooks(arrBooks);
            })
            .catch(error => {
              console.error('Error fetching category details:', error);
            });
        } else {

          setBooks(booksData);
        }
      } else {
        throw new Error('API response is not an array');
      }
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
  }

  function getCategory(bookId) {
    return fetch(`http://localhost:80/api.php/category/readCategories/${bookId}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    })
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

export default CardList;
