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
  otherTables,
}) {
  const handleClose = () => {
    setShow((prev) => ({ ...prev, showUpdate: false }));
    setEditingRecord({});
  };

  const handleClick = () => {
    if (
      editingRecord.dateSold &&
      editingRecord.customerId &&
      editingRecord.productId &&
      editingRecord.storeId
    ) {
      sendData(
        PUT,
        `${CRUDAPI}/${tableName}/${editingRecord.id}`,
        editingRecord
      )
        .then(() => {
          fetchRecords();
        })
        .then(() => {
          setEditingRecord({
            dateSold: '',
            customerId: null,
            productId: null,
            storeId: null,
          });
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
      title="Edit store"
      show={show.showUpdate}
      handleClose={handleClose}
      handleSave={handleClick}
      saveButtonLabel="Edit"
    >
      <div className="container--input">
        <label htmlFor="dateSold">Date Sold</label>
        <input
          type="text"
          id="dateSold"
          name="dateSold"
          onChange={captureUserInput}
          placeholder="2023-09-30"
          value={editingRecord?.dateSold?.slice(0, 10) || ''}
        />
      </div>
      <div className="container--input">
        <label htmlFor="customerId">Customer</label>
        <select
          name="customerId"
          onChange={captureUserInput}
          value={editingRecord?.customerId || ''}
        >
          <option defaultValue disabled>
            Select a Customer
          </option>
          {otherTables.customers.map((option) => (
            <option key={option.name} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="container--input">
        <label htmlFor="productId">Product</label>
        <select
          name="productId"
          onChange={captureUserInput}
          value={editingRecord?.productId || ''}
        >
          <option value="" defaultValue disabled>
            Select a Product
          </option>
          {otherTables.products.map((option) => (
            <option key={option.name} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="container--input">
        <label htmlFor="storeId">Store</label>
        <select
          name="storeId"
          onChange={captureUserInput}
          value={editingRecord?.storeId || ''}
        >
          <option value="" defaultValue disabled>
            Select a Store
          </option>
          {otherTables.stores.map((option) => (
            <option key={option.name} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </GenericModal>
  );
}
