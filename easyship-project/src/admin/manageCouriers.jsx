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
  const [editCourierName, setEditCourierName] = useState('');
  const [editCourierEmail, setEditCourierEmail] = useState('');
  const[id,setId]=useState('');
  const[courier,setCourier]=useState('');
  const[deliveryTimeline,setDeliveryTimeline]=useState('');

  const[shippingCharges,setShippingCharges]=useState('');
  const[pickupCity,setPickupCity]=useState('');
  const[destinationCity,setdestinationCity]=useState('');

  //Edit
  const[editId,setEditId]=useState('');
  const[editCourier,setEditCourier]=useState('');
  const[editDeliveryTimeline,setEditDeliveryTimeline]=useState('');

  const[editShippingCharges,setEditShippingCharges]=useState('');
  const[editPickupCity,setEditPickupCity]=useState('');
  const[editDestinationCity,setEditdestinationCity]=useState('');

  



 


 
 
  const [data, setData] = useState([]);
 useEffect(() => {
   getData();
 }, []);
  const getData = () => {
 axios.get('https://localhost:7279/api/Courier')
   .then((result) => {
     setData(result.data);
   })
   .catch((error) => {
     console.log("Error is=>",error);
   });
};

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.courier.toLowerCase().includes(searchQuery.toLowerCase()) // ||
      // item.Id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEdit=(id)=>{
    //alert(id);
    handleShow();
    axios.get(`https://localhost:7279/api/Courier/${id}`)
    .then((result) => {
      setEditCourier(result.data.courier)
      setEditShippingCharges(result.data.shippingCharges)
      setEditDeliveryTimeline(result.data.deliveryTimeline)
      setEditPickupCity(result.data.pickupCity)
      setEditdestinationCity(result.data.destinationCity)
      setEditId(id)


    })
    .catch((error) => {
      toast.error(error);
    });

  }

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure to Delete?")) {
      axios.delete(`https://localhost:7279/api/Courier/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Courier Has been Deleted');
            getData(); 
          }
          
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate=()=>{
    const url= ` https://localhost:7279/api/Courier/${editId}`
    const data={
      "id": editId,
      "courier": editCourier,
        "shippingCharges": editShippingCharges,
        "deliveryTimeline": editDeliveryTimeline,
        "pickupCity": editPickupCity,
        "destinationCity":editDestinationCity
    
  }
  axios.put(url,data)
  .then((result)=>{
    handleClose();
    toast.success('Courier Has been Updated');
    getData();
    clear();
    
  
  
  })
  .catch((error)=>{
   toast.error(error);
  
  });
     
    }
  const handleSave=()=>{
    const url='https://localhost:7279/api/Courier';
    const data={
      
        // "id": 0,
        "courier": courier,
        "shippingCharges": shippingCharges,
        "deliveryTimeline": deliveryTimeline,
        "pickupCity": pickupCity,
        "destinationCity":destinationCity
      
    }
    axios.post(url,data)
    .then((result)=>{
      getData();
       clear();
      toast.success('Courier Has been added');


    })
    .catch((error)=>{
     toast.error(error);

    });
    
    const clear=()=>{
      setCourier('');
      // set('');
      setShippingCharges('');
      setDeliveryTimeline('');
      setPickupCity('');
      setdestinationCity('');

      setEditCourier('')
      setEditShippingCharges('')
      setEditDeliveryTimeline('')
      setEditPickupCity('')
      setEditdestinationCity('')
      
      // setEditProductName('');
      // setEditProductPrice('');
      // setEditProductQuantity('');
      // setEditProductCatagory('');

     
      // setEditId('');






    }




  }
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
        <input type="text" className="form-control" placeholder="Courier Name"  maxLength={15} value={courier} 
        onChange={(e)=>setCourier(e.target.value) }
        />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Shipping Charges"  maxLength={15} value={shippingCharges} 
        onChange={(e)=>setShippingCharges(e.target.value) }
  
        />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Delivery Timeline"  maxLength={15} value={deliveryTimeline} 
        onChange={(e)=>setDeliveryTimeline(e.target.value) }
  
        />
        </Col>
       
      </Row>
      <br></br>
      <Row>
      <Col>
        <input type="text" className="form-control" placeholder="Pickup City"  maxLength={15} value={pickupCity} 
        onChange={(e)=>setPickupCity(e.target.value) }
  
        />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Destination City"  maxLength={15} value={destinationCity} 
        onChange={(e)=>setdestinationCity(e.target.value) }
  
        />
        </Col>
        <Col>
        <button
  className="btn btn-primary"
  style={{ backgroundColor: '#1f2937',borderColor: '#1f2937' }}
  onClick={() => handleSave()}
>
  Submit
</button>
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
              <th>Courier</th>
              <th>Shipping Charges</th>
              <th>Delivery Timeline</th>
              <th>Pickup City</th>
              <th>Destination City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.courier}</td>
                  <td>{item.shippingCharges}</td>
                  <td>{item.deliveryTimeline}</td>
                  <td>{item.pickupCity}</td>
                  <td>{item.destinationCity}</td>
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
                    id="Courier"
                    className="form-control"
                    placeholder="Courier Name"
                    value={editCourier}
                    onChange={(e) => setEditCourier(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="editCourierShippingCharges">Courier ShippingCharges:</label>
                  <input
                    type="text"
                    id="editCourierShippingCharges"
                    className="form-control"
                    placeholder="Courier Shipping Charges"
                    value={editShippingCharges}
                    onChange={(e) => setEditShippingCharges(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="editCourierTimeline">Delivery Timeline:</label>
                  <input
                    type="text"
                    id="editCourierTimeline"
                    className="form-control"
                    placeholder="Courier Timeline"
                    value={editCourierEmail}
                    onChange={(e) => setEditDeliveryTimeline(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="editPickupCity">Pickup City:</label>
                  <input
                    type="text"
                    id="editPickupCity"
                    className="form-control"
                    placeholder="Pickup City"
                    value={editPickupCity}
                    onChange={(e) => setEditPickupCity(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="editDestinationCity">Destination City:</label>
                  <input
                    type="text"
                    id="editDestinationCity"
                    className="form-control"
                    placeholder="Destination City"
                    value={editDestinationCity}
                    onChange={(e) => setEditdestinationCity(e.target.value)}
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
