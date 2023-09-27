import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { sendData, CRUDAPI, PUT } from '../Utilities';
import '../style.css';

export default function UpdateModal({
  show,
  setShow,
  fetchRecords,
  editingRecord,
  setEditingRecord,
}) {
  const handleClose = () => {
    setShow((prev) => ({ ...prev, showUpdate: false }));
    setEditingRecord({});
  };

  const handleClick = () => {
    sendData(
      PUT,
      `${CRUDAPI}/Customers/${editingRecord.id}`,
      editingRecord
    ).then(() => {
      fetchRecords();
    });

    handleClose();
  };

  const captureUserInput = (e) => {
    setEditingRecord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal show={show.showUpdate} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container--input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={captureUserInput}
            value={editingRecord.name || ''}
          />
        </div>
        <div className="container--input">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={captureUserInput}
            value={editingRecord.address || ''}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleClick}>
          Edit
          <FontAwesomeIcon className="btn--icon--ml" icon={faCheck} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
