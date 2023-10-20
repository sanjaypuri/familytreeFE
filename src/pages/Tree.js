import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Tree.css';

export default function Tree() {

  const [father, setFather] = useState([]);
  const [mother, setMother] = useState([]);
  const [spouse, setSpouse] = useState([]);
  const [sons, setSons] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [brothers, setBrothers] = useState([]);
  const [sisters, setSisters] = useState([]);
  const [selected, setSelected] = useState(0);
  const [options, setOptions] = useState([]);
  const token = sessionStorage.getItem("ftbysptoken")
  const baseHeaders = {
    headers: {
      'token': token
    }
  }
  let id = 0;

  const selectUpdate = (selectedOption) => {
    setSelected(selectedOption);
    sessionStorage.setItem("ftbyspcp", selectedOption.label);
    (async () => await loadTree(selectedOption.value))()
  };

  useEffect(() => {
    if (!token) {
      return;
    };
    (async () => await loadSelect())()
  }, [selected]);

  async function loadSelect() {
    axios.get(`http://localhost:5000/api/list`, baseHeaders)
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
    
    async function loadTree(id) {
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
    };
    
    async function findID(recid) {
      await axios.get(`http://localhost:5000/api/getid/${recid}`, baseHeaders)
      .then(res => {
        if (!res.data.success) {
          toast.error(res.data.error);
        } else {
          loadTree(res.data.id);
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

  const jump = (recid, person) => {
    sessionStorage.setItem("ftbyspcp", person);
    (async () => await findID(recid))()
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div>
        <Select
          options={options}
          onChange={selectUpdate}
          style={{ fontSize: '0.6rem' }}
        />
      </div>
      {selected ?
        <>
          <div className="overflow-auto">
            <div className="myrow mt-3">
              <div className="mycard">
                <div className="mycardTitle bg-warning text-bg-warning fw-bold">Father</div>
                {father[0] ? 
                <>
                  <div className="mycardContent" onClick={()=>{jump(father[0], father[2])}}>{father[2]}</div>
                </> : 
                <>
                  <div className="mycardContent">&nbsp;</div>
                </>
                }
              </div>
              <div className="myblank"></div>
              <div className="mycard">
                <div className="mycardTitle bg-warning text-bg-warning fw-bold">Mother</div>
                <div className="mycardContent" onClick={()=>{jump(mother[0], mother[2])}}>{mother[2]}</div>
              </div>
            </div>
            <div className="myrow">
              <div className="myverticalLeft"></div>
              <div className="myblank"></div>
              <div className="myverticalRight"></div>
            </div>
            <div className="myrow">
              <div className="myhorizontalLong"></div>
            </div>
            <div className="myrow">
              <div className="myverticalMiddle"></div>
            </div>
            <div className="myrow">
              <div className="myhorizontalLonger"></div>
            </div>
            <div className="myrow">
              <div className="myverticalLeft"></div>
              <div className="myblank"></div>
              <div className="myverticalMiddle"></div>
              <div className="myblank"></div>
              <div className="myverticalRight"></div>
            </div>
            <div className="myrow">
              <div className="mycard">
                <div className="mycardTitle bg-warning text-bg-warning fw-bold">Brothers</div>
                {
                brothers.length ? 
                <>
                  {brothers.map((brother) => (
                    <div className="mycardContent" onClick={()=>{jump(brother[0], brother[2])}}>{brother[2]}</div>
                  ))}
                </> : 
                <>
                  <div className="mycardContent">&nbsp;</div>
                </>
                }
              </div>
              <div className="myblank"></div>
              <div className="mycardBlank"></div>
              <div className="myblank"></div>
              <div className="mycard">
                <div className="mycardTitle bg-warning text-bg-warning fw-bold">Sisters</div>
                {sisters.map((sister) => (
                  <div className="mycardContent" onClick={()=>{jump(sister[0], sister[2])}}>{sister[2]}</div>
                ))}
              </div>
            </div>
            <div className="myrow">
              <div className="myverticalMiddle"></div>
            </div>
            <div className="myrow">
              <div className="myblankLong"></div>
              <div className="mycard">
                <div className="mycardTitle bg-warning text-bg-warning fw-bold">Person</div>
                {/* <div className="mycardContent">{selected.label}</div> */}
                <div className="mycardContent">{sessionStorage.getItem("ftbyspcp")}</div>
              </div>
              <div className="myblank"></div>
              <div className="mycard">
                <div className="mycardTitle bg-warning text-bg-warning fw-bold">Spouse</div>
                <div className="mycardContent" onClick={()=>{jump(spouse[0], spouse[2])}}>{spouse[2]}</div>
              </div>
            </div>
            <div className="myrow">
              <div className="myblankLong"></div>
              <div className="myverticalMiddle"></div>
              <div className="myblank"></div>
              <div className="myblank"></div>
              <div className="myblank"></div>
              <div className="myverticalMiddle"></div>
            </div>
            <div className="myrow">
              <div className="myblankLong"></div>
              <div className="myhorizontalLong"></div>
            </div>
            <div className="myrow">
              <div className="myblankLong"></div>
              <div className="myverticalMiddle"></div>
            </div>
            <div className="myrow">
              <div className="myblankLong"></div>
              <div className="myhorizontalLong"></div>
            </div>
            <div className="myrow">
              <div className="myblankLong"></div>
              <div className="myverticalLeft"></div>
              <div className="myblank"></div>
              <div className="myverticalRight"></div>
            </div>
            <div className="myrow">
              <div className="myblankLong"></div>
              <div className="mycard">
                <div className="mycardTitle bg-warning text-bg-warning fw-bold">Sons</div>
                {
                sons.length ? 
                <>
                  {sons.map((son) => (
                    <div className="mycardContent" onClick={()=>{jump(son[0], son[2])}}>{son[2]}</div>
                  ))}
                </> : 
                <>
                  <div className="mycardContent">&nbsp;</div>
                </>
                }
              </div>
              <div className="myblank"></div>
              <div className="mycard">
                <div className="mycardTitle bg-warning text-bg-warning fw-bold">Daughters</div>
                {daughters.map((daughter) => (
                  <div className="mycardContent" onClick={()=>{jump(daughter[0], daughter[2])}}>{daughter[2]}</div>
                ))}
              </div>
            </div>
          </div>
        </>
        :
        <>
        </>}
    </div>
  );
}
