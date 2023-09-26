import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { sendData, CRUDAPI, DELETE } from '../Utilities';

export default function DeleteModal({
  show,
  setShow,
  fetchRecords,
  deleteId,
  setdeleteId,
}) {
  const handleClose = () => {
    setShow((prev) => ({ ...prev, showDelete: false }));
    setdeleteId(null);
  };

  const handleClick = () => {
    sendData(DELETE, `${CRUDAPI}/Customers/${deleteId}`).then(() => {
      fetchRecords();
    });
    handleClose();
  };

  return (
    <Modal show={show.showDelete} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleClick}>
          Delete
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
