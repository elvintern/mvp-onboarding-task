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
    <GenericModal
      title="Edit customer"
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
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={captureUserInput}
          value={editingRecord?.address || ''}
        />
      </div>
    </GenericModal>
  );
}
