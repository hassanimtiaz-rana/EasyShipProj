import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function OrderManagement() {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOrderStatus, setFilterOrderStatus] = useState('All');
    const [filterPaymentStatus, setFilterPaymentStatus] = useState('All');
    const [editId, setEditId] = useState('');
    const [ordersData, setOrdersData] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7279/api/Order`);
            setOrdersData(response.data);
        } catch (error) {
            console.error("Error fetching orders data:", error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterOrderStatusChange = (status) => {
        setFilterOrderStatus(prevStatus => prevStatus === status ? 'All' : status);
    };

    const handleFilterPaymentStatusChange = (status) => {
        setFilterPaymentStatus(prevStatus => prevStatus === status ? 'All' : status);
    };

    const handleEdit = (id) => {
        const selectedItem = ordersData.find(item => item.id === id);
        if (selectedItem) {
            setEditId(selectedItem.id);
            setPaymentStatus(selectedItem.paymentStatus);
            setOrderStatus(selectedItem.orderStatus);
            setShow(true);
        } else {
            toast.error('Order not found');
        }
    };

    const handleClose = () => setShow(false);

    const handleUpdateStatus = async (id, paymentStatus, orderStatus) => {
        try {
            const response = await axios.put(`https://localhost:7279/api/Order`, { id,paymentStatus, orderStatus });
            if (response.status === 200) {
                toast.success('Order status updated successfully');
                handleClose();
                fetchData(); // Refresh data after update
            } else {
                toast.error('Failed to update order status');
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error('Failed to update order status');
        }
    };
    

    const filteredData = ordersData.filter(item => {
        const matchOrderStatus = filterOrderStatus === 'All' || item.orderStatus === filterOrderStatus;
        const matchPaymentStatus = filterPaymentStatus === 'All' || item.paymentStatus === filterPaymentStatus;
        const matchSearchQuery = item.id.toString().toLowerCase().includes(searchQuery.toLowerCase());
        return matchOrderStatus && matchPaymentStatus && matchSearchQuery;
    });

    return (
        <>
            <ToastContainer />
            <Fragment>
                <Container >
                    <br/>
                    <Row>
                        <Col>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search orders..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col className="text-left">
                            <div>
                                <label>
                                    Order Status:
                                    &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={filterOrderStatus === 'Pending'}
                                        onChange={() => handleFilterOrderStatusChange('Pending')}
                                    />
                                    Pending
                                    &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={filterOrderStatus === 'Completed'}
                                        onChange={() => handleFilterOrderStatusChange('Completed')}
                                    />
                                    Completed
                                </label>
                            </div>
                        </Col>
                        <Col className="text-right">
                            <div>
                                <label>
                                    Payment Status:
                                    &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={filterPaymentStatus === 'Pending'}
                                        onChange={() => handleFilterPaymentStatusChange('Pending')}
                                    />
                                    Pending
                                    &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={filterPaymentStatus === 'Completed'}
                                        onChange={() => handleFilterPaymentStatusChange('Completed')}
                                    />
                                    Completed
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <br />
                </Container>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Total Cost</th>
                            <th>Order Status</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.totalCost}</td>
                                <td>{item.orderStatus}</td>
                                <td>{item.paymentStatus}</td>
                                <td colSpan={2}>
                                    <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Order Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <label htmlFor="orderStatus">Order Status:</label>
                                    <select
                                        id="orderStatus"
                                        className="form-control"
                                        value={orderStatus}
                                        onChange={(e) => setOrderStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="paymentStatus">Payment Status:</label>
                                    <select
                                        id="paymentStatus"
                                        className="form-control"
                                        value={paymentStatus}
                                        onChange={(e) => setPaymentStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button className="btn btn-primary" onClick={() => handleUpdateStatus(editId, paymentStatus, orderStatus)}>
                            Update Status
                        </button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        </>
    );
}

export default OrderManagement;

