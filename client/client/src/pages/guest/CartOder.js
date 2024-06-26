import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import CartOrderItem from '../../component/CartOrderItem/CartOrderItem';

export default function CartOrder() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate()
  const { user_id } = useParams();
  const handleAddtoOrder = async (event) => {
    event.preventDefault();
      try {
        const response = await fetch(`http://localhost:80/api.php/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'user_id': user_id,
          'name': name,
          'email': email,
          'address': address,
          'phone_number': phoneNumber,
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

  };

  return (
    <section className="h-100 h-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBTable responsive>
              <MDBTableHead>
                <tr>
                  <th scope="col" className="h5">
                    Shopping Bag
                  </th>
                  <th scope="col">Format</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img
                        src="https://i.imgur.com/2DsA49b.webp"
                        fluid
                        className="rounded-3"
                        style={{ width: "120px" }}
                        alt="Book"
                      />
                      <div className="flex-column ms-4">
                        <p className="mb-2">Thinking, Fast and Slow</p>
                        <p className="mb-0">Daniel Kahneman</p>
                      </div>
                    </div>
                  </th>
                  <td className="align-middle">
                    <p className="mb-0" style={{ fontWeight: "500" }}>
                      Digital
                    </p>
                  </td>
                  <td className="align-middle">
                    <div class="d-flex flex-row align-items-center">
                      <MDBBtn className="px-2" color="link">
                        <MDBIcon fas icon="minus" />
                      </MDBBtn>

                      <MDBInput
                        min={0}
                        type="number"
                        size="sm"
                        style={{ width: "50px" }}
                        defaultValue={2}
                      />

                      <MDBBtn className="px-2" color="link">
                        <MDBIcon fas icon="plus" />
                      </MDBBtn>
                    </div>
                  </td>
                  <td className="align-middle">
                    <p className="mb-0" style={{ fontWeight: "500" }}>
                      $9.99
                    </p>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img
                        src="https://i.imgur.com/Oj1iQUX.webp"
                        fluid
                        className="rounded-3"
                        style={{ width: "120px" }}
                        alt="Book"
                      />
                      <div className="flex-column ms-4">
                        <p className="mb-2">
                          Homo Deus: A Brief History of Tomorrow
                        </p>
                        <p className="mb-0">Yuval Noah Harari</p>
                      </div>
                    </div>
                  </th>
                  <td className="align-middle">
                    <p className="mb-0" style={{ fontWeight: "500" }}>
                      Paperback
                    </p>
                  </td>
                  <td className="align-middle">
                    <div class="d-flex flex-row align-items-center">
                      <MDBBtn className="px-2" color="link">
                        <MDBIcon fas icon="minus" />
                      </MDBBtn>

                      <MDBInput
                        min={0}
                        type="number"
                        size="sm"
                        style={{ width: "50px" }}
                        defaultValue={1}
                      />

                      <MDBBtn className="px-2" color="link">
                        <MDBIcon fas icon="plus" />
                      </MDBBtn>
                    </div>
                  </td>
                  <td className="align-middle">
                    <p className="mb-0" style={{ fontWeight: "500" }}>
                      $13.50
                    </p>
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </MDBCol>
          <MDBCard
            className="shadow-2-strong mb-5 mb-lg-0"
            style={{ borderRadius: "16px" }}
          >
            <MDBCardBody className="p-4">
              <MDBRow>
                <MDBCol md="6" lg="4" xl="6">
                  <MDBRow>
                    <MDBCol size="12" xl="6">
                      <MDBInput
                        className="mb-4 mb-xl-1"
                        label="Name"
                        placeholder="John Smiths"
                        size="lg"
                        value={name} // State variable to store user's name
                        onChange={(e) => setName(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol size="12" xl="6">
                      <MDBInput
                        className="mb-4 mb-xl-1"
                        label="email"
                        placeholder="example@example.com"
                        size="lg"
                        minlength="19"
                        maxlength="19"
                        value={email} // State variable to store user's name
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol size="12" xl="6">
                      <MDBInput
                        className="mb-4 mb-xl-1"
                        label="Address"
                        placeholder=""
                        size="lg"
                        value={address} // State variable to store user's name
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol size="12" xl="6">
                      <MDBInput
                        className="mb-4 mb-xl-1"
                        label="phone number"
                        placeholder="092xxxxxx"
                        size="lg"
                        minlength="19"
                        maxlength="19"
                        value={phoneNumber} // State variable to store user's name
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol lg="4" xl="3">
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">$23.49</p>
                  </div>

                  <div
                    className="d-flex justify-content-between"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-0">Shipping</p>
                    <p className="mb-0">$2.99</p>
                  </div>

                  <hr className="my-4" />

                  <div
                    className="d-flex justify-content-between mb-4"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-2">Total (tax included)</p>
                    <p className="mb-2">$26.48</p>
                  </div>

                  <MDBBtn block size="lg" onClick={handleAddtoOrder}>
                    <div className="d-flex justify-content-between">
                      <span>Checkout</span>
                      <span>$26.48</span>
                    </div>
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}