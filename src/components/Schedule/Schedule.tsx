import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Card from "react-bootstrap/Card";
import { FaCheck } from "react-icons/fa";
import ExerciseModal from "../../AdminDashboard/AdminExercises/ExerciseModal";
import "../../AdminDashboard/AdminExercises/AdminExercises.css";
import { useInfo } from "../../utils/AuthContext";

export interface Exercise {
  _id: string;
  name: string;
  gif: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  date: Date; // Add a date field
}

interface Category {
  _id: string;
  name: string;
}

const Schedule = () => {
  const context = useInfo();

  if (!context) {
    throw new Error('Login component must be used within an AuthProvider');
  }

  const { id } = context;
  const [data, setData] = useState<Exercise[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null);
  const [scheduleCreationMode, setScheduleCreationMode] = useState(false);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);
  const [showScheduleNameModal, setShowScheduleNameModal] = useState(false);
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null); // State for selected date
  const [exerciseDetails, setExerciseDetails] = useState<{ [key: string]: { sets: number, reps: number } }>({});
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const handleCategoryFilterChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(`${apiUrl}/categories`);
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const handleExerciseClick = (exercise: Exercise) => {
    if (scheduleCreationMode) {
      if (selectedExerciseIds.includes(exercise._id)) {
        setSelectedExerciseIds(selectedExerciseIds.filter(id => id !== exercise._id));
      } else {
        setSelectedExerciseIds([...selectedExerciseIds, exercise._id]);
      }
    } else {
      setModalExercise(exercise);
      setShowModal(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Exercise[]>(`${apiUrl}/exercises`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [apiUrl]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  let filteredData = data || [];

  if (selectedCategory) {
    filteredData = data?.filter(
      (exercise) => exercise.category._id === selectedCategory
    ) || [];
  }

  const currentExercises = filteredData.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const truncateDescription = (description: string) => {
    if (description.length > 37) {
      return description.substring(0, 30) + "...";
    }
    return description;
  };

  const toggleScheduleCreationMode = () => {
    setScheduleCreationMode(!scheduleCreationMode);
    if (!scheduleCreationMode) {
      setSelectedExerciseIds([]);
    }
  };

  const saveSchedule = () => {
    setShowScheduleNameModal(true);
  };

  const handleScheduleNameSubmit = async () => {
    const selectedExercises = data?.filter(exercise => selectedExerciseIds.includes(exercise._id)) || [];
    
    // Map selected exercises and include only exercise_id, sets, and reps
    const exercisesToStore = selectedExercises.map(exercise => ({
      exercise_id: exercise._id, // Updated to exercise_id
      sets: exerciseDetails[exercise._id]?.sets || 0, // Include sets for the exercise
      reps: exerciseDetails[exercise._id]?.reps || 0, // Include reps for the exercise
    }));
    
    const scheduleData = {
      name: scheduleName,
      user: id,
      exercise: exercisesToStore,
      date: scheduleDate, // Include the selected date
    };
    
    try {
      await axios.post(`${apiUrl}/schedules`, scheduleData);
      // Handle success or navigate to another page
    } catch (error) {
      // Handle error
      console.error('Error creating schedule:', error);
    }
    
    setSelectedExerciseIds([]);
    setScheduleCreationMode(false);
    setShowScheduleNameModal(false);
  };
  
  
  

  const isSelected = (exercise: Exercise) => selectedExerciseIds.includes(exercise._id);

  const handleSaveExerciseDetails = (exerciseId: string, details: { sets: number, reps: number }) => {
    setExerciseDetails({ ...exerciseDetails, [exerciseId]: details });
    setShowModal(false);
  };

  return (
    <div className="exercises-container">
      {data === null || categories === null ? (
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
              onSave={(details) => handleSaveExerciseDetails(modalExercise._id, details)}
            />
          )}
          <div className="button-container">
            <div className="Exercise-Button">
              <button onClick={toggleScheduleCreationMode}>
                {scheduleCreationMode ? "Finish Creating Schedule" : "Create Schedule"}
              </button>
              {scheduleCreationMode && (
                <button onClick={saveSchedule}>Save Schedule</button>
              )}
            </div>
            <select
              className="select-exercise"
              value={selectedCategory || ""}
              onChange={(e) => handleCategoryFilterChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="exercise-display">
            {currentExercises.map((exercise: Exercise, index: number) => (
              <Card
                key={index}
                style={{ width: "18rem", border: isSelected(exercise) ? "2px solid #007bff" : "none" }}
                onClick={() => handleExerciseClick(exercise)}
              >
                <Card.Img
                  className="gif"
                  variant="top"
                  src={`http://localhost:4000/uploads/${exercise.gif}`}
                />
                <Card.Body>
                  <Card.Title className="admin-card-title">
                    {exercise.name}
                  </Card.Title>
                  <Card.Text>{truncateDescription(exercise.description)}</Card.Text>
                  <Card.Text>{exercise.category.name}</Card.Text>
                  <div className="icons-container">
                    {isSelected(exercise) && <FaCheck />}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          <nav>
            <ul className="pagination">
              {[...Array(Math.ceil(filteredData.length / exercisesPerPage)).keys()].map(
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
      {/* Schedule Name Modal */}
      <Modal show={showScheduleNameModal} onHide={() => setShowScheduleNameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Schedule Name</label>
              <input type="text" className="form-control" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
            </div>
            {/* Date input field */}
            <div className="form-group">
              <label>Date</label>
              <input type="date" className="form-control" value={scheduleDate?.toISOString().split('T')[0]} onChange={(e) => setScheduleDate(new Date(e.target.value))} />
            </div>
            {/* Here you can add form fields for sets and reps for each selected exercise */}
            {selectedExerciseIds.map((exerciseId) => (
              <div key={exerciseId} className="form-group">
                <label htmlFor={`setsInput_${exerciseId}`}>Sets for {data?.find(ex => ex._id === exerciseId)?.name}</label>
                <input
                  type="number"
                  className="form-control"
                  id={`setsInput_${exerciseId}`}
                  value={exerciseDetails[exerciseId]?.sets || 0}
                  onChange={(e) => setExerciseDetails({ ...exerciseDetails, [exerciseId]: { ...exerciseDetails[exerciseId], sets: parseInt(e.target.value) } })}
                />
                <label htmlFor={`repsInput_${exerciseId}`}>Reps for {data?.find(ex => ex._id === exerciseId)?.name}</label>
                <input
                  type="number"
                  className="form-control"
                  id={`repsInput_${exerciseId}`}
                  value={exerciseDetails[exerciseId]?.reps || 0}
                  onChange={(e) => setExerciseDetails({ ...exerciseDetails, [exerciseId]: { ...exerciseDetails[exerciseId], reps: parseInt(e.target.value) } })}
                />
              </div>
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowScheduleNameModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleScheduleNameSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Schedule;
