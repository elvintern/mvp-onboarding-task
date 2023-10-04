import React, { useEffect, useState, useCallback } from 'react';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CRUDAPI, ITEMS_PER_PAGE } from '../Utilities';
import CustomPagination from './CustomPagination';
import '../style.css';

export default function Sales() {
  const tableName = 'Sales';
  const [records, setRecords] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [editingRecord, setEditingRecord] = useState({
    dateSold: '',
    customerId: null,
    productId: null,
    storeId: null,
  });
  const [deleteId, setDeleteId] = useState(null);
  const [modalStates, setModalStates] = useState({
    showCreate: false,
    showUpdate: false,
    showDelete: false,
  });
  const [otherTables, setOtherTables] = useState({
    customers: [],
    products: [],
    stores: [],
  });

  const fetchRecords = useCallback(async () => {
    try {
      const response = await fetch(CRUDAPI + '/' + tableName);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecords(data);
      setCurrentItems(data.slice(0, ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Failed to fetch:', error.message);
    }
  }, []);

  const fetchOtherRecords = useCallback(async () => {
    try {
      const customers = await fetch(CRUDAPI + '/Customers');
      const products = await fetch(CRUDAPI + '/Products');
      const stores = await fetch(CRUDAPI + '/Stores');
      if (!customers.ok) {
        throw new Error(`HTTP error! Status: ${customers.status}`);
      } else if (!products.ok) {
        throw new Error(`HTTP error! Status: ${products.status}`);
      } else if (!stores.ok) {
        throw new Error(`HTTP error! Status: ${stores.status}`);
      }

      const dataFromCustomers = await customers.json();
      const dataFromProducts = await products.json();
      const dataFromStores = await stores.json();

      setOtherTables((prev) => ({
        ...prev,
        customers: dataFromCustomers,
        products: dataFromProducts,
        stores: dataFromStores,
      }));
    } catch (error) {
      console.error('Failed to fetch:', error.message);
    }
  }, []);

  const handleEdit = (id) => {
    setModalStates((prev) => ({ ...prev, showUpdate: true }));
    const record = records.find((el) => el.id === id);
    setEditingRecord(record);
  };

  const handleDelete = (id) => {
    setModalStates((prev) => ({ ...prev, showDelete: true }));
    setDeleteId(id);
  };

  const commonProps = {
    show: modalStates,
    setShow: setModalStates,
    fetchRecords: fetchRecords,
    tableName: tableName,
    records: records,
    otherTables: otherTables,
  };

  useEffect(() => {
    fetchRecords();
    fetchOtherRecords();
  }, [fetchRecords, fetchOtherRecords]);

  return (
    records.length > 0 && (
      <div>
        <Button
          className="btn--create"
          variant="primary"
          onClick={() => {
            setModalStates((prev) => ({ ...prev, showCreate: true }));
          }}
        >
          New Sale
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Store</th>
              <th>Date Sold</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map(
              ({ id, productName, customerName, storeName, dateSold }) => (
                <tr key={id}>
                  <td>{customerName}</td>
                  <td>{productName}</td>
                  <td>{storeName}</td>
                  <td>{dateSold.slice(0, 10)}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(id)}>
                      <FontAwesomeIcon
                        className="btn--icon"
                        icon={faPenToSquare}
                      />
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(id)}>
                      <FontAwesomeIcon className="btn--icon" icon={faTrash} />
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>

        <CreateModal {...commonProps} />

        <UpdateModal
          {...commonProps}
          editingRecord={editingRecord}
          setEditingRecord={setEditingRecord}
        />

        <DeleteModal
          {...commonProps}
          deleteId={deleteId}
          setDeleteId={setDeleteId}
        />

        <CustomPagination records={records} setCurrentItems={setCurrentItems} />

        <p>© 2023 - Elvin Park</p>
      </div>
    )
  );
}
