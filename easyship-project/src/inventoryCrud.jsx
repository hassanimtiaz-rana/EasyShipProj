import React, { useState,useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InventoryCrud()
{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[name,setName]=useState('');
  const[age,setAge]=useState('');
  const[isActive,setIsActive]=useState(0);

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
    const [data,setdata]=useState([]);
    useEffect(()=>{
        setdata(empdata)


    },[])
    const handleEdit=(id)=>{

      //alert(id);
      handleShow();
    }
    const handleDelete=(id)=>{
      if(window.confirm("Are You Sure to Delete?" )==true)
      {
        alert(id);

      }

      
    }
    const handleUpdate=()=>{

    }
return(
    <>
    <Fragment>
    <Container>
      
      <Row>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Name" value={name} 
        onChange={(e)=>setName(e.target.value)}
        />
        </Col>
        <Col><input type="text" className="form-control" placeholder="Enter Age" value={age}
        onChange={(e)=>setAge(e.target.value)}
        /></Col>
        <Col><input type="checkbox" checked={isActive === 1 ? true : false}
        onChange={(e)=>setIsActive(e)} value={isActive}
        />
        <label >isActive</label></Col>
        <Col>
        <button className="btn btn-primary">Submit</button>
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
                    <td>{item.emp_id}</td>
                    <td>{item.emp_name}</td>
                    <td>{item.emp_age}</td>
                    <td>{item.is_Active}</td>
                    <td colSpan={2}>
                      <button className="btn btn-primary" onClick={()=>handleEdit(item.emp_id)}>Edit</button> &nbsp;
                      <button className="btn btn-danger" onClick={()=>handleDelete(item.emp_id)}>Delete</button>

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
        onChange={(e)=>setEditIsActive(e)} value={editIsActive}
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