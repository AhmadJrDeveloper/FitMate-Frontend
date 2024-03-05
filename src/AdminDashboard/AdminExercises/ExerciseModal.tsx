import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Exercise } from "./AdminExercises";

interface ExerciseDetails {
  sets: number;
  reps: number;
}

interface ExerciseModalProps {
  show: boolean;
  exercise: Exercise;
  onClose: () => void;
  onSave: (details: ExerciseDetails) => void; // Specify the type for the details parameter
}


const ExerciseModal: React.FC<ExerciseModalProps> = ({ show, exercise, onClose,  }) => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{color:"rgb(201,34,34)"}}>{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{exercise.description}</p>
        <p>Category: {exercise.category.name}</p>
        <img src={`${apiUrl}/uploads/${exercise.gif}`} alt={exercise.name} style={{ width: '100%' }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
