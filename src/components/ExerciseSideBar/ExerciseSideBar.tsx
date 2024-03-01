import React, { useEffect, useState } from "react";
import { FaDumbbell, FaRunning, FaWeight, FaHeartbeat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useInfo } from "../../utils/AuthContext";
import { MdFitnessCenter, MdDirectionsRun } from "react-icons/md";

import "./ExerciseSideBar.css";
import axios from "axios";

const ExerciseSideBar = ({ onMuscleSelect }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [activeMuscle, setActiveMuscle] = useState<any>(null);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        console.log("sidebar categories", response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleMuscleClick = (muscle: any) => {
    console.log("kabsne", muscle);
    setActiveMuscle(muscle);
    navigate(`/exercise/${muscle.name}`);
    onMuscleSelect(muscle.name); // Pass the selected muscle name to the parent component
  };

  const shuffleIcons = (): React.ReactNode => {
    const icons = [
      <FaDumbbell />,
      <FaRunning />,
      <FaWeight />,
      <FaHeartbeat />,
    ];
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  return (
    <div className="row">
      <div
        className="bg-dark-custom col-auto col-md-12 min-vh-100 d-flex justify-content-between flex-column"
        style={{ backgroundColor: "black" }}
      >
        <div>
          <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
            {data.map((muscle, index) => (
              <li
                key={index}
                className={`nav-item text-white fs-2 my-1 py-2 py-sm-0 ${
                  activeMuscle === muscle ? "active" : ""
                }`}
              >
                <Link
                  to={muscle.route}
                  className="nav-link text-white fs-2"
                  onClick={() => handleMuscleClick(muscle)}
                >
                  {/* Icon and name */}
                  <span className="ms-2 fs-2 d-none d-sm-inline">
                    {muscle.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSideBar;
