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

export default function Products() {
  const tableName = 'Products';
  const [records, setRecords] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modalStates, setModalStates] = useState({
    showCreate: false,
    showUpdate: false,
    showDelete: false,
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
  };

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return (
    records.length > 0 && (
      <div>
        <Button
          className="btn--create"
          variant="primary"
          onClick={() =>
            setModalStates((prev) => ({ ...prev, showCreate: true }))
          }
        >
          New Product
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map(({ id, name, price }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{price}</td>
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
            ))}
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
