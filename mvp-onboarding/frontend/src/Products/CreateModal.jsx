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
  const [newData, setNewData] = useState({ name: '', price: null });

  const handleClose = () => setShow((prev) => ({ ...prev, showCreate: false }));
  const handleClick = () => {
    if (newData.name && newData.price) {
      sendData(POST, `${CRUDAPI}/${tableName}`, newData)
        .then(() => {
          fetchRecords();
        })
        .then(() => {
          setNewData({ name: '', price: null });
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
    console.log(newData);
  };

  return (
    <GenericModal
      title="Create product"
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
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={captureUserInput}
          />
        </div>
      </Modal.Body>
    </GenericModal>
  );
}
