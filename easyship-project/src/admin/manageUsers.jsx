import React, { useState, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./adminNavbar";

function ManageUsers() {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editId, setEditId] = useState('');
    const [editUserName, setEditUserName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editStoreName, setEditStoreName] = useState('');

    const userData = [
        {
            id: 1,
            userName: 'Hassan72b',
            email: 'hassanrana72b@gmail.com',
            storeName: 'Hassan Shoes',
        },
        {
            id: 2,
            userName: 'saad8898',
            email: 'saad8898@gmail.com',
            storeName: 'Saad DVD',
        },
        {
            id: 3,
            userName: 'Ahmad Moiz',
            email: 'AhmadMoiz91@gmail.com',
            storeName: 'Moeez Clothing',
        }
    ];

    const [data, setData] = useState(userData);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter((item) => {
        return (
            item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.storeName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleEdit = (id) => {
        handleShow();
        // Fetch data based on ID and populate the modal fields
        const selectedItem = data.find(item => item.id === id);
        if (selectedItem) {
            setEditId(selectedItem.id);
            setEditUserName(selectedItem.userName);
            setEditEmail(selectedItem.email);
            setEditStoreName(selectedItem.storeName);
        } else {
            toast.error('User not found');
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
                                placeholder="Search users..."
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
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Store Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.storeName}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
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

export default ManageUsers;
