import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { sendData, CRUDAPI, POST } from '../Utilities';
import '../style.css';
import GenericModal from './GenericModal';

export default function CreateModal({
  show,
  setShow,
  fetchRecords,
  tableName,
}) {
  const [newData, setNewData] = useState({ name: '', address: null });

  const handleClose = () => setShow((prev) => ({ ...prev, showCreate: false }));
  const handleClick = () => {
    if (newData.name && newData.address) {
      sendData(POST, `${CRUDAPI}/${tableName}`, newData)
        .then(() => {
          fetchRecords();
        })
        .then(() => {
          setNewData({ name: '', address: null });
        })
        .then(() => {
          handleClose();
        });
    } else {
      alert('Check the input values');
    }
  };

  const captureUserInput = (e) => {
    setNewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <GenericModal
      title="Create store"
      show={show.showCreate}
      handleClose={handleClose}
      handleSave={handleClick}
      saveButtonLabel="Create"
    >
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
    </GenericModal>
  );
}
