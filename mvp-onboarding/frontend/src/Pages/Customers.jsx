import React, { useEffect, useState } from 'react';
import CreateModal from '../Components/CreateModal';
import UpdateModal from '../Components/UpdateModal';
import DeleteModal from '../Components/DeleteModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CRUDAPI } from '../Utilities';
import Pagination from 'react-bootstrap/Pagination';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState({});
  const [deleteId, setdeleteId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activePagination, setActivePagination] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  let items = [];
  for (let number = 1; number < customers.length / 10 + 1; number++) {
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

  const clickPagination = (number) => {
    setActivePagination(number);
    setCurrentItems(customers.slice((number - 1) * 10, number * 10));
    console.log(customers.length);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const response = await fetch(CRUDAPI);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
      setCurrentItems(data.slice(0, 10));
    } catch (error) {
      console.error('Failed to fetch:', error.message);
    }
  }

  const handleEdit = (id) => {
    setShowUpdateModal(true);
    const customer = customers.find((el) => el.id === id);
    setEditingCustomer(customer);
  };

  const handleDelete = (id) => {
    console.log(id, 'click');
    setShowDeleteModal(true);
    setdeleteId(id);
  };

  return (
    customers && (
      <div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
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
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(el.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CreateModal
          show={showCreateModal}
          setShow={setShowCreateModal}
          fetchCustomers={fetchCustomers}
        />

        <UpdateModal
          show={showUpdateModal}
          setShow={setShowUpdateModal}
          fetchCustomers={fetchCustomers}
          editingCustomer={editingCustomer}
          setEditingCustomer={setEditingCustomer}
        />

        <DeleteModal
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          fetchCustomers={fetchCustomers}
          deleteId={deleteId}
          setdeleteId={setdeleteId}
        />

        <Pagination>{items}</Pagination>

        <p>© 2023 - Elvin Park</p>
      </div>
    )
  );
}
