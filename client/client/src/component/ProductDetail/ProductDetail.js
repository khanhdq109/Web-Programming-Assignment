import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { getUserId } from '../AutheUser';

function ProductDetail() {
  const { book_id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [bookDetails, setBookDetails] = useState(null);

  const navigate = useNavigate()


  console.log(getUserId())
  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = () => {
    fetch(`http://localhost:80/api.php/book/read/${book_id}`, {
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
      setBookDetails(data.data[0]);
    })
    .catch(error => {
      console.error('Error fetching book details:', error);
    });
  };

  const handleChangeQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity <= 0) {
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleAddtoCart = async (event) => {
    event.preventDefault();
    if(getUserId()!=null){
      try {
        const response = await fetch(`http://localhost:80/api.php/cart/create/${getUserId()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'user_id': getUserId(),
          'book_id': book_id,
        })
      });
  
      if (response.ok) {
        console.log('Add successful!');
        navigate(`/all`)
      } else {
        const errorData = await response.json();
        console.error('Add failed:', errorData);
        alert('Add cart failed! Please check the details and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
    }
    else{
      navigate('/guest/login');
    }
  };

  return (
    <div>
      {bookDetails && (
         <section className="py-5">
         <div className="container">
           <div className="row gx-5">
             <aside className="col-lg-6">
               <div className="border rounded-4 mb-3 d-flex justify-content-center">
                 <a
                   data-fslightbox="mygalley"
                   className="rounded-4"
                   target="_blank"
                   data-type="image"
                   href={bookDetails.img_url}
                 >
                   <img
                     style={{ maxWidth: '75%', maxHeight: '75vh', margin: 'auto' }}
                     className="rounded-4 fit"
                     src={bookDetails.img_url}
                     alt=""
                   />
                 </a>
               </div>
               <div className="d-flex justify-content-center mb-3">
                 
               </div>
             </aside>
             <main className="col-lg-6">
               <div className="ps-lg-3">
                 <h4 className="title text-dark">
                   {bookDetails.book_name}
                 </h4>
                 <div className="d-flex flex-row my-3">
                   <div className="text-warning mb-1 me-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star-half" viewBox="0 0 16 16">
  <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
</svg>
                     <span className="ms-1">4.5 </span>
                   </div>
                   <span className="text-muted">
                     <i className="fas fa-shopping-basket fa-sm mx-1"></i>{bookDetails.on_sale} orders
                   </span>
                   <span className="text-success ms-2">In stock</span>
                 </div>
   
                 <div className="mb-3">
                   <span className="h5">{bookDetails.price} $</span>
                   <span className="text-muted">/per</span>
                 </div>
   
                 <p>
                   {bookDetails.description}
                 </p>
   
                 <div className="row">
                   <dt className="col-3">Author:</dt>
                   <dd className="col-9">{bookDetails.author}</dd>
   
                   <dt className="col-3">Language:</dt>
                   <dd className="col-9">{bookDetails.language}</dd>
   
                   <dt className="col-3">Publication Date:</dt>
                   <dd className="col-9">{bookDetails.publication_date}</dd>
   
                   <dt className="col-3">Pushlisher:</dt>
                   <dd className="col-9">{bookDetails.publisher}</dd>
                 </div>
   
                 <hr />
   
                 <div className="row mb-1">
                   {/* col.// */}
                   <div className="col-md-2 col-6 mb-3">
                     <label className="mb-2 d-block">Quantity</label>
                     <div className="input-group mb-3" style={{ width: '170px' }}>
                        <input
                          type="number" // Set type to "number" for validation
                          min="1" // Set minimum quantity to 1
                          value={quantity} // Bind quantity state to input value
                          onChange={handleChangeQuantity}
                          className="form-control text-center border border-secondary"
                          placeholder="Quantity"
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />
                     </div>
                   </div>
                 </div>
   
                 <a onClick={handleAddtoCart} className="p-2 btn btn-primary shadow-0">
                   <i className="me-1 fa fa-shopping-basket"></i> Add to cart
                 </a>
   
               </div>
             </main>
           </div>
         </div>
       </section>
    )}
    </div>
  );
}

export default ProductDetail;
