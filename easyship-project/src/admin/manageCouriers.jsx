import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./adminNavbar";

function ManageCouriers() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState('');
  const [editCourierName, setEditCourierName] = useState('');
  const [editCourierEmail, setEditCourierEmail] = useState('');

  const couriersData = [
    {
      id: 1,
      courierName: 'Courier 1',
      courierEmail: 'courier1@example.com',
    },
    {
      id: 2,
      courierName: 'Courier 2',
      courierEmail: 'courier2@example.com',
    },
    {
      id: 3,
      courierName: 'Courier 3',
      courierEmail: 'courier3@example.com',
    }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(couriersData);
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.courierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courierEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEdit = (id) => {
    handleShow();
    // Simulating an API call to fetch courier data based on ID
    const selectedItem = data.find(item => item.id === id);
    if (selectedItem) {
      setEditId(selectedItem.id);
      setEditCourierName(selectedItem.courierName);
      setEditCourierEmail(selectedItem.courierEmail);
    } else {
      toast.error('Courier not found');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      // Handle delete functionality here
      // Example: axios.delete(`https://yourapi.com/couriers/${id}`)
      toast.success('Courier deleted');
      // Assuming you'd update the data after deletion from the API
      // getData();
    }
  };

  const handleUpdate = () => {
    // Update functionality here
    // Example: axios.put(`https://yourapi.com/couriers/${editId}`, { name: editCourierName, email: editCourierEmail })
    toast.success('Courier updated');
    handleClose();
    // Assuming you'd update the data after updating from the API
    // getData();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <AdminNavbar />
      <ToastContainer />
      <Fragment>
        <Container>
          <br />
          <br />
          <br />
          <br />
          <br />

          <Row>
            <Col>
              <input
                type="text"
                className="w-full h-12 px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Search couriers..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </Col>
          </Row>
          <br/>
          
          <Row>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Courier Name"
        
        />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Courier Email"
        
        />
        </Col>
        <Col>
        <button className="btn btn-primary"style={{ backgroundColor: '#1f2937',borderColor: '#1f2937' }}>Submit</button>
        </Col>
      </Row>
          <br />
        </Container>
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Courier ID</th>
              <th>Courier Name</th>
              <th>Courier Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.courierName}</td>
                  <td>{item.courierEmail}</td>
                  <td colSpan={2}>
                    <button className="btn btn-primary"style={{ backgroundColor: '#1f2937',borderColor: '#1f2937' }} onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                    <button className="btn btn-danger"style={{ backgroundColor: '#ea580c',borderColor: '#ea580c' }} onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Courier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <label htmlFor="editCourierName">Courier Name:</label>
                  <input
                    type="text"
                    id="editCourierName"
                    className="form-control"
                    placeholder="Enter Courier Name"
                    value={editCourierName}
                    onChange={(e) => setEditCourierName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="editCourierEmail">Courier Email:</label>
                  <input
                    type="text"
                    id="editCourierEmail"
                    className="form-control"
                    placeholder="Enter Courier Email"
                    value={editCourierEmail}
                    onChange={(e) => setEditCourierEmail(e.target.value)}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </>
  );
}

export default ManageCouriers;
