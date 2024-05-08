import React, { useState } from 'react';

function Slider() {
  // Danh sách các hình ảnh
  const images = [
    'https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg',
    'https://wattention.com/wp-content/uploads/2018/04/Books-and-coffee.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSmGgT7weEAm6FVlfp80ovibgepDhIV54a8ZyrBUV3aYpq8GHbIejsF-Y31xJ3TDeAUnY&usqp=CAU',
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

  return (
    <div className="slider position-relative">
      {images.map((image, index) => (
        <div key={index} className={`slider-image ${index === currentImageIndex ? 'd-block' : 'd-none'}`}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-100"
            style={{ objectFit: 'cover', height: '50vh' }} // Chỉ hiển thị 1/2 dọc của ảnh
          />
        </div>
      ))}
      <button className="position-absolute top-50 start-0 translate-middle-y" onClick={handlePrevClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
        </svg>
            
        </button>
      <button className="position-absolute top-50 end-0 translate-middle-y" onClick={handleNextClick}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
            </svg>
      </button>
    </div>
  );
}

export default Slider;
