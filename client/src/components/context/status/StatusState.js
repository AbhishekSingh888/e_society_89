import StatusContext from "./StatusContext";
import { useState } from "react";


const StatuState = (props) => {
  const host = 'http://localhost:5000';

  const [status, setStatus] = useState([]);

  const getAllstatus = async () => {
    const response = await fetch(`${host}/fetchAllStatus`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setStatus(json);
  };

  //add note  
  const addStatus = async (title, desc) => {
    //call api
    const response = await fetch(`${host}/addstatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, desc })
    });
    const json = await response.json();
    setStatus(status.concat(json));
  }

  //delete note
  const deleteStatus = async (id) => {
    const response = await fetch(`${host}/deletestatus/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    console.log(response);
    // const newstatus = status.filter((single_status) => {
    //   return id !== note._id;
    // });
    // setStatus(newstatus);
  }

  //edit note
  const editStatus = async (id, title, desc) => {
    //api callfetchallstatus
    let url = `http://localhost:5000/updateStatus/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, desc })
    });
    const json = await response.json();
    console.log(json);
    // //client update logic
    // let newstatus = JSON.parse(JSON.stringify(status));
    // for (let index = 0; index < newstatus.length; index++) {
    //   const element = newstatus[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = desc;
    //     break;
    //   }
    // }
    // setStatus(newstatus);
  }

  return (
    <StatusContext.Provider value={{ status, addStatus, editStatus, deleteStatus, getAllstatus }}>
      {props.children}
    </StatusContext.Provider>

  )
}

export default StatuState;