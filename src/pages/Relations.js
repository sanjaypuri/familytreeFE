import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Relations() {

  const navigate = useNavigate();

  const [father, setFather] = useState([]);
  const [mother, setMother] = useState([]);
  const [spouse, setSpouse] = useState([]);
  const [sons, setSons] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [brothers, setBrothers] = useState([]);
  const [sisters, setSisters] = useState([]);
  const [toggle, setToggle] = useState(0);
  const token = sessionStorage.getItem("ftbysptoken")
  const baseHeaders = {
    headers: {
      'token': token
    }
  }
  const id = sessionStorage.getItem("ftbyspid");
  const person = sessionStorage.getItem("ftbyspperson");

  const styles = {
    btnStyle:{
      width:'65px',
      height:'36px'
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    };
    (async () => await load())()
  }, [toggle]);

  async function load() {
    const res = await axios.get(`http://localhost:5000/api/relations/${id}`, baseHeaders)
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

  };

  const removeRelation = (recno) => {
    axios.delete(`http://localhost:5000/api/relation/${recno}`, baseHeaders)
    .then(res => {
      if (res.data.success) {
        toast.success(res.data.message);
        if(toggle) {
          setToggle(0);
        } else {
          setToggle(1);        };
      } else {
        toast.error(res.data.error);
      };
    })
    .catch(err => {
      toast.error(err);
    });
  };

  return (
    <div>
      <div className="row justify-content-center mt-3">
        <div className="col-5 bg-dark shadow rounded">
          <div className="text-bg-dark fs-4 text-center">Immediate Relations of</div>
          <div className="text-warning fs-3 text-center">{person}</div>
          <table className="table table-dark table-striped table-hover">
            <tr>
              <td className="w-25">Father</td>
              <td className="w-50">{father[2]}</td>
              <td className="w-25">
              { father[1] === 0 ?
                  <button className="btn btn-sm btn-outline-danger" style={styles.btnStyle}>Add</button>
                  :
                  <button className="btn btn-sm btn-outline-danger" style={styles.btnStyle} onClick={()=>{removeRelation(father[0])}}>Remove</button>
                }
              </td>
            </tr>
            <tr>
              <td>Mother</td>
              <td>{mother[2]}</td>
              <td className="w-25">
              { mother[1] === 0 ?
                  <button className="btn btn-sm btn-outline-danger" style={styles.btnStyle}>Add</button>
                  :
                  <button className="btn btn-sm btn-outline-danger" style={styles.btnStyle} onClick={()=>{removeRelation(mother[0])}}>Remove</button>
                }
              </td>
            </tr>
            <tr>
              <td>Spouse</td>
              <td>{spouse[2]}</td>
              <td className="w-25">
                { spouse[1] === 0 ?
                  <button className="btn btn-sm btn-outline-danger" style={styles.btnStyle}>Add</button>
                  :
                  <button className="btn btn-sm btn-outline-danger" style={styles.btnStyle} onClick={()=>{removeRelation(spouse[0])}}>Remove</button>
                }
              </td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'top' }}>Son(s)</td>
              <td>
                <table className="table, table-dark">
                  {sons.map((son) => (
                    <tr>
                      <td>{son[2]}</td>
                    </tr>
                  ))}
                  {!sons.length ?
                    <tr>
                      <td>&nbsp;</td>
                    </tr> 
                  :
                  <></>
                  }
                </table>
              </td>
              <td className="w-25">
                <table className="table, table-dark">
                  {sons.map((son) => (
                    <tr>
                      <td>
                        <button className="btn btn-sm btn-outline-danger text-white" style={styles.btnStyle} onClick={()=>{removeRelation(son[0])}}>Remove</button>
                      </td>
                    </tr>       
                  ))}
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan='2'> </td>
              <td><button className="btn btn-sm btn-outline-danger" style={styles.btnStyle}>Add</button></td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'top' }}>daughters(s)</td>
              <td>
                <table className="table, table-dark">
                  {daughters.map((daughter) => (
                    <tr>
                      <td>{daughter[2]}</td>
                    </tr>
                  ))}
                  {!daughters.length ?
                    <tr>
                      <td>&nbsp;</td>
                    </tr> 
                  :
                  <></>
                  }
                </table>
              </td>
              <td className="w-25">
                <table className="table, table-dark">
                  {daughters.map((daughter) => (
                    <tr>
                      <td>
                        <button className="btn btn-sm btn-outline-danger etxt-white" style={styles.btnStyle} onClick={()=>{removeRelation(daughter[0])}}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan='2'> </td>
              <td><button className="btn btn-sm btn-outline-danger" style={styles.btnStyle}>Add</button></td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'top' }}>Brother(s)</td>
              <td>
                <table className="table, table-dark">
                  {brothers.map((brother) => (
                    <tr>
                      <td>{brother[2]}</td>
                    </tr>
                  ))}
                  {!brothers.length ?
                    <tr>
                      <td>&nbsp;</td>
                    </tr> 
                  :
                  <></>
                  }
                </table>
              </td>
              <td className="w-25">
                <table className="table, table-dark">
                  {brothers.map((brother) => (
                    <tr>
                      <td>
                        <button className="btn btn-sm btn-outline-danger text-white" style={styles.btnStyle} onClick={()=>{removeRelation(brother[0])}}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan='2'> </td>
              <td><button className="btn btn-sm btn-outline-danger" style={styles.btnStyle}>Add</button></td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'top' }}>Sister(s)</td>
              <td>
                <table className="table, table-dark">
                  {sisters.map((sister) => (
                    <tr>
                      <td>{sister[2]}</td>
                    </tr>
                  ))}
                  {!sisters.length ?
                    <tr>
                      <td>&nbsp;</td>
                    </tr> 
                  :
                  <></>
                  }
                </table>
              </td>
              <td className="w-25">
                <table className="table, table-dark">
                  {sisters.map((sister) => (
                    <tr>
                      <td>
                        <button className="btn btn-sm btn-outline-danger text-white" style={styles.btnStyle} onClick={()=>{removeRelation(sister[0])}}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan='2'> </td>
              <td><button className="btn btn-sm btn-outline-danger" style={styles.btnStyle}>Add</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
