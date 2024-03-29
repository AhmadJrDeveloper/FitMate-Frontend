import  { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import ModalButton from "../../components/Modal/Modal";
import Card from "react-bootstrap/Card";
import { FaTrash } from "react-icons/fa";
import UpdateModal from "../../components/UpdateModal/UpdateModal";
import ExerciseModal from "./ExerciseModal"; // Import the modal component
import "./AdminExercises.css";

export interface Exercise {
  _id: string;
  name: string;
  gif: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
}

interface Category {
  _id: string;
  name: string;
}
interface ExerciseDetails {
  sets: number;
  reps: number;
}


const AdminExercises = () => {
  // const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
  //   null
  // ); // State to track the selected exercise
  const [data, setData] = useState<Exercise[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false); 
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null); 
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const handleCategoryFilterChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset current page when changing category filter
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
    setModalExercise(exercise); // Set the selected exercise for the modal
    setShowModal(true); // Open the modal
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<Exercise[]>(`${apiUrl}/exercises`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, selectedCategory]);

  const handleAdd = async (formData: FormData) => {
    try {
      const add = await axios.post(`${apiUrl}/exercises`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (add.status === 200) {
        fetchData(); // Fetch data again to reflect the changes
        toast.success("Exercise added successfully!");
      } else {
        toast.error("Failed to add exercise.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the exercise.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "Black",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const deleteExercise = await axios.delete(
          `${apiUrl}/exercises/${id}`
        );
        if (deleteExercise.status === 200) {
          setData((prevData: Exercise[] | null) =>
            prevData?.filter((data: Exercise) => data._id !== id) || null
          );
          toast.success("Exercise deleted successfully");
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonColor: "Black",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the exercise.");
    }
  };

 const handleUpdate = async (formData: any, id: string) => {
  try {
    const updateResponse = await axios.put(
      `${apiUrl}/exercises/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (updateResponse.status === 200) {
      fetchData(); 
      toast.success("Exercise updated successfully!");
    } else {
      toast.error("Failed to update exercise.");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while updating the exercise.");
  }
};


  // Get current exercises
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

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const truncateDescription = (description: string) => {
    if (description.length > 37) {
      return description.substring(0, 30) + "...";
    }
    return description;
 };

  return (
    <div className="exercises-container" >
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
            onSave={(details: ExerciseDetails) => console.log(details)} // Placeholder function
          />
          
          )}
          <div className="button-container">
            <div className="Exercise-Button">
              <ModalButton
                ButtonTitle="Add Exercise"
                ModalTitle="Add Exercise"
                fields={[
                  { label: "Exercise Name", stateName: "name", type: "text",required: true },
                  {
                    label: "Exercise Description",
                    stateName: "description",
                    type: "textarea",
                  },
                  {
                    label: "Exercise Category",
                    stateName: "category",
                    type: "select",
                    options: categories.map((category) => ({
                      value: category._id,
                      label: category.name,
                    })),
                  },
                  { label: "Exercise Gif", stateName: "gif", type: "file" },
                ]}
                onSubmit={handleAdd}
              />
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
                style={{ width: "16rem" }}
              >
                <Card.Img
                  className="gif"
                  variant="top"
                  src={`${apiUrl}/uploads/${exercise.gif}`}
                  onClick={() => handleExerciseClick(exercise)} 

                />
                <Card.Body>
                  <Card.Title className="admin-card-title">
                    {exercise.name}
                  </Card.Title>
                  <Card.Text>{truncateDescription(exercise.description)}</Card.Text> 
                  <Card.Text>{exercise.category.name}</Card.Text>
                  <div className="icons-container">
                    <UpdateModal
                      ModalTitle="Update Exercise"
                      ButtonTitle="Update"
                      fields={[
                        { label: "Exercise Name", stateName: "name", type: "text" },
                        {
                          label: "Exercise Description",
                          stateName: "description",
                          type: "textarea",
                        },
                        {
                          label: "Exercise Category",
                          stateName: "category",
                          type: "select",
                          options: categories.map((category) => ({
                            value: category._id,
                            label: category.name,
                          })),
                        },
                        { label: "Exercise Gif", stateName: "gif", type: "file" },
                      ]}
                      initialFormValues={{
                        name: exercise.name,
                        description: exercise.description,
                        category: exercise.category._id,
                        gif: exercise.gif,
                      }}
                      onSubmit={(formData: any) =>
                        handleUpdate(formData, exercise._id)
                      }
                    />
                    <FaTrash
                      className="trash-icon-size"
                      onClick={() => handleDelete(exercise._id)}
                    />
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
    </div>
  );
};

export default AdminExercises;
