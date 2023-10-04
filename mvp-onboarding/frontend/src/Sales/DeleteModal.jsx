import React from 'react';
import GenericModal from './GenericModal';
import { sendData, CRUDAPI, DELETE } from '../Utilities';

export default function DeleteModal({
  show,
  setShow,
  fetchRecords,
  deleteId,
  setDeleteId,
  tableName,
}) {
  const handleClose = () => {
    setShow((prev) => ({ ...prev, showDelete: false }));
    setDeleteId(null);
  };

  const handleClick = () => {
    sendData(DELETE, `${CRUDAPI}/${tableName}/${deleteId}`).then(() => {
      fetchRecords();
    });
    handleClose();
  };

  return (
    <GenericModal
      title="Delete sale"
      show={show.showDelete}
      handleClose={handleClose}
      handleSave={handleClick}
      saveButtonLabel="Delete"
      saveButtonVariant="danger"
    >
      <p className="sign--warning">Are you sure?</p>
    </GenericModal>
  );
}
