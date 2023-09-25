import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { sendData, CRUDAPI, PUT } from '../Utilities';

export default function UpdateModal({
  show,
  setShow,
  fetchCustomers,
  editingCustomer,
  setEditingCustomer,
}) {
  const handleClose = () => {
    setShow(false);
    setEditingCustomer({});
  };

  const handleClick = () => {
    sendData(PUT, `${CRUDAPI}/${editingCustomer.id}`, editingCustomer).then(
      (data) => {
        console.log(data);
        fetchCustomers();
      }
    );

    handleClose();
  };

  const captureUserInput = (e) => {
    setEditingCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={captureUserInput}
          value={editingCustomer.name || ''}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={captureUserInput}
          value={editingCustomer.address || ''}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleClick}>
          Edit
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
