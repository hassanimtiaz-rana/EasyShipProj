import React, { useState,useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import NavbarUser from "./navbarUser";
//  import * as jwt_decode from 'jwt-decode';
 import { useLocation } from 'react-router-dom';
function CrudInventory()
{
  
  const token = localStorage.getItem('token');

  console.log('Token in inventory',token);
  // const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const email = decodedToken.Username; // Assuming 'sub' contains the username
  console.log('Username in inventory is=>',email);
  // setUsername(usernameFromToken);

    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  const categories = ["Gaming", "Home Appliances", "TV"];

  // Manage selected category
  const [selectedCategory, setSelectedCategory] = useState('');
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[productName,setProductName]=useState('');
  const[productPrice,setProductPrice]=useState('');
  const[productQuantity,setProductQuantity]=useState('');
  const[productCatagory,setProductCatagory]=useState('');
  const[editId,setEditId]=useState('');
  const[editProductName,setEditProductName]=useState('');
  const[editProductPrice,setEditProductPrice]=useState('');
  const[editProductQuantity,setEditProductQuantity]=useState('');
  const[editProductCatagory,setEditProductCatagory]=useState('');

 
 
 const [data, setData] = useState([]);
 useEffect(() => {
   getData();
 }, []);
  const getData = () => {
 axios.get('https://localhost:7279/api/Product')
   .then((result) => {
     setData(result.data);
   })
   .catch((error) => {
     console.log(error);
   });
};
const handleSearchInputChange = (e) => {
  setSearchQuery(e.target.value);
};

const filteredData = data.filter((item) => {
  return (
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.productCatagory.toLowerCase().includes(searchQuery.toLowerCase())
  );
});
const filteredInventoryData = data.filter((item) => {
  return (
    (item.username === email) &&
    (item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productCatagory.toLowerCase().includes(searchQuery.toLowerCase()))
  );
});

const handleEdit=(id)=>{
    //alert(id);
    handleShow();
    axios.get(`https://localhost:7279/api/Product/${id}`)
    .then((result) => {
      setEditProductName(result.data.productName)
      setEditProductPrice(result.data.productPrice)
      setEditProductQuantity(result.data.productQuantity)
      setEditProductCatagory(result.data.productCatagory)
      setEditId(id)


    })
    .catch((error) => {
      toast.error(error);
    });

  }
  const handleDelete = (id) => {
    if (window.confirm("Are You Sure to Delete?")) {
      axios.delete(`https://localhost:7279/api/Product/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Product Has been Deleted');
            getData(); // Assuming getData fetches updated employee list
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  
  const handleUpdate=()=>{
  const url= ` https://localhost:7279/api/Product/${editId}`
  const data={
    "id": editId,
    "productName": editProductName,
    "productPrice": editProductPrice,
    "productQuantity": editProductQuantity,
    "productCatagory": editProductCatagory,
    "username":email
  
}
axios.put(url,data)
.then((result)=>{
  handleClose();
  toast.success('Product Has been Updated');
  getData();
  clear();
  


})
.catch((error)=>{
 toast.error(error);

});
   
  }
  const handleSave=()=>{
    const url='https://localhost:7279/api/Product';
    const data={
      
        // "id": 0,
        "productName": productName,
        "productPrice": productPrice,
        "productQuantity": productQuantity,
        "productCatagory": productCatagory,
        "username":email
      
    }
    axios.post(url,data)
    .then((result)=>{
      getData();
      clear();
      toast.success('Product Has been added');


    })
    .catch((error)=>{
     toast.error(error);

    });
    
    const clear=()=>{
      setProductName('');
      setProductPrice('');
      setProductQuantity('');
      setProductCatagory('');

      setEditProductName('');
      setEditProductPrice('');
      setEditProductQuantity('');
      setEditProductCatagory('');

     
      setEditId('');






    }




  }
  const handleIsActive=(e)=>{
    if(e.target.checked){
      setIsActive(1);
    }
    else{
      setIsActive(0);
    }


  }
  const handleEditActive=(e)=>{
    if(e.target.checked){
      setEditIsActive(1);
    }
    else{
      setEditIsActive(0);
    }


  }
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Change this value to set the number of records per page

  // Calculate indexes for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

return(
    <>

    <ToastContainer/>
    <Fragment>
    <Container>
      <NavbarUser/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
            {email && <p>Username: {email}</p>}
      <Row>
    <Col>
      <input
        type="text"
        className="w-full h-12 px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        placeholder="Search items..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
    </Col>
  </Row>
          <br></br>
      <Row>
        
        <Col>
        <input type="text" className="form-control" placeholder="Enter Product Name"  maxLength={15} value={productName} 
        onChange={(e)=>setProductName(e.target.value) }
        />
        </Col>
        <Col><input type="number" className="form-control" placeholder="Enter Quantity"maxLength={10} value={productQuantity}
        onChange={(e)=>setProductQuantity(e.target.value)}
        /></Col>
         <Col><input type="number" className="form-control" placeholder="Enter Price Unit" maxLength={10} value={productPrice}
        onChange={(e)=>setProductPrice(e.target.value)}
        /></Col>
          <Col>
          <select
          className="form-select"
          value={productCatagory}
          onChange={(e) => setProductCatagory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        </Col>
       
        <Col>
        <button
  className="btn btn-primary"
  style={{ backgroundColor: '#1f2937',borderColor: '#1f2937' }}
  onClick={() => handleSave()}
>
  Submit
</button>
        {/* <button className="btn btn-primary style={{ backgroundColor: '#1f2937' }}" onClick={()=>handleSave()}>Submit</button> */}
        </Col>
      </Row>
    </Container>
    <br></br>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Product Name</th>
          <th>Price Unit</th>
          <th>Quantity</th>
          <th>Catagory</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            filteredInventoryData.length > 0   ?
            filteredInventoryData.map((item, index)=>{
                return(
                  
                  <tr>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.productPrice}</td>
                    <td className={item.productQuantity === 0 ? 'bg-danger' : ''}>{item.productQuantity}</td>                    
                    <td>{item.productCatagory}</td>
                    <td colSpan={2}>
                      <button className="btn btn-primary" style={{ backgroundColor: '#1f2937',borderColor: '#1f2937' }} onClick={()=>handleEdit(item.id)}>Edit</button> &nbsp;
                      <button className="btn btn-danger "style={{ backgroundColor: '#ea580c',borderColor: '#ea580c' }} onClick={()=>handleDelete(item.id)}>Delete</button>

                    </td>
                    </tr>

                )
            })
            :
            'Not Found...'
        }
        
        
      </tbody>
    </Table>
   
   
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update/ Modify Product</Modal.Title>
        </Modal.Header>
        <Modal.Body><Container>
      
        <Row>
              <Col>
                <label htmlFor="editProductName">Product Name:</label>
                <input
                  type="text"
                  id="editProductName"
                  className="form-control"
                  placeholder="Enter Product Name"
                  value={editProductName}
                  onChange={(e) => setEditProductName(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="editProductQuantity">Product Quantity:</label>
                <input
                  type="text"
                  id="editProductQuantity"
                  className="form-control"
                  placeholder="Enter Product Quantity"
                  value={editProductQuantity}
                  onChange={(e) => setEditProductQuantity(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="editProductPrice">Product Price:</label>
                <input
                  type="text"
                  id="editProductPrice"
                  className="form-control"
                  placeholder="Enter Product Price"
                  value={editProductPrice}
                  onChange={(e) => setEditProductPrice(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="editProductCategory">Product Category:</label>
                <select
                  id="editProductCategory"
                  className="form-select"
                  value={editProductCatagory}
                  onChange={(e) => setEditProductCatagory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
           
    </Container></Modal.Body>
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
)

}
export default CrudInventory;