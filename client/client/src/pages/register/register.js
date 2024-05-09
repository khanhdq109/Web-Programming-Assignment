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

function Register() {

  return (
    <MDBContainer className="d-flex flex-column w-50">


          <div className="text-center mb-3">
            <h2>Register</h2>

          </div>

          <MDBInput wrapperClass='mb-1' label='Name' id='form1' type='text'/>         
          <MDBInput wrapperClass='mb-1' label='Email' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-1' label='Address' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-1' label='Phone' id='form1' type='text'/>

          <MDBInput wrapperClass='mb-1' label='Username' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-1' label='Password' id='form1' type='password'/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>



    </MDBContainer>
  );
}

export default Register;