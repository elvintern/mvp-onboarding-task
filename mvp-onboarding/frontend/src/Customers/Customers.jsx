import React, { useEffect, useState } from 'react';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CRUDAPI } from '../Utilities';
import Pagination from 'react-bootstrap/Pagination';
import '../style.css';

export default function Customers() {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState({});
  const [deleteId, setdeleteId] = useState(null);
  const [modalStates, setModalStates] = useState({
    showCreate: false,
    showUpdate: false,
    showDelete: false,
  });
  const [activePagination, setActivePagination] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  const tableName = 'Customers';

  let items = [];
  for (let number = 1; number < records.length / 10 + 1; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePagination}
        onClick={() => clickPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const commonProps = {
    show: modalStates,
    setShow: setModalStates,
    fetchRecords: fetchRecords,
  };

  const clickPagination = (number) => {
    setActivePagination(number);
    setCurrentItems(records.slice((number - 1) * 10, number * 10));
  };

  useEffect(() => {
    fetchRecords(tableName);
  }, []);

  async function fetchRecords() {
    try {
      const response = await fetch(CRUDAPI + '/' + tableName);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecords(data);
      setCurrentItems(data.slice(0, 10));
    } catch (error) {
      console.error('Failed to fetch:', error.message);
    }
  }

  const handleEdit = (id) => {
    setModalStates((prev) => ({ ...prev, showUpdate: true }));
    const customer = records.find((el) => el.id === id);
    setEditingRecord(customer);
  };

  const handleDelete = (id) => {
    setModalStates((prev) => ({ ...prev, showDelete: true }));
    setdeleteId(id);
    console.log(id);
  };

  return (
    records && (
      <div>
        <Button
          className="btn--create"
          variant="primary"
          onClick={() =>
            setModalStates((prev) => ({ ...prev, showCreate: true }))
          }
        >
          New Customer
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((el) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.address}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(el.id)}>
                    <FontAwesomeIcon
                      className="btn--icon"
                      icon={faPenToSquare}
                    />
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(el.id)}>
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
          setdeleteId={setdeleteId}
        />

        <Pagination>{items}</Pagination>

        <p>© 2023 - Elvin Park</p>
      </div>
    )
  );
}
