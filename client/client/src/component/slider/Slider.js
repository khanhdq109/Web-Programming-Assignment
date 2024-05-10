import React, { useState, useEffect } from 'react';

function Slider() {
  // Danh sách các hình ảnh
  const images = [
    'https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg',
    'https://wattention.com/wp-content/uploads/2018/04/Books-and-coffee.jpg',
    'https://thaihabooks.com/wp-content/uploads/2023/11/Banner-HTXB-851x475px.jpg',
    // Thêm các hình ảnh khác nếu cần
  ];

  // State để lưu trữ vị trí của hình ảnh hiện tại trong danh sách
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function để thay đổi hình ảnh khi click vào mũi tên trái hoặc phải
  const handlePrevClick = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider position-relative">
      {images.map((image, index) => (
        <div key={index} className={`slider-image ${index === currentImageIndex ? 'd-block' : 'd-none'}`}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-100"
            style={{ objectFit: 'cover', height: '75vh' }}
          />
        </div>
      ))}
    </div>
  );
}

export default Slider;
