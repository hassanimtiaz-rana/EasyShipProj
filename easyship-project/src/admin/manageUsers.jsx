import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./adminNavbar";
import axios from "axios";

function ManageUsers() {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editId, setEditId] = useState('');
    const [editUserName, setEditUserName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editStoreName, setEditStoreName] = useState('');
    const [editRole, setEditRole] = useState('');

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://localhost:7279/api/User')
            .then((result) => {
                setUserData(result.data);
            })
            .catch((error) => {
                console.log("Error is=>", error);
            });
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = userData.filter((item) => {
        return (
            item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.storeName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
    const handleDelete = (id) => {
        if (window.confirm("Are You Sure to Delete?")) {
          axios.delete(`https://localhost:7279/api/User/${id}`)
            .then((result) => {
              if (result.status === 200) {
                toast.success('User Has been Deleted');
                getData();
              }
              
            })
            .catch((error) => {
              toast.error(error);
            });
        }
      };

    const handleEdit = (id) => {
        handleShow();
        const selectedItem = userData.find(item => item.id === id);
        if (selectedItem) {
            setEditId(selectedItem.id);
            setEditUserName(selectedItem.username);
            setEditEmail(selectedItem.email);
            setEditStoreName(selectedItem.storename);
            setEditRole(selectedItem.role);

        } else {
            toast.error('User not found');
        }
    };
    const handleUpdate = () => {
        const url = `https://localhost:7279/api/User/${editId}`;
        const existingUser = userData.find(user => user.id === editId);
        if (!existingUser) {
            toast.error('User not found');
            return;
        }
    
        const data = {
            id: editId,
            username: editUserName,
            passwordHash: existingUser.passwordHash,
            email: editEmail,
            storename: editStoreName,
            role: editRole,
            verified: existingUser.verified, // Use existing verified value
            verificationToken: existingUser.verificationToken, // Use existing verificationToken value
            resetPasswordToken: existingUser.resetPasswordToken,
             resetPasswordTokenExpiration: existingUser.resetPasswordTokenExpiration
        };
    
        axios.put(url, data)
            .then((result) => {
                handleClose();
                toast.success('User Has been Updated');
                getData();
                clear();
            })
            .catch((error) => {
                toast.error(error);
            });
    
        const clear = () => {
            setEditUserName('');
            setEditEmail('');
            setEditStoreName('');
            setEditRole('');
        };
    };
    
  
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <AdminNavbar />
            <br></br>
            <br>
            </br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <ToastContainer />
            <Fragment>
                <Container>
                    <br />
                    <Row>
                        <Col>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </Col>
                    </Row>
                    <br />
                </Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Store Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.storename}</td>
                                    <td>{item.role}</td>
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
                    <Modal.Header closeButton>
                        <Modal.Title>Update User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <label htmlFor="editUserName">User Name:</label>
                                    <input
                                        type="text"
                                        id="editUserName"
                                        className="form-control"
                                        placeholder="Enter User Name"
                                        value={editUserName}
                                        onChange={(e) => setEditUserName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="editEmail">Email:</label>
                                    <input
                                        type="email"
                                        id="editEmail"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="editStoreName">Store Name:</label>
                                    <input
                                        type="text"
                                        id="editStoreName"
                                        className="form-control"
                                        placeholder="Enter Store Name"
                                        value={editStoreName}
                                        onChange={(e) => setEditStoreName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="editRole">Role:</label>
                                    <input
                                        type="text"
                                        id="editRole"
                                        className="form-control"
                                        placeholder="Role"
                                        value={editRole}
                                        onChange={(e) => setEditRole(e.target.value)}
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

export default ManageUsers;
