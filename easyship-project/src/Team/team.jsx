import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import NavbarUser from '../Navbars/navbarUser';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const UserManagement = () => {
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [role, setRole] = useState('user');
    const [editUserId, setEditUserId] = useState(null);

    const token = localStorage.getItem('token');

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const tokenstorename = decodedToken.Storename; // Assuming 'sub' contains the username

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(`https://localhost:7279/api/Auth/ByStore/${tokenstorename}`)
            .then((result) => {
                setUserData(result.data);
            })
            .catch((error) => {
                console.log("Error fetching user data:", error);
            });
    };

    const handleRegister = () => {
        if (!username || !password || !email || isLoading) {
            return;
        }
        setIsLoading(true);
        const url = 'https://localhost:7279/api/Auth/register-member';
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
                toast.success('User registered successfully'); // Display success toast
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response && error.response.status === 400 && error.response.data === 'Username already exists') {
                    toast.error('Username already exists');
                } else if (error.response && error.response.status === 400 && error.response.data === 'Email already exists') {
                    toast.error('Email already exists');
                } else if (error.response && error.response.status === 400 && error.response.data === 'Username must contain only letters and numbers (no special characters).') {
                    toast.error('Username must contain only letters and numbers (no special characters).');
                }
                else if (error.response && error.response.status === 400 && error.response.data === 'Invalid email format') {
                    toast.error('Invalid Email Entered');
                }
                else {
                    toast.error('Error registering user');
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
        <ToastContainer/>
            <NavbarUser />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="d-flex justify-content-between mb-3 mr-5">
                <h2></h2>
                <Button variant="primary" style={{ backgroundColor: '#1f2937', borderColor: '#1f2937' }} onClick={() => setShowModal(true)}>Add User</Button>
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
                    {userData.map((item, index) => (
                        <tr key={index} style={{ backgroundColor: selectedUserId === item.id ? 'red' : 'transparent' }} onClick={() => handleRowClick(item.id)}>
                            <td>{index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            {item.role !== 'superuser' && (
                                <td>
                                    <Button variant="danger" style={{ backgroundColor: '#ea580c', borderColor: '#ea580c' }} onClick={() => handleDelete(item.id)}>Delete</Button>
                                    &nbsp;
                                    {/* <Button variant="primary" style={{ backgroundColor: '#1f2937', borderColor: '#1f2937' }} onClick={() => handleEditModal(item.id, item.role)}>Edit</Button> */}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{ 'Add User'}</Modal.Title>
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
                                    label="Inventory Manager"
                                    name="role"
                                    id="inventoryManager"
                                    checked={role === 'inventoryManager'}
                                    onChange={() => setRole('inventoryManager')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Order Manager"
                                    name="role"
                                    id="orderManager"
                                    checked={role === 'orderManager'}
                                    onChange={() => setRole('orderManager')}
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
