import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NewPerson() {

  const navigate = useNavigate();
  const token = sessionStorage.getItem("ftbysptoken")
  const baseHeaders = {
    headers: {
      'token': token
    }
  }

  const [person, setPerson] = useState({
    name: null,
    dob: null,
    dod: null
  });

  const handleSubmit = (event, closeform) => {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }
    axios.post("http://localhost:5000/api/newperson", person, baseHeaders)
      .then(res => {
        if (res.data.success) {
          toast.success(res.data.message);
          // navigate('/login');
        } else {
          if(res.data.error.errno === 1062){
            toast.error("Name already exists, Cannot add duplicate names")
            return;
          } else {
            toast.error("Databse Error");
          };
        };
        if (closeform) {
          navigate('/');
        } else {
          setPerson({
            name: null,
            dob: null,
            dod: null
          });
          document.getElementById("name").value = "";
          document.getElementById("dob").value = "";
          document.getElementById("dod").value = "";
        };
      })
      .catch(err => {
        console.log(err);
        toast.error("Server Error");
      })
  };

  const formIsValid = () => {
    if (person.name === '' || person.name === null) {
      toast.error("Name cannot be empty");
      return false;
    }
    if (person.name.length < 3) {
      toast.error("Username should atleast be three chacters long");
      return false;
    }
    return true;
  };

  return (
    <div>
      {token ? (
        <>
          <div className="row justify-content-center text-bg-Secondary fs-6 pt-5">
            <div className="col-4">
              <form className="bg-dark text-bg-dark p-3 rounded shadow">
                <div className="fw-bold text-center fs-5">Adding a new Person</div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name<span className="text-warning ps-1">*</span></label>
                  <input type="text" className="form-control mb-3" value={person.name} id="name" onChange={(e) => setPerson({ ...person, name: e.target.value })} />
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <input type="date" className="form-control mb-3" value={person.dob} id="dob" onChange={(e) => setPerson({ ...person, dob: e.target.value })} />
                  <label htmlFor="dod" className="form-label">Date of Death</label>
                  <input type="date" className="form-control mb-3" value={person.dod} id="dod" onChange={(e) => setPerson({ ...person, dod: e.target.value })} />
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-warning w-100 mt-3" onClick={(e) => { handleSubmit(e, true) }}>Save & Exit</button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-warning w-100 mt-3" onClick={(e) => { handleSubmit(e, false) }}>Save & Add More</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-bg-secondary" style={{ textAlign: 'center', marginTop: '5%' }}>Please login to use the Family Tree</h1>
        </>
      )}
    </div>
  );
}
