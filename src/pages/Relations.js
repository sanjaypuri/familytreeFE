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
  const token = sessionStorage.getItem("ftbysptoken")
  const baseHeaders = {
    headers: {
      'token': token
    }
  }
  const id = sessionStorage.getItem("ftbyspid");
  const person = sessionStorage.getItem("ftbyspperson");


  useEffect(() => {
    if (!token) {
      return;
    };
    (async () => await load())()
  }, []);

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
              <td className="w-25"><button className="btn btn-sm btn-outline-danger text-danger">Remove</button></td>
            </tr>
            <tr>
              <td>Mother</td>
              <td>{mother[2]}</td>
              <td className="w-25"><button className="btn btn-sm btn-outline-danger text-danger">Remove</button></td>
            </tr>
            <tr>
              <td>Spouce</td>
              <td>{spouse[2]}</td>
              <td className="w-25"><button className="btn btn-sm btn-outline-danger text-danger">Remove</button></td>
            </tr>
            <tr>
              <td style={{verticalAlign: 'top'}}>Son(s)</td>
              <td>
                <table className="table, table-dark">
                  {sons.map((son) => (
                    <tr>
                      <td>{son[2]}</td>
                    </tr>
                  ))}
                </table>
              </td>
              <td className="w-25">
                <table className="table, table-dark">
                  {sons.map((son) => (
                    <tr>
                      <td><button className="btn btn-sm btn-outline-danger">Remove</button></td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
            <tr>
              <td style={{verticalAlign: 'top'}}>Daughter(s)</td>
              <td>
                <table className="table, table-dark">
                  {daughters.map((daughter) => (
                    <tr>
                      <td>daughter[2]</td>
                    </tr>
                  ))}
                </table>
              </td>
              <td className="w-25">
                <table className="table, table-dark">
                  {daughters.map((daughter) => (
                    <tr>
                      <td><button className="btn btn-sm btn-outline-danger">Remove</button></td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
            <tr>
              <td style={{verticalAlign: 'top'}}>Brother(s)</td>
              <table className="table, table-dark">
                {brothers.map((brother) => (
                  <tr>
                    <td>{brother[2]}</td>
                  </tr>
                ))}
              </table>
              <td className="w-25">
                <table className="table, table-dark">
                  {brothers.map((brother) => (
                    <tr>
                      <td><button className="btn btn-sm btn-outline-danger">Remove</button></td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
            <tr>
              <td style={{verticalAlign: 'top'}}>Sister(S)</td>
              <table className="table, table-dark">
                {sisters.map((sister) => (
                  <tr>
                    <td>{sister[2]}</td>
                  </tr>
                ))}
              </table>
              <td className="w-25">
                <table className="table, table-dark">
                  {sisters.map((sister) => (
                    <tr>
                      <td><button className="btn btn-sm btn-outline-danger">Remove</button></td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
