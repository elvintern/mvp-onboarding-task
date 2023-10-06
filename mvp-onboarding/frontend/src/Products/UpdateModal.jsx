import React from 'react';
import { sendData, CRUDAPI, PUT } from '../Utilities';
import '../style.css';
import GenericModal from './GenericModal';

export default function UpdateModal({
  show,
  setShow,
  fetchRecords,
  editingRecord,
  setEditingRecord,
  tableName,
}) {
  const handleClose = () => {
    setShow((prev) => ({ ...prev, showUpdate: false }));
    setEditingRecord({});
  };

  const handleClick = () => {
    if (editingRecord.name && editingRecord.price) {
      sendData(
        PUT,
        `${CRUDAPI}/${tableName}/${editingRecord.id}`,
        editingRecord
      )
        .then(() => {
          fetchRecords();
        })
        .then(() => {
          handleClose();
        });
    } else {
      alert('Check the input values');
    }
  };

  const captureUserInput = (e) => {
    setEditingRecord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <GenericModal
      title="Edit product"
      show={show.showUpdate}
      handleClose={handleClose}
      handleSave={handleClick}
      saveButtonLabel="Edit"
    >
      <div className="container--input">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={captureUserInput}
          value={editingRecord?.name || ''}
        />
      </div>
      <div className="container--input">
        <label htmlFor="address">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          onChange={captureUserInput}
          value={editingRecord?.price || ''}
        />
      </div>
    </GenericModal>
  );
}
