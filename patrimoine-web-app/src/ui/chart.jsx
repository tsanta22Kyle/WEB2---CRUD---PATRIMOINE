import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./PatrimoineChart.css"; // Custom CSS file
import { useNavigate } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Sidebar, Navbar } from "./dashboard";
const PatrimoineChart1 = () => {
  const nav = useNavigate();
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [data, setData] = useState(null);
  const [possessions, setPossessions] = useState([]);

  function getValueAtThisMoment(possession, date) {
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

  useEffect(() => {
    async function Load() {
      try {
        const res = await axios.get("http://localhost:3000/" + "possession");
        setPossessions([...res.data]);
      } catch (error) {
        console.log(error);
      }
    }
    Load();
  }, []);

  const handleValidate = () => {
    const fetchData = async () => {
      const result = await fetchValeurPatrimoine(dateDebut, dateFin);
      setData(result);
    };
    fetchData();
  };

  const fetchValeurPatrimoine = async (dateDebut, dateFin) => {
    const labels = [];
    const dateStart = new Date(dateDebut);
    const dateEnd = new Date(dateFin);

    while (dateStart <= dateEnd) {
      labels.push(dateStart.toLocaleDateString("fr-FR"));
      dateStart.setDate(dateStart.getDate() + 1);
    }

    return {
      labels,
      datasets: [
        {
          label: "Valeur Patrimoine",
          data: labels.map((label) => {
            const date = new Date(label.split("/").reverse().join("-"));
            return possessions.reduce(
              (sum, possession) => sum + getValueAtThisMoment(possession, date),
              0
            );
          }),
          borderColor: "black",
          backgroundColor: "black",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <h1>Les statistiques de mon patrimoine</h1>
      <div className="patrimoine-chart-container ">
        <div className="form-group">
          <label htmlFor="debut">Date Début (jj-mm-AA):</label>
          <DatePicker
            className="form-control"
            id="debut"
            selected={dateDebut}
            onChange={(date) => setDateDebut(date)}
            dateFormat="dd-MM-yy"
          />
        </div>
        <div className="form-group">
          <label>Date Fin (jj-mm-AA):</label>
          <DatePicker
            className="form-control"
            selected={dateFin}
            onChange={(date) => setDateFin(date)}
            dateFormat="dd-MM-yy"
          />
        </div>
        <button className="btn btn-primary" onClick={handleValidate}>
          Validate
        </button>

        {data && (
          <div className="chart-container">
            <Line
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      font: {
                        size: 14,
                        family: "Arial, sans-serif",
                      },
                    },
                  },
                  title: {
                    display: true,
                    text: "Valeur Patrimoine Chart",
                    font: {
                      size: 20,
                      family: "Arial, sans-serif",
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                      font: {
                        size: 16,
                        family: "Arial, sans-serif",
                      },
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Valeur",
                      font: {
                        size: 16,
                        family: "Arial, sans-serif",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}
        <div>
        </div>
      </div>
          <button
            onClick={() => {
              nav("/#acceuil");
            }}
            className="btn btn-primary mx-5 "
          >
             <i class="fa-solid fa-arrow-left mx-3"></i>
            Revenir à la liste des possessions
          </button>
    </>
  );
};

export default PatrimoineChart1;
