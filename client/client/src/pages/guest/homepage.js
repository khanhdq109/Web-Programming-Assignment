import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';

function Homepage() {
  const [currentPageStart, setCurrentPageStart] = useState(0);
  const [currentPageEnd, setCurrentPageEnd] = useState(18);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cardData, setCardData] = useState({
    'all': [
      { title: "Card 1", description: "Description 1" },
      { title: "Card 2", description: "Description 2" },
      { title: "Card 3", description: "Description 3" },
      { title: "Card 4", description: "Description 4" },
      { title: "Card 5", description: "Description 5" },
      { title: "Card 6", description: "Description 6" },
      { title: "Card 7", description: "Description 7" },
      { title: "Card 8", description: "Description 8" },
      { title: "Card 9", description: "Description 9" },
      { title: "Card 10", description: "Description 10" },
      { title: "Card 1", description: "Description 1" },
      { title: "Card 2", description: "Description 2" },
      { title: "Card 3", description: "Description 3" },
      { title: "Card 4", description: "Description 4" },
      { title: "Card 5", description: "Description 5" },
      { title: "Card 6", description: "Description 6" },
      { title: "Card 7", description: "Description 7" },
      { title: "Card 8", description: "Description 8" },
      { title: "Card 9", description: "Description 9" },
      { title: "Card 10", description: "Description 10" },
      { title: "Card 1", description: "Description 1" },
      { title: "Card 2", description: "Description 2" },
      { title: "Card 3", description: "Description 3" },
      { title: "Card 4", description: "Description 4" },
      { title: "Card 5", description: "Description 5" },
      { title: "Card 6", description: "Description 6" },
      { title: "Card 7", description: "Description 7" },
      { title: "Card 8", description: "Description 8" },
      { title: "Card 9", description: "Description 9" },
      { title: "Card 10", description: "Description 10" }
    ],
    'Khoa Học': [
      { title: "Card 11", description: "Description 11" },
      { title: "Card 12", description: "Description 12" },
      { title: "Card 13", description: "Description 13" },
      { title: "Card 14", description: "Description 14" },
      { title: "Card 18", description: "Description 18" },
      // Thêm các card khác nếu cần
    ],
    'Văn Học': [
      { title: "Card 16", description: "Description 16" },
      { title: "Card 17", description: "Description 17" },
      { title: "Card 18", description: "Description 18" },
      { title: "Card 19", description: "Description 19" },
      { title: "Card 20", description: "Description 20" },
      // Thêm các card khác nếu cần
    ],
    // Thêm danh sách card cho các loại khác
  });

  const displayCards = () => {
    return cardData[selectedCategory]
      .slice(currentPageStart, currentPageEnd)
      .map((card, index) => (
        <div key={index} className="col-md-2 mb-4">
          <div className="card"> 
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.description}</p>
              <button className="btn btn-danger">Mua</button>
            </div>
          </div>
        </div>
      ));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPageStart(0);
    setCurrentPageEnd(18);
  };

  const handlePreviousPage = () => {
    if (currentPageStart >= 18) {
      setCurrentPageStart(currentPageStart - 18);
      setCurrentPageEnd(currentPageEnd - 18);
    }
  };

  const handleNextPage = () => {
    const maxCards = cardData[selectedCategory]?.length || 0;
    if (currentPageEnd < maxCards) {
      setCurrentPageStart(currentPageStart + 18);
      setCurrentPageEnd(currentPageEnd + 18);
    }
  };

  const handlePageChange = (start) => {
    setCurrentPageStart(start);
    setCurrentPageEnd(start + 18);
};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <nav className="list-group">
            <a href="#" class="list-group-item list-group-item-action bg-success-subtle" aria-current="page">Categories</a>
            <a href="#" className={`list-group-item list-group-item-action ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => handleCategoryClick('all')}>Tất cả</a>
            <a href="#" className={`list-group-item list-group-item-action ${selectedCategory === 'Khoa Học' ? 'active' : ''}`} onClick={() => handleCategoryClick('Khoa Học')}>Khoa Học</a>
            <a href="#" className={`list-group-item list-group-item-action ${selectedCategory === 'Văn Học' ? 'active' : ''}`} onClick={() => handleCategoryClick('Văn Học')}>Văn Học</a>
            {/* Thêm các loại khác */}
          </nav>
        </div>
        <div className="col-md-9">
            <div className="row-md-3">
            <nav class="navbar navbar-expand-sm bg-secondary-subtle">
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            <ul class="navbar-nav me-auto">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#">Trang chủ</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Sản phẩm</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Tin tức</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Liên hệ</a>
                                </li>
                            </ul>
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Đăng nhập</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Đăng ký</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
          <div className="row mt-3" id="cardRow">
            {displayCards()}
          </div>

            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                <li className="page-item disabled" onClick={handlePreviousPage}>
                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                </li>
                {Array.from(Array(Math.ceil(cardData[selectedCategory]?.length / 18)).keys()).map((pageNumber) => (
                    <li className={`page-item ${pageNumber * 18 === currentPageStart ? 'active' : ''}`} key={pageNumber}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(pageNumber * 18)}>{pageNumber + 1}</a>
                    </li>
                ))}
                <li className="page-item" onClick={handleNextPage}>
                    <a className="page-link" href="#">Next</a>
                </li>
                </ul>
            </nav>
        </div>
      </div>
      
    </div>
  );
}

export default Homepage;