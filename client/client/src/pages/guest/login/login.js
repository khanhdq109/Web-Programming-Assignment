
import React, { useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginGuest() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

      const handleChange = (event) => {
        setFormData({ ...formData, [event.target.type]: event.target.value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
      
        try {
          const response = await fetch('http://localhost:80/api.php/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) { // Assuming successful login returns status code in the 200 range
            const data = await response.json();
            // Handle successful login (e.g., store JWT token, redirect to protected area)
            console.log('Login successful!', data);
            // Implement logic to store JWT token (if applicable) and navigate to protected area
          } else {
            const errorData = await response.json();
            toast.error('Login failed! Please check your credentials.', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              toastId: "loginError", // Optional: unique ID for the alert
            });
            console.error('Login failed:', errorData);
          }
        } catch (error) {
          console.error('Error:', error);
          // Display an error message to the user
          alert('An unexpected error occurred. Please try again later.');
        }
      };




  return (
    <MDBContainer fluid className="p-3 my-5 h-custom bg-body-tertiary">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in</p>

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0"></p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={handleChange}/>
          <ToastContainer />
          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={handleSubmit}>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>

        

    </MDBContainer>
  );
}

export default LoginGuest;
