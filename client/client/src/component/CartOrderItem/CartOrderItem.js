import React from 'react';
import { useParams } from 'react-router-dom';
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


function CartOrderItem({ itemData }) {
    // Handle potential missing data gracefully
    return (
      <tr>
        <th scope="row">
          <div className="d-flex align-items-center">
            <img
              src={itemData.img_url}
              fluid
              className="rounded-3"
              style={{ width: "120px" }}
            />
            <div className="flex-column ms-4">
              <p className="mb-2">{itemData.book_name}</p>
              <p className="mb-0">{itemData.author}</p>
            </div>
          </div>
        </th>
        <td className="align-middle">
          <p className="mb-0" style={{ fontWeight: "500" }}>
            {itemData.language}
          </p>
        </td>
        <td className="align-middle">
          <div className="d-flex flex-row align-items-center">
            <MDBBtn className="px-2" color="link">
              <MDBIcon fas icon="minus" />
            </MDBBtn>
  
            <MDBInput
              min={0}
              type="number"
              size="sm"
              style={{ width: "50px" }}
              defaultValue={1} // Use provided quantity
            />
  
            <MDBBtn className="px-2" color="link">
              <MDBIcon fas icon="plus" />
            </MDBBtn>
          </div>
        </td>
        <td className="align-middle">
          <p className="mb-0" style={{ fontWeight: "500" }}>
            ${itemData.price.toFixed(2)}  {/* Format price with two decimal places */}
          </p>
        </td>
      </tr>
    );
  }

  export default CartOrderItem;