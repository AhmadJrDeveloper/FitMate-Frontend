import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ExerciseModal from '../../AdminDashboard/AdminExercises/ExerciseModal';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponents';
import ExerciseSideBar from '../../components/ExerciseSideBar/ExerciseSideBar';
import Loader from "../../components/Loader/Loader"; // Assuming Loader component is implemented
import "./Exercises.css";

// Define an interface for the exercise object
interface Exercise {
    _id: string;
    name: string;
    description: string;
    category: {
      _id: string;
      name: string;
    };
    gif: string;
}

const Exercises = () => {
  const [data, setData] = useState<Exercise[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [exercisesPerPage] = useState<number>(10);
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // Define showModal state
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null); // State to store selected muscle

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if a muscle is selected
        if (selectedMuscle) {
          const response = await axios.get<Exercise[]>(`${apiUrl}/exercises/exercise/${selectedMuscle}`);
          setData(response.data);
          console.log("walla ma baaref", response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [apiUrl, selectedMuscle]); // Add selectedMuscle to the dependency array

  // Callback function to receive selected muscle from ExerciseSideBar component
  const handleMuscleSelect = (muscle: string) => {
    setSelectedMuscle(muscle);
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = data?.slice(indexOfFirstExercise, indexOfLastExercise) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const truncateDescription = (description: string) => {
    if (description.length > 37) {
      return description.substring(0, 30) + "...";
    }
    return description;
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setModalExercise(exercise);
    setShowModal(true);
  };

  return (
    <div>
      <NavBarComponent />
      <div className="side-content-wrapper">
        <div className="side-bar-ex-wrapper" style={{ width: "15%" }}>
          <ExerciseSideBar onMuscleSelect={handleMuscleSelect} />
        </div>
        <div className="exercises-container">
          {data === null ? (
            <div className="Loader">
              <Loader />
            </div>
          ) : (
            <>
              {modalExercise && (
                <ExerciseModal
                  show={showModal}
                  exercise={modalExercise}
                  onClose={() => setShowModal(false)}
                />
              )}
              <div className="button-container"></div>
              <div className="exercise-display">
                {currentExercises.map((exercise, index) => (
                  <Card
                    key={index}
                    style={{ width: "18rem" }}
                    onClick={() => handleExerciseClick(exercise)}
                  >
                    <Card.Img
                      className="gif"
                      variant="top"
                      src={`http://localhost:4000/uploads/${exercise.gif}`}
                    />
                    <Card.Body>
                      <Card.Title className="admin-card-title">{exercise.name}</Card.Title>
                      <Card.Text>{truncateDescription(exercise.description)}</Card.Text>
                      <Card.Text>{exercise.category.name}</Card.Text>
                      <div className="icons-container"></div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
              <nav>
                <ul className="pagination">
                  {[...Array(Math.ceil(data.length / exercisesPerPage)).keys()].map(
                    (number) => (
                      <li key={number} className="page-item">
                        <a
                          onClick={() => paginate(number + 1)}
                          href="#"
                          className="page-link pagination-number"
                        >
                          {number + 1}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
