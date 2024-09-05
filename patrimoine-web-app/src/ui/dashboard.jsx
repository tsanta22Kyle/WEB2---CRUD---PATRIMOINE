import { useState, useEffect } from "react";
import "./../index.css";

import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "./dumb-components/Sidebar.jsx";
import Navbar from "./dumb-components/Navbar.jsx";
import UpdatePossession from "./smart-components/updatePossession.jsx";
import AddPossession from "./smart-components/addPossession.jsx";
import AutoIncrementer from "./dumb-components/AutoIncrement.jsx";

import { DeletePossession } from "./smart-components/deletePossessions.jsx";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";

import { Toast } from "bootstrap";
import { getValeurApresAmortissement,getValueAtThisMoment } from "./smart-components/getValues.jsx";
initMDB({ Dropdown, Collapse });
function Dashboard() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [email, setEmail] = useState("");
  const [possessions, setPossessions] = useState([]);
  const [visible, setVisible] = useState(false);
  function showUpdateInterface() {
    setShowUpdate(!showUpdate);
  }

  function toggle() {
    setVisible(!visible);
  }

 

  useEffect(() => {
    async function Load() {
      try {
        const res = await axios.get(url + "possession");
        setPossessions([...res.data]);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
    Load();
  }, [possessions]);

  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const user = await axios.get(url);
      setUser(user.data[0].username);
      setEmail(user.data[0].email);
    } catch (error) {
      console.log(error);
    }
  };

  const [possessionInstance, setPossessionsInstance] = useState([
    ...possessions,
  ]);

  const [value, setvalue] = useState(0);


  let sum = 0;
   function updateTotal(e) {
    e.preventDefault();
    // increment()
    let form = new FormData(e.target);
    const formEntriesArray = Array.from(form.entries());
    const allValuesAtThisMoment = [];
    let instantDate = new Date(
      Number(formEntriesArray[0][1].slice(0, 4)), // Année
      Number(formEntriesArray[0][1].slice(5, 7)) - 1, // Mois (les mois sont indexés à partir de 0)
      Number(formEntriesArray[0][1].slice(8, 10)) // Jour
    );

    possessions.forEach((possession) => {
      allValuesAtThisMoment.push(getValueAtThisMoment(possession, instantDate));
    });
    sum = allValuesAtThisMoment.reduce((prev, curr) => prev + curr, 0);
    console.log(sum);
    setvalue(sum);
  }
 

  const [id, setId] = useState("");

  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <main>
        <motion.div
          initial={{ display: "none" }}
          animate={{ display: visible ? "" : "none" }}
          className="box position-fixed "
        >
          <AddPossession func={toggle} email={email} />
        </motion.div>
        <section className="container-fluid main" id="acceuil">
          <h1 className="text-center m-5 border-dark-subtle link-underline-opacity-100-hoverr border rounded-0 btn-lg width ">
            {user}'s Patrimony
          </h1>
          <div className="card-wrapper container mt-10 ">
            <table className="container table-design ">
              <tr className=" row container top-of-table bg-white">
                <td className="col-2 ">
                  <h2>Possessions</h2>
                </td>
                <td className="col-2 ">
                  <button
                    className="btn btn-primary align-self-center"
                    onClick={toggle}
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </td>
                <td className="col-2 "></td>
                <td className="col-2 "></td>
                <td className="col-2 "></td>
                <td className="col-2 ">
                  <button className="btn btn-primary align-self-center">
                    <i class="fa-solid fa-filter"></i>
                  </button>
                </td>
              </tr>
              <tr className=" row container top-of-table">
                <td className="col-2 ">libellé</td>
                <td className="col-2 ">valeur initiale</td>
                <td className="col-2 ">date début</td>
                <td className="col-2 ">date de fin</td>
                <td className="col-2 ">amortissement</td>
                <td className="col-2 ">valeur actuelle</td>
              </tr>
              {possessions.map((possession, index) => (
                <div className="container-fluid d-flex align-items-center justify-content-around all-possess">
                  <motion.div
                    initial={{ display: "none" }}
                    animate={{ display: showUpdate ? "" : "none" }}
                    className="box position-fixed"
                  >
                    <UpdatePossession
                      func={showUpdateInterface}
                      possessionID={id}
                      email={email}
                    ></UpdatePossession>
                  </motion.div>

                  <tr className=" row  aPile-design container-fluid ">
                    <td className="col-2   ">{possession.possessionname}</td>
                    <td className="col-2  ">{possession.value}</td>
                    <td className="col-2  ">
                      {possession.owningdate.slice(0, 10)}
                    </td>
                    <td className="col-2  ">
                      {possession.enddate == null
                        ? "XXXX-ZZ-YY"
                        : possession.enddate.slice(0, 10)}
                    </td>
                    <td className="col-2  ">
                      {possession.decreasingrate != null
                        ? possession.decreasingrate
                        : "constant"}
                    </td>
                    <td className="col-2  ">
                      {getValeurApresAmortissement(possession)}
                    </td>

                    <td className=" position-absolute col-2  container delete-update ">
                      <button
                        onClick={() => {
                          showUpdateInterface();
                          setId(possession.possessionid);
                        }}
                        className="btn btn-success align-self-center  update-btn col-3 m-1"
                      >
                        <i class="fa-solid fa-pen-nib"></i>
                      </button>
                      <button
                        onClick={() => {
                          DeletePossession(possession.possessionid, email);
                          // setId(possession.possessionid);
                        }}
                        className="btn btn-danger align-self-center  delete-btn col-3 m-1"
                      >
                        <i class="fa-solid fa-delete-left"></i>
                      </button>
                    </td>
                  </tr>
                </div>
              ))}
            </table>
          </div>
        </section>
        <section id="total" className="all-pat-info mt-5 ">
          <h1 className="text-center ">Patrimoine infos</h1>
          <h3>La valeur Totale </h3>
          <div className="pat-info-content">
            <form className=" form-total input-group " onSubmit={updateTotal}>
              <input
                type="date"
                name="dateInfo"
                id="dateInfo"
                className=" form-control"
              />
              <button type="submit" className="btn btn-outline-success   ">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </form>
            <div className="total-container bg-primary ">
              <div className="total-content">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/credit-loan-elements-color-filled/5000/Credit-loan-elements-color-17-512.png"
                  className="total-icon"
                  alt="Black and White bg menu"
                  loading="lazy"
                />

                <div>
                  <AutoIncrementer
                    maxValue={Math.round(value)}
                    delay={100}
                    incrementBy={1000}
                  ></AutoIncrementer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
export const url = import.meta.env.VITE_API_URL;
