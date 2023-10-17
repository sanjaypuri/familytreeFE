import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ListPersons() {

  const navigate = useNavigate();

  const token = sessionStorage.getItem("ftbysptoken")
  const baseHeaders = {
    headers: {
      'token': token
    }
  }

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    if (!token) {
      return
    };
    axios.get("http://localhost:5000/api/listpersons", baseHeaders)
      .then(res => {
        if (!res.data.success) {
          toast.error(res.data.error);
        } else {
          setPersons(res.data.data);
        };
      })
      .catch(err => {
        console.log(err);
        if (err.message === "Request aborted") {
          ;
        } else {
          toast.error("Server Error");
        };
      });
  }, []);

  function toDateString(date) {
    const mydate = new Date(date);
    let month = ["-Jan-", "-Feb-", "-Mar-", "-Apr-", "-May-", "-Jun-", "-Jul-", "-Aug-", "-Sep-", "-Oct-", "-Nov-", "-Dec-"];
    let str = "";
    if (mydate.getDate() < 10) {
      str += "0" + mydate.getDate();
    } else {
      str += mydate.getDate();
    }
    str += month[mydate.getMonth()];
    str += mydate.getFullYear();
    return str;
  }
  
  const filterList = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  const showPerson  = (id, person) => {
    sessionStorage.setItem("ftbyspid", id);
    sessionStorage.setItem("ftbyspperson", person); 
    navigate('/relations');
  };

  return (
    <div className="container d-flex flex-column h-100">
      <div className="row">
        <div className="col text-warning fs-2 text-center">
          List of available persons
        </div>
      </div>
      <div className="row">
        <span className="col-3 text-warning fs-2" style={{marginRight:'auto'}}>
          <input className="form-control" type="text" id="myInput" onKeyUp={filterList} placeholder="Search for names.."/>
        </span>
      </div>
      <div className="flex-grow-1 overflow-auto">
        <table id="myTable" className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Born on</th>
              <th scope="col">Married on</th>
              <th scope="col">Died on</th>
              <th scope="col">Relations</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr>
                <td scope="row">{person.name}</td>
                <td>{!person.dob ? "" : toDateString(person.dob)}</td>
                <td>{!person.dom ? "" : toDateString(person.dom)}</td>
                <td>{!person.dod ? "" : toDateString(person.dod)}</td>
                <td><button className="btn btn-sm btn-outline-warning" onClick={() => {showPerson(person.id, person.name)}}>Add/Modify</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



