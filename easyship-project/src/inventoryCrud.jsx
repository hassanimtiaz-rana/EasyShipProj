import React, { useState,useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';

function InventoryCrud()
{
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