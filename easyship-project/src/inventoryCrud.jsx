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

function InventoryCrud()
{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[Name,setName]=useState('');
  const[Age,setAge]=useState('');
  const[IsActive,setIsActive]=useState(0);

  const[editId,setEditId]=useState('');
  const[editName,setEditName]=useState('');
  const[editAge,setEditAge]=useState('');
  const[editIsActive,setEditIsActive]=useState(0);


    const empdata=[
       {
       emp_id:1,
       emp_name: 'Hassan',
       emp_age: 20,
       is_Active:1


       },
       {
        emp_id:2,
        emp_name: 'Saad',
        emp_age: 22,
        is_Active:1
 
 
        },
        {
            emp_id:3,
            emp_name: 'Ahmad',
            emp_age: 23,
            is_Active:0
     
     
            }

    ]
    const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
   const getData = () => {
  axios.get('https://localhost:7279/api/Employee')
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
      axios.get(`https://localhost:7279/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name)
        setEditAge(result.data.age)
        setEditIsActive(result.data.isActive)
        setEditId(id)


      })
      .catch((error) => {
        toast.error(error);
      });

    }
    const handleDelete = (id) => {
      if (window.confirm("Are You Sure to Delete?")) {
        axios.delete(`https://localhost:7279/api/Employee/${id}`)
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
    const url= ` https://localhost:7279/api/Employee/${editId}`
    const data={
      "id": editId,
      "name": editName,
      "age": editAge,
      "isActive": editIsActive
    
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
    const handlSave=()=>{
      const url='https://localhost:7279/api/Employee';
      const data={
        
          "name": Name,
          "age": Age,
          "isActive": IsActive
        
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
        setName('');
        setAge('');
        setIsActive(0);
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
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
        <input type="text" className="form-control" placeholder="Enter Name" value={Name} 
        onChange={(e)=>setName(e.target.value)}
        />
        </Col>
        <Col><input type="text" className="form-control" placeholder="Enter Age" value={Age}
        onChange={(e)=>setAge(e.target.value)}
        /></Col>
        <Col><input type="checkbox" checked={IsActive === 1 ? true : false}
        onChange={(e)=>handleIsActive(e)} value={IsActive}
        />
        <label >isActive</label></Col>
        <Col>
        <button className="btn btn-primary" onClick={()=>handlSave()}>Submit</button>
        </Col>
      </Row>
    </Container>
    <br></br>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Is Active</th>
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
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
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
        <input type="text" className="form-control" placeholder="Enter Name" value={editName} 
        onChange={(e)=>setEditName(e.target.value)}
        />
        </Col>
        <Col><input type="text" className="form-control" placeholder="Enter Age" value={editAge}
        onChange={(e)=>setEditAge(e.target.value)}
        /></Col>
        <Col><input type="checkbox" checked={editIsActive === 1 ? true : false}
        onChange={(e)=>handleEditActive(e)} value={editIsActive}
        />
        <label >isActive</label></Col>
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
export default InventoryCrud;