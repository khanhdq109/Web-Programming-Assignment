import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterGuest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    fullname: '',
    password: '',
    bday: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    try {
        console.log(formData);
      const response = await fetch('http://localhost:80/api.php/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // Register data from your form (e.g., name, email, password)
      });
  
      if (response.ok) { // Assuming successful registration returns status code in the 200 range
        console.log('Registration successful!');
        navigate('/guest/login'); 
      } else {
        const errorData = await response.json(); // Parse error details from response
        console.error('Registration failed:', errorData);
        alert('Registration failed! Please check the details and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };



  return (
    <MDBContainer className="d-flex flex-column w-50">


          <div className="text-center mb-3">
            <h2>Register</h2>

          </div>
        

          <MDBInput wrapperClass='mb-1' label='Username' id='username' type='text' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-1' label='Email' id='email' type='email' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-1' label='Birthday' id='bday' type='date' onChange={handleChange} />
          <MDBInput wrapperClass='mb-1' label='Fullname' id='fullname' type='text' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-1' label='Password' id='password' type='password' onChange={handleChange}/>
          

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>Sign up</MDBBtn>


    </MDBContainer>
  );
}

export default RegisterGuest;
