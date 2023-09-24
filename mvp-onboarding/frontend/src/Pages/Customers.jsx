import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrash,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', address: '' });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const captureUserInput = (e) => {
    setNewCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function fetchCustomers() {
    const response = await fetch('https://localhost:7292/api/Customers');
    const data = await response.json();
    setCustomers(data);
  }

  const createCustomer = () => {
    postData('https://localhost:7292/api/Customers', newCustomer).then(
      (data) => {
        console.log(data);
        fetchCustomers();
      }
    );
    handleClose();
  };

  const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        New Customer
      </Button>

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

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={captureUserInput}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={captureUserInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={createCustomer}>
            Create
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
