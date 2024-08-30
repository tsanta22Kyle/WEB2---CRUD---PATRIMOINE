import { useState, useEffect,useRef } from "react";
import "./../index.css";
import { motion, AnimatePresence } from "framer-motion";
import axios, { all, Axios } from "axios";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";

// import { url } from "../src/ui/dashboard";
// import LoadPossessions from "../../public/loadPossessions.jsx";
// import { readFileSync, writeFileSync } from "fs";
import Flux from "../../../models/possessions/Flux.js";
// import { log } from "console"
// import { myData } from "../../../handler.js";

import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";

initMDB({ Dropdown, Collapse });
import Personne from "../../../models/Personne.js";
import Possession from "../../../models/possessions/Possession.js";
import { Toast } from "bootstrap";

// function PatrimonyCard() {

//   return (
//     <>

//     </>
//   );
// }

export function Sidebar() {
  return (
    <>
      {/* <button
        class="btn "
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        {" "}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
          className="rounded-circle"
          height="25"
          alt="Black and White bg menu"
          loading="lazy"
        />
      </button> */}

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Gestionnaire de patrimoine
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body container col myLinks">
          <label htmlFor="offcanvasWithBothOptions" data-bs-dismiss="offcanvas">
            <a
              href="/#acceuil"
              className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover row text-center link-offset-3-hover "
            >
              Mon patrimoine
            </a>
          </label>
          <label htmlFor="offcanvasWithBothOptions" data-bs-dismiss="offcanvas">
            <a
              href="/#total"
              className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover row text-center link-offset-3-hover"
            >
              le total
            </a>
          </label>
          <label htmlFor="offcanvasWithBothOptions" data-bs-dismiss="offcanvas">
            <a
              href="/chart"
              className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover row text-center link-offset-3-hover"
            >
              voir les stats
            </a>
          </label>
        </div>
      </div>
    </>
  );
}
export function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary main-navbar fixed-top">
        <div className="container-fluid">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>

          <button
            class="btn "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
              className="rounded-circle"
              height="25"
              alt="Black and White bg menu"
              loading="lazy"
            />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Patrimony
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chart">
                  stats
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown">
              {/* <a
                data-mdb-dropdown-init
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                
               
              </a> */}
              {/* <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul> */}
            </div>

            <div className="dropdown">
              <a
                data-mdb-dropdown-init
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                aria-expanded="false"
              >
                <img
                  src="https://static-00.iconduck.com/assets.00/person-circle-icon-512x512-zwz8ctki.png"
                  className="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function UpdatePossession({ func, email, possessionID }) {
  const { handleSubmit, register, watch } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    func();
    async function put() {
      try {
        const res = await axios.put(url + "possession/" + possessionID, {
          ...data,
          email: email,
          possessionID: possessionID,
        });

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    put();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="add-possession-container"
      >
        <button
          type="button"
          class="btn-close close-btn"
          aria-label="Close"
          onClick={func}
        ></button>
        <h3 className="mt-2 mb-1">Mettre à jour une possession</h3>
        <div className="w-75">
          <label htmlFor="name" className="form-label">
            nouveau Libellé
          </label>
          <input
            type="text"
            className="possession-name form-control"
            id="name"
            {...register("possessionNameNew", {
              required: true,
            })}
            placeholder="le nouveau nom"
          />
        </div>
        <div className="w-75">
          <label htmlFor="name" className="form-label">
            date de fin
          </label>
          <input
            type="date"
            className="possession-name form-control"
            id="name"
            {...register("endDate", {
              required: false,
            })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          UPDATE
        </button>
      </form>
    </>
  );
}

function AddPossession({ func, email }) {
  const { handleSubmit, register, watch } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    func();
    async function post() {
      try {
        const res = await axios.post(url + "possession", {
          ...data,
          email: email,
        });

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    post();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="add-possession-container"
      >
        <button
          type="button"
          class="btn-close close-btn"
          aria-label="Close"
          onClick={func}
        ></button>
        <h3 className="mt-2 mb-1">Ajouter une possession</h3>

        <div className="w-75">
          <label htmlFor="name" className="form-label">
            Libellé
          </label>
          <input
            type="text"
            className="possession-name form-control"
            id="name"
            {...register("possessionName", {
              required: true,
            })}
          />
        </div>
        <div className="w-75">
          <label htmlFor="initial-value" className="form-label">
            valeur initiale
          </label>
          <input
            type="text"
            id="initial-value"
            className="form-control"
            {...register("possessionValue", {
              required: {
                value: true,
              },
            })}
          />
        </div>
        <div className="w-75">
          <label htmlFor="owning-date" className="form-label">
            date d'obtention
          </label>
          <input
            type="date"
            name="obtention"
            id="owning-date"
            className="form-control"
            {...register("owningDate", {
              required: {
                value: true,
              },
            })}
          />
        </div>
        <div className="w-75">
          <label id="decreasing-rate" className="form-label">
            Taux d'amortissement
          </label>
          <select
            class="form-select"
            aria-label="decreasing-rate"
            {...register("decreasingRate", {
              required: {
                value: true,
              },
            })}
          >
            <option selected>2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          ADD
        </button>
      </form>
    </>
  );
}
export const url = "http://localhost:3000/";

// const MyComponent = ({ isVisible }) => (
//   <AnimatePresence>
//     {isVisible && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       />
//     )}
//   </AnimatePresence>
// )
function AutoIncrementer({ maxValue, incrementBy, delay }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const increment = () => {
      setCount((prevCount) => {
        if (prevCount + incrementBy <= maxValue) {
          return prevCount + incrementBy;
        } else {
          return maxValue; // Arrêter l'incrémentation à maxValue
        }
      });
    };

    const intervalId = setInterval(increment, delay);

    // Nettoyage de l'intervalle pour éviter les fuites de mémoire
    return () => clearInterval(intervalId);
  }, [incrementBy, delay, maxValue]);

  return (
    <div>
      <h1> {countRef.current}</h1>
    </div>
  );
}
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

  async function DeletePossession(possessionID, email) {
    try {
      const res = await axios.delete(
        url + "possession/" + possessionID,

        {
          params: {
            id: possessionID,
          },
        }
      );
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function Load() {
      try {
        const res = await axios.get(url + "possession");
        setPossessions([...res.data]);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
    Load();
  }, [possessions]);

  const [user, setUser] = useState("");
  // const {possessions} = LoadPossessions();
  // console.log(possessions);
  // console.log(possessions);
  const getUser = async () => {
    try {
      const user = await axios.get(url);
      setUser(user.data[0].username);
      setEmail(user.data[0].email);
    } catch (error) {
      console.log(error);
    }
  };

  let dateD = new Date(2024, 9, 24);

  //const [possessions, setPossessions] = useState(myData);
  const [possessionInstance, setPossessionsInstance] = useState([
    ...possessions,
  ]);

  const mypossessList = [...possessions];
  let actualValueArr = [];
  let valueToThisMoment = [];
  const today = new Date();
  // for (let i = 0; i < mypossessList.length; i++) {
  //   const mypossess = { ...mypossessList[i] };
  //   let debutDate = new Date(
  //     Number(mypossess.owningdate.slice(0, 4)),
  //     Number(mypossess.owningdate.slice(6, 7)),
  //     Number(mypossess.owningdate.slice(9, 10))
  //   );
  //   const mypossessInstance = new Possession(
  //     mypossess.possesseur,
  //     mypossess.libelle,
  //     mypossess.valeur,
  //     debutDate,
  //     mypossess.dateFin,
  //     mypossess.tauxAmortissement
  //   );
  //   // console.log(mypossessInstance.getValeurApresAmortissement(today));
  //   // console.log(mypossess.owningdate.slice(9,10));
  //   actualValueArr.push(mypossessInstance.getValeurApresAmortissement(today));
  // }
  // console.log(actualValueArr);
  const [value, setvalue] = useState(0);
  

  function getValue(date) {
    const nombreDeMois = (debut, dateEvaluation, jourJ) => {
      let compteur = 0;

      if (debut.getDate() < jourJ) {
        compteur++;
      }

      if (
        dateEvaluation.getDate() >= jourJ &&
        !(
          debut.getFullYear() === dateEvaluation.getFullYear() &&
          debut.getMonth() === dateEvaluation.getMonth()
        )
      ) {
        compteur++;
      }

      let totalMois =
        (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 +
        (dateEvaluation.getMonth() - debut.getMonth()) -
        1;

      compteur += Math.max(0, totalMois);

      return compteur;
    };

    // calcul montant total

    this.valeur +=
      nombreDeMois(this.dateDebut, date, this.jour) * this.valeurConstante;

    return this.valeur;
  }

  function getValeurApresAmortissement(possession) {
    const dateActuelle = new Date();
    const possessionOwningDate = new Date(possession.owningdate);
    if (dateActuelle < possessionOwningDate) {
      return 0;
    }
    const differenceDate = {
      year: dateActuelle.getFullYear() - possessionOwningDate.getFullYear(),
      month: dateActuelle.getMonth() - possessionOwningDate.getMonth(),
      day: dateActuelle.getDate() - possessionOwningDate.getDate(),
    };

    var raison =
      differenceDate.year +
      differenceDate.month / 12 +
      differenceDate.day / 365;

    const result =
      possession.value -
      possession.value * ((raison * possession.decreasingrate) / 100);
    return result;
  }
  function getValueAtThisMoment(possession, date) {
    // const dateActuelle = new Date();
    const possessionOwningDate = new Date(possession.owningdate);
    if (date < possessionOwningDate) {
      return 0;
    }
    const differenceDate = {
      year: date.getFullYear() - possessionOwningDate.getFullYear(),
      month: date.getMonth() - possessionOwningDate.getMonth(),
      day: date.getDate() - possessionOwningDate.getDate(),
    };

    var raison =
      differenceDate.year +
      differenceDate.month / 12 +
      differenceDate.day / 365;

    const result =
      possession.value -
      possession.value * ((raison * possession.decreasingrate) / 100);
    return result;
  }

  
  
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
    sum = allValuesAtThisMoment.reduce((prev,curr)=>prev+curr,0)
    console.log(sum)
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
          {/* <PatrimonyCard></PatrimonyCard> */}

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
          <h1 className="text-center ">
            Patrimoine infos
          </h1>
            <h3>La valeur Totale </h3>
          <div className="pat-info-content">
            <form
              className=" form-total input-group "
              onSubmit={updateTotal}
            >
              <input
                type="date"
                name="dateInfo"
                id="dateInfo"
                className=" form-control"
              />
              <button
                type="submit"
                className="btn btn-outline-success   "
              >
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

                <AutoIncrementer maxValue={Math.round(value)} delay={100} incrementBy={1000}></AutoIncrementer>
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
