import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { book_id } = useParams();

  const [bookDetails, setBookDetails] = useState(null);

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
               {/* thumbs-wrap.// */}
               {/* gallery-wrap .end// */}
             </aside>
             <main className="col-lg-6">
               <div className="ps-lg-3">
                 <h4 className="title text-dark">
                   {bookDetails.book_name}
                 </h4>
                 <div className="d-flex flex-row my-3">
                   <div className="text-warning mb-1 me-2">
                     <i className="fa fa-star"></i>
                     <i className="fa fa-star"></i>
                     <i className="fa fa-star"></i>
                     <i className="fa fa-star"></i>
                     <i className="fas fa-star-half-alt"></i>
                     <span className="ms-1">4.5</span>
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
                       <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                         <i className="fas fa-minus"></i>
                       </button>
                       <input
                         type="text"
                         className="form-control text-center border border-secondary"
                         placeholder="14"
                         aria-label="Example text with button addon"
                         aria-describedby="button-addon1"
                       />
                       <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                         <i className="fas fa-plus"></i>
                       </button>
                     </div>
                   </div>
                 </div>
   
                 <a href="#" className="p-2 btn btn-primary shadow-0">
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
