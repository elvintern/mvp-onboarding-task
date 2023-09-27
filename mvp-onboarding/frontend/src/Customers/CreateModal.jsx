import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { sendData, CRUDAPI, POST } from '../Utilities';
import '../style.css';

export default function CreateModal({ show, setShow, fetchRecords }) {
  const [newCustomer, setNewCustomer] = useState({ name: '', address: '' });

  const handleClose = () => setShow((prev) => ({ ...prev, showCreate: false }));
  const handleClick = () => {
    sendData(POST, `${CRUDAPI}/Customers`, newCustomer).then(() => {
      fetchRecords();
    });

    handleClose();
  };

  const captureUserInput = (e) => {
    setNewCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal show={show.showCreate} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container--input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={captureUserInput}
          />
        </div>
        <div className="container--input">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={captureUserInput}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleClick}>
          Create
          <FontAwesomeIcon className="btn--icon--ml" icon={faCheck} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
