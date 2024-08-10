import { useState, useEffect } from "react";
import "./index.css";

// import { readFileSync, writeFileSync } from "fs";
import Flux from "../../../models/possessions/Flux.js";
// import { log } from "console"
import { myData } from "../../../handler.js";

import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";

initMDB({ Dropdown, Collapse });
import Personne from "../../../models/Personne.js";
import Possession from "../../../models/possessions/Possession.js";

// function PatrimonyCard() {

//   return (
//     <>

//     </>
//   );
// }

function Sidebar() {
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

         <a href="#acceuil" className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover row text-center link-offset-3-hover ">Mon patrimoine</a>
          </label>
          <label htmlFor="offcanvasWithBothOptions" data-bs-dismiss="offcanvas">
         <a href="#total" className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover row text-center link-offset-3-hover">le total</a>
          </label>
        </div>
      </div>
    </>
  );
}
function Navbar() {
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
                <a className="nav-link" href="#">
                  Profile
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

function App() {

  let dateD = new Date(2024, 9, 24);
  const John = new Personne("John");
  const [possessions, setPossessions] = useState(myData);
  const [possessionInstance, setPossessionsInstance] = useState([
    ...possessions,
  ]);

  const mypossessList = [...possessions];
  let actualValueArr = [];
  let valueToThisMoment = [];
  const today = new Date();
  for (let i = 0; i < mypossessList.length; i++) {
    const mypossess = { ...mypossessList[i] };
    let debutDate = new Date(
      Number(mypossess.dateDebut.slice(0, 4)),
      Number(mypossess.dateDebut.slice(6, 7)),
      Number(mypossess.dateDebut.slice(9, 10))
    );
    const mypossessInstance = new Possession(
      mypossess.possesseur,
      mypossess.libelle,
      mypossess.valeur,
      debutDate,
      mypossess.dateFin,
      mypossess.tauxAmortissement
    );
    // console.log(mypossessInstance.getValeurApresAmortissement(today));
    // console.log(mypossess.dateDebut.slice(9,10));
    actualValueArr.push(mypossessInstance.getValeurApresAmortissement(today));
  }
  // console.log(actualValueArr);
  const [value, setvalue] = useState(0);

  
  function AutoIncrementer({ maxValue }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      // Fonction pour auto-incrémenter
      const increment = () => {
        setCount((prevCount) => {
          if (prevCount < maxValue) {
            return prevCount + 100000;
          } else {
            return prevCount; // Arrêter l'incrémentation
          }
        });
      };

      // Déclenche l'incrémentation à chaque 1 seconde
      const intervalId = setInterval(increment, 0.2);

      // Nettoyage de l'intervalle pour éviter les fuites de mémoire
      return () => clearInterval(intervalId);
    }, [maxValue]); // Dépendance sur maxValue

    return (
      <div>
        <h1>{count}</h1>
      </div>
    );
  }

  let sum = 0;

  function updateTotal(e) {
    e.preventDefault();
    // increment()
    let form = new FormData(e.target);
    const formEntriesArray = Array.from(form.entries());
    for (let i = 0; i < mypossessList.length; i++) {
      const mypossess = { ...mypossessList[i] };
      let instantDate = new Date(
        Number(formEntriesArray[0][1].slice(0, 4)), // Année
        Number(formEntriesArray[0][1].slice(5, 7)) - 1, // Mois (les mois sont indexés à partir de 0)
        Number(formEntriesArray[0][1].slice(8, 10)) // Jour
      );
      let debutDate = new Date(
        Number(mypossess.dateDebut.slice(0, 4)),
        Number(mypossess.dateDebut.slice(6, 7)),
        Number(mypossess.dateDebut.slice(9, 10))
      );
      const mypossessInstance = new Possession(
        mypossess.possesseur,
        mypossess.libelle,
        mypossess.valeur,
        debutDate,
        mypossess.dateFin,
        mypossess.tauxAmortissement
      );
      // console.log(mypossessInstance.getValeurApresAmortissement(instantDate));
      // console.log(mypossess.dateDebut.slice(9,10));
      valueToThisMoment.push(
        mypossessInstance.getValeurApresAmortissement(instantDate)
      );
      console.log(instantDate.getFullYear());
    }
    //  console.log(form.entries)

    console.log(valueToThisMoment);
    sum = valueToThisMoment.reduce((acc, val) => acc + val, 0);
    console.log("sum : " + sum);
    setvalue(sum);
  }

  // setPossessionsInstance([...possessionInstance,new Possession(possession.possesseur,possession.libelle,possession.valeur,possession.dateDebut,possession.dateFin,possession.tauxAmortissement)])

  // possessions.forEach((poss) => {
  //   setPossessionsInstance([
  //     new Possession(
  //       poss.possesseur,
  //       poss.libelle,
  //       poss.valeur,
  //       poss.dateDebut,
  //       poss.dateFin,
  //       poss.tauxAmortissement
  //     ),
  //   ]);
  // });

  // console.log(possessions[0]);
  // const carUrl = "";
  // const houseUrl = "";
  // const pcUrl = "";
  // const salaryUrl = "";

  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <main>
        <section className="container-fluid main" id="acceuil">
          {/* <PatrimonyCard></PatrimonyCard> */}
          
          <h1 className="text-center m-5 border-dark-subtle link-underline-opacity-100-hoverr border rounded-0 btn-lg width ">{John.nom}'s Patrimony</h1>
          <div className="card-wrapper container mt-10 ">
            <table className="container">
              <tr className=" row container">
                <td className="col-2 border-dark border">libellé</td>
                <td className="col-2 border-dark border">valeur initiale</td>
                <td className="col-2 border-dark border">date début</td>
                <td className="col-2 border-dark border">date de fin</td>
                <td className="col-2 border-dark border">amortissement</td>
                <td className="col-2 border-dark border">valeur actuelle</td>
              </tr>
              {possessions.map((possession, index) => (
                <tr className=" row container">
                  <td className="col-2 border-dark border bg-danger">
                    {possession.libelle}
                  </td>
                  <td className="col-2 border-dark border bg-black text-white">
                    {possession.valeur}
                  </td>
                  <td className="col-2 border-dark border bg-danger">
                    {possession.dateDebut.slice(0, 10)}
                  </td>
                  <td className="col-2 border-dark border bg-black text-white">
                    {possession.dateFin != null
                      ? possession.dateFin.slice(0,10)
                      : "XXXX-ZZ-YY"}
                  </td>
                  <td className="col-2 border-dark border bg-danger">
                    {possession.tauxAmortissement != null
                      ? possession.tauxAmortissement
                      : "constant"}
                  </td>
                  <td className="col-2 border-dark border bg-black text-white">
                    {actualValueArr[index]}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </section>
        <section id="total" className="mt-5 container-fluid flex-row ">
          <h1 className="text-center  border-dark-subtle border rounded-0 btn-lg width ">Patrimoine infos</h1>
          <div className="row bg-danger h-100">
            <form
              className="container form-total col w-25 bg-black  "
              onSubmit={updateTotal}
            >
              <input
                type="date"
                name="dateInfo"
                id="dateInfo"
                className="w-100 row bg- border-0 h-25 m-auto text-lg-center"
              />
              <button
                type="submit"
                className="btn btn-outline-secondary row w-100 h-25 "
              >
                obtenir le total
              </button>
            </form>
            <div className="col container bg-danger total-container ">
              <div className="container w-75 border-1 h-75 rounded-4 total-content">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/credit-loan-elements-color-filled/5000/Credit-loan-elements-color-17-512.png"
                  className="total-icon"
                  alt="Black and White bg menu"
                  loading="lazy"
                />
                <h3>
                Valeur : &nbsp;
                </h3>

                <AutoIncrementer maxValue={Math.round(value)}></AutoIncrementer>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
