import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Exercise } from "./AdminExercises";


interface ExerciseModalProps {
  show: boolean;
  exercise: Omit<Exercise, '_id'>; // Omitting _id from Exercise
  onClose: () => void;
}


const ExerciseModal: React.FC<ExerciseModalProps> = ({ show, exercise, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{exercise.description}</p>
        <p>Category: {exercise.category.name}</p>
        <img src={`http://localhost:4000/uploads/${exercise.gif}`} alt={exercise.name} style={{ width: '100%' }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
