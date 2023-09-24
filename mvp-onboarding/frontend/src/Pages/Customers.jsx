import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const response = await fetch('https://localhost:7292/api/Customers');
    const data = await response.json();
    console.log(data);

    setCustomers(data);
  }

  return (
    <div>
      <Button variant="primary">New Customer</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((el) => (
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.address}</td>
              <td>
                <Button variant="warning">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger">
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
