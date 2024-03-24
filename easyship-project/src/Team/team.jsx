import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import NavbarUser from './navbarUser';

import { Table } from 'react-bootstrap';

const UserManagement = () => {
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [role, setRole] = useState('user'); // Default role set to 'user'
    const [editUserId, setEditUserId] = useState(null); // Track user ID for editing

    const token = localStorage.getItem('token');

    console.log('Token in inventory', token);
    // const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const tokenstorename = decodedToken.Storename; // Assuming 'sub' contains the username

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

    const handleRegister = () => {
        if (!username || !password || !email || isLoading) {
            return;
        }
        setIsLoading(true);
        const url = 'https://localhost:7279/api/Auth/register';
        const data = {
            username: username,
            password: password,
            email: email,
            storename: tokenstorename,
            role: role,
            verified: true,
            verificationToken: "string",
            resetPasswordToken: "string",
            resetPasswordTokenExpiration: "2024-03-16T22:20:00.506Z"
        };

        axios.post(url, data)
            .then((result) => {
                setShowModal(false);
                setIsLoading(false);
                getData(); // Refresh user data after successful registration
                // Clear form values after successful registration
                setUsername('');
                setEmail('');
                setPassword('');
                setRole('user');
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response && error.response.status === 400 && error.response.data === 'Username already exists') {
                    // Handle specific error messages
                } else {
                    // Handle general error
                }
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are You Sure to Delete?")) {
            axios.delete(`https://localhost:7279/api/User/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        getData();
                        toast.success('User Has been Deleted');
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const handleEdit = (id, newRole) => {
        axios.put(`https://localhost:7279/api/User/${id}`, { role: newRole })
            .then((result) => {
                if (result.status === 200) {
                    getData();
                    toast.success('User Role Updated');
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleRowClick = (id) => {
        setSelectedUserId(id);
    };

    const handleEditModal = (id, currentRole) => {
        setEditUserId(id);
        setRole(currentRole);
        setShowModal(true);
    };

    return (
        <>
            <NavbarUser />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h2>User Management</h2>
                <button className="btn btn-primary" style={{ backgroundColor: '#1f2937', borderColor: '#1f2937' }} onClick={() => setShowModal(true)}>Add User</button> &nbsp;
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        {role !== 'superuser' && <th>Action</th>} {/* Conditionally render delete button */}
                    </tr>
                </thead>
                <tbody>
                    {userData
                        .filter(item => item.storename === tokenstorename) // Filter based on storename
                        .map((item, index) => (
                            <tr key={index} style={{ backgroundColor: selectedUserId === item.id ? 'red' : 'transparent' }} onClick={() => handleRowClick(item.id)}>
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                {item.role !== 'superuser' && (
                                    <td>
                                        <button className="btn btn-danger" style={{ backgroundColor: '#ea580c', borderColor: '#ea580c' }} onClick={() => handleDelete(item.id)}>Delete</button>
                                        &nbsp;
                                        <button className="btn btn-primary" style={{ backgroundColor: '#1f2937', borderColor: '#1f2937' }} onClick={() => handleEditModal(item.id, item.role)}>Edit</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editUserId ? 'Edit User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formStorename">
                            <Form.Label>Store Name</Form.Label>
                            <Form.Control type="text" value={tokenstorename} disabled />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    label="User"
                                    name="role"
                                    id="userRole"
                                    checked={role === 'user'}
                                   
                                    onChange={() => setRole('user')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Superuser"
                                    name="role"
                                    id="superuserRole"
                                    checked={role === 'superuser'}
                                    onChange={() => setRole('superuser')}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleRegister} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserManagement;
