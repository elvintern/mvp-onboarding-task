import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { sendData, CRUDAPI, POST } from '../Utilities';

export default function CreateModal({ show, setShow, fetchCustomers }) {
  const [newCustomer, setNewCustomer] = useState({ name: '', address: '' });
  const handleClose = () => setShow(false);

  const handleClick = () => {
    sendData(POST, CRUDAPI, newCustomer).then((data) => {
      fetchCustomers();
    });

    handleClose();
  };

  const captureUserInput = (e) => {
    setNewCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={captureUserInput} />
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
        <Button variant="success" onClick={handleClick}>
          Create
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
