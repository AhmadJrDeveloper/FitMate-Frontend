import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ExerciseModal from '../../AdminDashboard/AdminExercises/ExerciseModal';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponents';
import ExerciseSideBar from '../../components/ExerciseSideBar/ExerciseSideBar';
import Loader from "../../components/Loader/Loader"; 
import './Exercises.css'

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
 const [showModal, setShowModal] = useState<boolean>(false);
 const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(false); 

 const apiUrl = import.meta.env.VITE_APP_API_URL;

 useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        let endpoint = `${apiUrl}/exercises`;
        if (selectedMuscle) {
          endpoint += `/exercise/${selectedMuscle}`;
        }
        const response = await axios.get<Exercise[]>(endpoint);
        setData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
 }, [apiUrl, selectedMuscle]);

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
    <div style={{ overflow: "hidden" }}>
      <div className="loader-container" style={{position:"fixed",width:"100%", zIndex:"2"}}>
        <NavBarComponent />
      </div>
      <div className="side-content-wrapper">
        <div className="side-bar-ex-wrapper" style={{ position: "fixed",top:'4.8rem', zIndex: '1'}}>
          <ExerciseSideBar onMuscleSelect={handleMuscleSelect} />
        </div>
        <div className="exercises-container" style={{ marginLeft: "7rem",marginTop:"5rem", zIndex: '0' }}>
          {isLoading ? ( 
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
                    style={{ width: "17rem" }}
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
                 {[...Array(Math.ceil((data?.length || 0) / exercisesPerPage)).keys()].map(
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
