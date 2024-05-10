import React, { useState, useEffect } from 'react';

const Test = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log(data.data);
      if (Array.isArray(data.data)) {
        setBooks(data.data);
      } else {
        setError(new Error('API response is not an array'));
      }
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      setError(error);
      setIsLoading(false);
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (books.length === 0) {
    return <div>No books found.</div>;
  }
  
  return (
    <div>
      <h1>List of Books</h1>
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>On Sale</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, key) =>
            <tr key={key}>
              <td>{book.book_id}</td>
              <td>{book.book_name}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.on_sale}%</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Test;