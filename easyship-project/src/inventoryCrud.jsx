import React, { useState,useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function InventoryCrud()
{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

      alert(id);
    }
    const handleDelete=(id)=>{
      if(window.confirm("Are You Sure to Delete?" )==true)
      {
        alert(id);

      }

      
    }
return(
    <>
    <Fragment>
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
    </Fragment>
    
    
    
    </>
)

}
export default InventoryCrud;