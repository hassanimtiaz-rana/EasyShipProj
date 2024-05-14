import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavbarUser from "../Navbars/navbarUser";

function MyOrder() {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOrderStatus, setFilterOrderStatus] = useState('All');
    const [filterPaymentStatus, setFilterPaymentStatus] = useState('All');
    const [editId, setEditId] = useState('');
    const [ordersData, setOrdersData] = useState([]);
    const token = localStorage.getItem('token');

    console.log('Token in inventory', token);
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const storename = decodedToken.Storename; // Assuming 'sub' contains the username

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7279/api/Order/ByStore/${storename}`);
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
            setShow(true);
        } else {
            toast.error('Order not found');
        }
    };

    const handleClose = () => setShow(false);

    const filteredData = ordersData.filter(item => {
        const matchOrderStatus = filterOrderStatus === 'All' || item.orderStatus === filterOrderStatus;
        const matchPaymentStatus = filterPaymentStatus === 'All' || item.paymentStatus === filterPaymentStatus;
        const matchSearchQuery = item.id.toString().toLowerCase().includes(searchQuery.toLowerCase());
        return matchOrderStatus && matchPaymentStatus && matchSearchQuery;
    });

    return (
        <>
        <NavbarUser/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

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
                            <th>Courier</th>

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
                                <td>{item.courier}</td>

                                
            
                                <td colSpan={2}>
                                    <button className="btn btn-primary" style={{ backgroundColor: '#1f2937',borderColor: '#1f2937' }} onClick={() => handleEdit(item.id)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <label htmlFor="viewItems">Items:</label>
                                    <textarea
                                        id="viewItems"
                                        className="form-control"
                                        placeholder="Items"
                                        value={ordersData.find(item => item.id === editId)?.items || ''}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="viewAddress">Address:</label>
                                    <textarea
                                        id="viewAddress"
                                        className="form-control"
                                        placeholder="Address"
                                        value={ordersData.find(item => item.id === editId)?.address || ''}
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

export default MyOrder;
