import React, { useState, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./adminNavbar";

function ManageComplaints() {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editId, setEditId] = useState('');
    const [editComplaintNumber, setEditComplaintNumber] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editComplaintMessage, setEditComplaintMessage] = useState('');

    const complaintsData = [
        {
            id: 1,
            complaintNumber: '1234',
            username: 'user1',
            complaintMessage: 'Issue with product delivery.',
        },
        {
            id: 2,
            complaintNumber: '5678',
            username: 'user2',
            complaintMessage: 'Issue With Inventory.',
        },
        {
            id: 3,
            complaintNumber: '9012',
            username: 'user3',
            complaintMessage: 'Issue with Order Management.',
        }
    ];

    const [data, setData] = useState(complaintsData);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter((item) => {
        return (
            item.complaintNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.complaintMessage.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleEdit = (id) => {
        handleShow();
        // Fetch data based on ID and populate the modal fields
        const selectedItem = data.find(item => item.id === id);
        if (selectedItem) {
            setEditId(selectedItem.id);
            setEditComplaintNumber(selectedItem.complaintNumber);
            setEditUsername(selectedItem.username);
            setEditComplaintMessage(selectedItem.complaintMessage);
        } else {
            toast.error('Complaint not found');
        }
    };

    const handleDelete = (id) => {
        // Handle delete functionality here
        // ...
    };

    const handleUpdate = () => {
        // Handle update functionality here
        // ...
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
                    <br/>
                    <br/>
                    <br />
                    <br/>
                    <br/>

                    <Row>
                        <Col>
                            <input
                                type="text"
                                className="w-full h-12 px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholder="Search complaints..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </Col>
                    </Row>
                    <br />
                </Container>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Complaint Number</th>
                            <th>Username</th>
                            <th>Complaint Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.complaintNumber}</td>
                                    <td>{item.username}</td>
                                    <td>{item.complaintMessage}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>View</button> &nbsp;
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    {/* Modal content */}
                    {/* ... */}
                </Modal>
            </Fragment>
        </>
    );
}

export default ManageComplaints;
