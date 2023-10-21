import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './Relations.css';

export default function Relations() {

  // const navigate = useNavigate();

  const [father, setFather] = useState([]);
  const [mother, setMother] = useState([]);
  const [spouse, setSpouse] = useState([]);
  const [sons, setSons] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [brothers, setBrothers] = useState([]);
  const [sisters, setSisters] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [relation, setRelation] = useState([]);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  //Example for Select Options
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  const token = sessionStorage.getItem("ftbysptoken");
  const baseHeaders = {
    headers: {
      'token': token
    }
  }
  const id = sessionStorage.getItem("ftbyspid");
  const person = sessionStorage.getItem("ftbyspperson");
  const gender = sessionStorage.getItem("ftbyspgender");

  // const styles = {
  //   btnStyle: {
  //     width: '65px',
  //     height: '36px'
  //   }
  // };

  useEffect(() => {
    if (!token) {
      return;
    };
    (async () => await load())()
  }, [toggle]);

  async function load() {
    await axios.get(`http://localhost:5000/api/relations/${id}`, baseHeaders)
      .then(res => {
        if (!res.data.success) {
          toast.error(res.data.error);
        } else {
          setFather(res.data.father);
          setMother(res.data.mother);
          setSpouse(res.data.spouse);
          setSons(res.data.sons);
          setDaughters(res.data.daughters);
          setBrothers(res.data.brothers);
          setSisters(res.data.sisters);
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
    await axios.get(`http://localhost:5000/api/list`, baseHeaders)
      .then(res => {
        if (!res.data.success) {
          toast.error(res.data.error);
        } else {
          setOptions(res.data.data);
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

  };

  const removeRelation = (relid, relofid, gender) => {
    let id;
    let relid2, rel2, relofid2;
    axios.post('http://localhost:5000/api/getid', {
      relationid: relid,
      relationof: relofid
    }, baseHeaders)
      .then(res => {
        if (res.data.success) {
          id = res.data.id;
        }
      })
      .catch(err => {
        toast.error(err);
      });
    axios.delete(`http://localhost:5000/api/delrelations`, {
      relationid: relid,
      relationof: relofid
    }, baseHeaders)
      .then(res => {
        if (res.data.success) {
          if (gender === "Male") {
            switch (relid) {
              case 1:
              case 2:
                relid2 = 4;
                rel2 = relofid
                relofid2 = id;
                break;
              case 3:
                relid2 = 3;
                rel2 = relofid
                relofid2 = id;
                break;
              case 4:
              case 5:
                relid2 = 1;
                rel2 = relofid
                relofid2 = id;
                break;
              case 6:
              case 7:
                relid2 = 6;
                rel2 = relofid
                relofid2 = id;
                break;
            }
          } else {
            switch (relid) {
              case 1:
              case 2:
                relid2 = 5;
                rel2 = relofid
                relofid2 = id;
                break;
              case 3:
                relid2 = 3;
                rel2 = relofid
                relofid2 = id;
                break;
              case 4:
              case 5:
                relid2 = 2;
                rel2 = relofid
                relofid2 = id;
                break;
              case 6:
              case 7:
                relid2 = 7;
                rel2 = relofid
                relofid2 = id;
                break;
            }
          };
        } else {
          toast.error(res.data.error);
        };
      })
      .catch(err => {
        toast.error(err);
      });
    console.log(baseHeaders);
    axios.delete(`http://localhost:5000/api/delrelations2`, {
      relationid: relid2,
      relation: rel2,
      relationof: relofid2
    }, baseHeaders)
      .then(res => {
        toast.success(res.data.message);
        if (toggle) {
          setToggle(0);
        } else {
          setToggle(1);
        };
      })
      .catch(err => {
        toast.error(err);
      });
  };

  const addRelation = (relationid) => {
    switch (relationid) {
      case 1:
        setRelation([relationid, "Father"]);
        break;
      case 2:
        setRelation([relationid, "Mother"]);
        break;
      case 3:
        setRelation([relationid, "Spouse"]);
        break;
      case 4:
        setRelation([relationid, "Son"]);
        break;
      case 5:
        setRelation([relationid, "Daughter"]);
        break;
      case 6:
        setRelation([relationid, "Brother"]);
        break;
      case 7:
        setRelation([relationid, "Sister"]);
        break;
    };
    document.getElementById('id01').style.display = 'block'
  };

  const closeModal01 = () => {
    document.getElementById('id01').style.display = 'none'
  };

  const selectUpdate = (selectedOption) => {
    setSelected(selectedOption);
  };

  const handleRelations = () => {
    let newrelid, newrel, newrelof;
    axios.post("http://localhost:5000/api/newrelation", {
      relationid: relation[0],
      relation: selected.value,
      relationof: id,
    }, baseHeaders)
      .then(res => {
        if (res.data.success) {
          if (gender === "Male") {
            switch (relation[0]) {
              case 1:
              case 2:
                newrelid = 4;
                newrel = id;
                newrelof = selected.value;
                break;
              case 3:
                newrelid = 3;
                newrel = id;
                newrelof = selected.value;
                break;
              case 4:
              case 5:
                newrelid = 1;
                newrel = id;
                newrelof = selected.value;
                break;
              case 6:
              case 7:
                newrelid = 6;
                newrel = id;
                newrelof = selected.value;
                break;
            }
          } else {
            switch (relation[0]) {
              case 1:
              case 2:
                newrelid = 5;
                newrel = id;
                newrelof = selected.value;
                break;
              case 3:
                newrelid = 3;
                newrel = id;
                newrelof = selected.value;
                break;
              case 4:
              case 5:
                newrelid = 2;
                newrel = id;
                newrelof = selected.value;
                break;
              case 6:
              case 7:
                newrelid = 7;
                newrel = id;
                newrelof = selected.value;
                break;
            }
          }
          // };
          axios.post("http://localhost:5000/api/newrelation", {
            relationid: newrelid,
            relation: newrel,
            relationof: newrelof,
          }, baseHeaders)
            .then(res => {
              if (res.data.success) {
                toast.success(res.data.message);
                closeModal01();
                if (toggle) {
                  setToggle(0);
                } else {
                  setToggle(1);
                };
              } else {
                toast.error(res.data.error);
              };
            })
            .catch(err => {
              toast.error(err);
            })
        } else {
          toast.error(res.data.error);
        };
      })
      .catch(err => {
        toast.error(err);
      })
  };

  return (
    <div className="h-100" style={{ fontSize: '0.8rem' }}>
      <div className="row justify-content-center align-items-center h-100  overflow-auto">
        <div className="text-center fs-1 text-warning">{person}</div>
        {/* /////////////SPOUSE CARD//////////////////// */}
        <div className="card w-25">
          <div className="cardHeader">Spouse</div>
          <div className="cardContent">{spouse[2]}</div>
          <div className="cardFooter">
            {spouse[0] ? (
              <button className="btn btn-outline-danger btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { removeRelation(3, spouse[1], spouse[3]) }}>Remove</button>
            ) : (
              <button className="btn btn-outline-success btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { addRelation(3) }}>add</button>
            )}
          </div>
        </div>
        <div className="relations text-bg-secondary">
          <div className="cols shadow">
            <div className="text-center fs-3">Parents</div>
            {/* /////////////FATHER CARD//////////////////// */}
            <div className="card">
              <div className="cardHeader">Father</div>
              <div className="cardContent">{father[2]}</div>
              <div className="cardFooter">
                {father[0] ? (
                  <button className="btn btn-outline-danger btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { removeRelation(3, father[1], father[3]) }}>Remove</button>
                ) : (
                  <button className="btn btn-outline-success btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { addRelation(1) }}>add</button>
                )}
              </div>
            </div>
            {/* /////////////MOTHER CARD//////////////////// */}
            <div className="card">
              <div className="cardHeader">Mother</div>
              <div className="cardContent">{mother[2]}</div>
              <div className="cardFooter">
                {mother[0] ? (
                  <button className="btn btn-outline-danger btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { removeRelation(3, mother[1], mother[3]) }}>Remove</button>
                ) : (
                  <button className="btn btn-outline-success btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { addRelation(2) }}>add</button>
                )}
              </div>
            </div>
          </div>
          <div className="cols shadow">
            <div className="text-center fs-3">Children</div>
            {/* /////////////SON CARD//////////////////// */}
            <div className="card">
              <div className="cardHeader">Sons</div>
              <div className="cardContent">
                <table className="table">
                  {sons.map((son) => (
                    <tr>
                      <td>{son[2]}</td>
                      <td className="text-end" style={{ textAlign: 'right' }}>
                        <button className="btn btn-outline-danger btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { removeRelation(3, son[1], son[3]) }}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
              <div className="cardFooter">
                <button className="btn btn-outline-success btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { addRelation(4) }}>add</button>
              </div>
            </div>
            {/* /////////////DAUGHTER CARD//////////////////// */}
            <div className="card">
              <div className="cardHeader">Daughters</div>
              <div className="cardContent">
                <table className="table">
                  {daughters.map((daughter) => (
                    <tr>
                      <td>{daughter[2]}</td>
                      <td className="text-end" style={{ textAlign: 'right' }}>
                        <button className="btn btn-outline-danger btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { removeRelation(3, daughter[1], daughter[3]) }}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
              <div className="cardFooter">
                <button className="btn btn-outline-success btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { addRelation(5) }}>add</button>
              </div>
            </div>
          </div>
          <div className="cols shadow">
            <div className="text-center fs-3">Siblings</div>
            {/* /////////////BROTHER CARD//////////////////// */}
            <div className="card">
              <div className="cardHeader">Brothers</div>
              <div className="cardContent">
                <table className="table">
                  {brothers.map((brother) => (
                    <tr>
                      <td>{brother[2]}</td>
                      <td className="text-end" style={{ textAlign: 'right' }}>
                        <button className="btn btn-outline-danger btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { removeRelation(3, brother[1], brother[3]) }}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
              <div className="cardFooter">
                <button className="btn btn-outline-success btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { addRelation(6) }}>add</button>
              </div>
            </div>
            {/* /////////////SISTER CARD//////////////////// */}
            <div className="card">
              <div className="cardHeader">Sisters</div>
              <div className="cardContent">
                <table className="table">
                  {sisters.map((sister) => (
                    <tr>
                      <td>{sister[2]}</td>
                      <td className="text-end" style={{ textAlign: 'right' }}>
                        <button className="btn btn-outline-danger btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { removeRelation(3, sister[1], sister[3]) }}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
              <div className="cardFooter">
                <button className="btn btn-outline-success btn-sm fw-bold" style={{ fontSize: '12px' }} onClick={() => { addRelation(7) }}>add</button>
              </div>
            </div>
          </div>
        </div>
        <div id="id01" class="w3-modal">
          <div class="w3-modal-content w-25 rounded bg-dark p-3">
            <div class="w3-container">
              <span onClick={closeModal01} class="w3-button w3-display-topright">&times;</span>
              <div className="row justify-content-start">
                <div className="col-12 text-warning fs-4 mb-3">Adding {relation[1]}</div>
                <div className="col-12 text-bg-dark fs-5">Select Name</div>
                <div className="col-12">
                  <Select
                    options={options}
                    onChange={selectUpdate}
                    style={{ fontSize: '0.6rem' }}
                  />
                </div>
                <div className="row mt-4">
                  <button className="col-4 btn btn-sm btn-outline-warning" style={{ fontSize: "0.8rem" }} onClick={handleRelations}>Save</button>
                  <button className="col-4 btn btn-sm btn-outline-secondary ms-3" style={{ fontSize: "0.8rem" }} onClick={closeModal01}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


