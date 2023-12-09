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
function CrudInventory()
{
    const [show, setShow] = useState(false);

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

  const productData=[
    {
        

    id:1,
    productName: 'Playstation 5',
    productQuantity: 20,
    productPrice:100,
    productCatagory: 'Gaming'


    },
    {
        id:2,
        productName: 'Washing Machine',
        productQuantity: 20,
        productPrice:100,
        productCatagory: 'Home Appliances'


     },
     {
        id:3,
        productName: 'Lcd',
        productQuantity: 20,
        productPrice:100,
        productCatagory: 'TV'
  
  
         }

 ]
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
            toast.success('Employee Has been Deleted');
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
    "productCatagory": editProductCatagory
  
}
axios.put(url,data)
.then((result)=>{
  handleClose();
  toast.success('Employee Has been Updated');
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
        "productCatagory": productCatagory
      
    }
    axios.post(url,data)
    .then((result)=>{
      getData();
      clear();
      toast.success('Employee Has been added');


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

return(
    <>
    <ToastContainer/>
    <Fragment>
    <Container>
      
      <Row>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Product Name" value={productName} 
        onChange={(e)=>setProductName(e.target.value)}
        />
        </Col>
        <Col><input type="text" className="form-control" placeholder="Enter Quantity" value={productQuantity}
        onChange={(e)=>setProductQuantity(e.target.value)}
        /></Col>
         <Col><input type="text" className="form-control" placeholder="Enter Price Unit" value={productPrice}
        onChange={(e)=>setProductPrice(e.target.value)}
        /></Col>
          <Col><input type="text" className="form-control" placeholder="Enter Product Catagory" value={productCatagory}
        onChange={(e)=>setProductCatagory(e.target.value)}
        /></Col>
       
        <Col>
        <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
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
            data && data.length>0 ?
            data.map((item,index)=>{
                return(
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.productPrice}</td>
                    <td>{item.productQuantity}</td>
                    
                    <td>{item.productCatagory}</td>
                    <td colSpan={2}>
                      <button className="btn btn-primary" onClick={()=>handleEdit(item.id)}>Edit</button> &nbsp;
                      <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>

                    </td>
                    </tr>

                )
            })
            :
            'Loading...'
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
        <input type="text" className="form-control" placeholder="Enter Product Name" value={editProductName} 
        onChange={(e)=>setEditProductName(e.target.value)}
        />
        </Col>
        <Col><input type="text" className="form-control" placeholder="Enter Product Quantity" value={editProductQuantity}
        onChange={(e)=>setEditProductQuantity(e.target.value)}
        /></Col>
        <Col>
         <input type="text" className="form-control" placeholder="Enter Product Price" value={editProductPrice} 
        onChange={(e)=>setEditProductPrice(e.target.value)}
        />
        </Col>
        <Col><input type="text" className="form-control" placeholder="Enter Product Quantity" value={editProductCatagory}
        onChange={(e)=>seteditProductCatagory(e.target.value)}
        /></Col>
       
        <Col>
        <button className="btn btn-primary">Submit</button>
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