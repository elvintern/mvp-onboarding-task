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
  otherTables,
}) {
  const [newData, setNewData] = useState({
    dateSold: '',
    customerId: null,
    productId: null,
    storeId: null,
  });

  const handleClose = () => setShow((prev) => ({ ...prev, showCreate: false }));
  const handleClick = () => {
    if (
      newData.dateSold &&
      newData.customerId &&
      newData.productId &&
      newData.storeId
    ) {
      sendData(POST, `${CRUDAPI}/${tableName}`, newData)
        .then(() => {
          fetchRecords();
        })
        .then(() => {
          setNewData({
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
    setNewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <GenericModal
      title="Create sale"
      show={show.showCreate}
      handleClose={handleClose}
      handleSave={handleClick}
      saveButtonLabel="Create"
    >
      <Modal.Body>
        <div className="container--input">
          <label htmlFor="dateSold">Date Sold</label>
          <input
            type="text"
            id="dateSold"
            name="dateSold"
            onChange={captureUserInput}
            placeholder="2023-09-30"
          />
        </div>
        <div className="container--input">
          <label htmlFor="customerId">Customer</label>
          <select
            name="customerId"
            value={newData.customerId || ''}
            onChange={captureUserInput}
          >
            <option value={''} disabled>
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
            value={newData.productId || ''}
            onChange={captureUserInput}
          >
            <option value="" disabled>
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
            value={newData.storeId || ''}
            onChange={captureUserInput}
          >
            <option value="" disabled>
              Select a Store
            </option>
            {otherTables.stores.map((option) => (
              <option key={option.name} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
    </GenericModal>
  );
}
