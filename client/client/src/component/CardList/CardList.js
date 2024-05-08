import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CardList({ category }) {
  const [currentPageStart, setCurrentPageStart] = useState(0);
  const [currentPageEnd, setCurrentPageEnd] = useState(18);
  const [cardData, setCardData] = useState([
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    { title: "Card 1", description: "Description 1", type: "Văn Học" },
    { title: "Card 2", description: "Description 2", type: "Khoa Học" },
    // Add more cards as needed with their respective types
  ]);

  const filteredCards = category === 'all' ? cardData : cardData.filter(card => card.type === category);

  const displayCards = () => {
    return filteredCards
      .slice(currentPageStart, currentPageEnd)
      .map((card, index) => (
        <div key={index} className="col-md-2 mb-4">
          <div className="card"> 
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.description}</p>
              <Link to="/product/detail" className="nav-link"> <a className='btn btn-danger'>Mua</a></Link>
            </div>
          </div>
        </div>
      ));
  };

  // Implement your pagination functions here

  return (
    <div>
      <div className="row mt-3" id="cardRow">
        {displayCards()}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {/* Pagination buttons */}
        </ul>
      </nav>
    </div>
  );
}

export default CardList;