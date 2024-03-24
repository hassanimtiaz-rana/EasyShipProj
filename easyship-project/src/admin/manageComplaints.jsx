import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./adminNavbar";
import { format } from 'date-fns';

function ManageComplaints() {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [editId, setEditId] = useState('');
    const [editComplaintNumber, setEditComplaintNumber] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editComplaintMessage, setEditComplaintMessage] = useState('');
    const [complaintsData, setComplaintsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://localhost:7279/api/HelpRequest/all");
            setComplaintsData(response.data);
        } catch (error) {
            console.error("Error fetching complaints data:", error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (status) => {
        if (status === filterStatus) {
            // Uncheck the checkbox if it was already checked
            setFilterStatus('All');
        } else {
            setFilterStatus(status);
        }
    };

    const filteredData = complaintsData.filter((item) => {
        if (filterStatus === 'All') {
            return item.username.toLowerCase().includes(searchQuery.toLowerCase());
        } else {
            return item.status === filterStatus && item.username.toLowerCase().includes(searchQuery.toLowerCase());
        }
    });

    const handleEdit = (id) => {
        const selectedItem = complaintsData.find(item => item.id === id);
        if (selectedItem) {
            setEditId(selectedItem.id);
            setEditUsername(selectedItem.username);
            setEditComplaintMessage(selectedItem.message);
            setShow(true);
        } else {
            toast.error('Complaint not found');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(`https://localhost:7279/api/HelpRequest/updateStatus/${id}`, { status });
            // Display toast success message
            toast.success(`Complaint status updated to ${status}`);
            // Refetch data after successful update
            fetchData();
            // Close the modal
            handleClose();
        } catch (error) {
            console.error("Error updating complaint status:", error);
            toast.error('Failed to update complaint status');
        }
    };
    

    const handleClose = () => setShow(false);

    return (
        <>
            <AdminNavbar />
            <ToastContainer />
            <Fragment>
                <Container>
                    <br />
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
                    <Row>
                        <Col className="text-center"> {/* Center align the checkboxes */}
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filterStatus === 'Pending'}
                                        onChange={() => handleFilterChange('Pending')}
                                    />
                                    Pending
                                </label>
                                &nbsp;
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filterStatus === 'Fixed'}
                                        onChange={() => handleFilterChange('Fixed')}
                                    />
                                    Fixed
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Complaint Number</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>StoreName</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date: Time:</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.storename}</td>
                                <td>{item.type}</td>
                                <td>{item.status}</td>
                                <td>{format(new Date(item.time), 'MM/dd/yyyy HH:mm:ss')}</td>

                                <td colSpan={2}>
                                    <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>View</button>
                                    &nbsp;
                                    {item.status !== 'Fixed' &&
                                        <button className="btn btn-success" onClick={() => handleStatusUpdate(item.id, 'Fixed')}>Fixed</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Complaint</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <label htmlFor="viewUsername">Username:</label>
                                    <input
                                        type="text"
                                        id="viewUsername"
                                        className="form-control"
                                        placeholder="Username"
                                        value={editUsername}
                                        disabled
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="viewMessage">Message:</label>
                                    <textarea
                                        id="viewMessage"
                                        className="form-control"
                                        placeholder="Message"
                                        value={editComplaintMessage}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        </>
    );
}

export default ManageComplaints;
