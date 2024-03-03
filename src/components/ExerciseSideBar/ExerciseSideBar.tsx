import React, { useEffect, useState } from "react";
import { FaDumbbell, FaRunning, FaWeight, FaHeartbeat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {
  onMuscleSelect: (muscleName: string) => void;
}

const ExerciseSideBar: React.FC<Props> = ({ onMuscleSelect }) => {
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

  return (
    <div className="col" style={{ width: "100%" }}>
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
                style={{
                  backgroundColor:
                    activeMuscle === muscle ? "rgb(201, 34, 34)" : "inherit",
                }}
              >
                <Link
                  to={muscle.route}
                  className="nav-link text-white fs-2"
                  onClick={() => handleMuscleClick(muscle)}
                >
                  {/* Icon and name */}
                  <span className="ms-2 fs-2 d-sm-block fs-6 d-md-none">
                    {/* On smaller screens (md and below), use fs-6 */}
                    {muscle.name}
                  </span>
                  <span className="ms-2 fs-2 d-none d-sm-block">
                    {/* On larger screens (lg and above), use fs-2 */}
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
