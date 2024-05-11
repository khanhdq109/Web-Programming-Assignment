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
    name: '',
    email: '',
    address: '',
    phone: '',
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        'https://localhost:80/api/register',
        formData
      );
  
      if (response.status === 201) {
        console.log('Registration successful!');
        navigate('/guest/login');
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <MDBContainer className="d-flex flex-column w-50">


          <div className="text-center mb-3">
            <h2>Register</h2>

          </div>

          <MDBInput wrapperClass='mb-1' label='Name' id='form1' type='text' onChange={handleChange}/>         
          <MDBInput wrapperClass='mb-1' label='Email' id='form1' type='email' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-1' label='Address' id='form1' type='text' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-1' label='Birth day' id='form1' type='date' onChange={handleChange}/>

          <MDBInput wrapperClass='mb-1' label='Username' id='form1' type='text' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-1' label='Password' id='form1' type='password' onChange={handleChange}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>Sign up</MDBBtn>


    </MDBContainer>
  );
}

export default RegisterGuest;
