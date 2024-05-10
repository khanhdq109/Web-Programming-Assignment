import React, { useState, useEffect } from 'react';

const Test = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:80/api.php/book');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data ? (
            <div>
              <h2>Books</h2>
              <ul>
                {data.map(book => (
                  <li key={book.id}>{book.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Test;
