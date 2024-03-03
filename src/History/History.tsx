import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useInfo } from '../utils/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Modal from 'react-bootstrap/Modal'; // Import Modal from react-bootstrap
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is imported
import { toast } from 'react-toastify'; // Ensure react-toastify is imported for toast notifications
import './History.css'
interface HistoryItem {
    _id: string;
    name: string;
    date: string;
    exercise: Array<{
        name: string;
        sets: number;
        reps: number;
        _id: string; // Assuming _id is present within each exercise
        exercise_id: {
            name: string; // Adding exercise_id property if it exists
        };
    }>;
}


const History = () => {
 const [history, setHistory] = useState<HistoryItem[]>([]);
 const [showModal, setShowModal] = useState(false); // State for modal visibility
 const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null); // State for selected item
 const apiUrl = import.meta.env.VITE_APP_API_URL;
 const context = useInfo();

 if (!context) {
    throw new Error('Login component must be used within an AuthProvider');
 }

 const { id } = context;

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/schedules/${id}`);
        setHistory(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
 }, [id, apiUrl]);

 const handleCloseModal = () => setShowModal(false);
 const handleShowModal = (item: HistoryItem) => {
    setSelectedItem(item);
    setShowModal(true);
 };

 // Inside deleteItem function
 const deleteItem = async (itemId: string) => {
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
            const deleteResponse = await axios.delete(`${apiUrl}/schedules/${itemId}`);
            if (deleteResponse.status === 200) {
                // Filter out the item based on the nested _id
                setHistory(history.filter(item => item.exercise.some(ex => ex._id === itemId)));
                toast.success("Schedule deleted successfully");
                Swal.fire({
                    title: "Deleted!",
                    text: "Your schedule has been deleted.",
                    icon: "success",
                    confirmButtonColor: "Black",
                });
            }
        }
    } catch (error) {
        console.error("Failed to delete schedule:", error);
        toast.error("Failed to delete schedule.");
    }
};


 return (
    <div className="history-container">
      {Array.isArray(history) && history.map((item, index) => (
        <div key={index} className="card custom-history" onClick={() => handleShowModal(item)}>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <button className="btn btn-danger"  onClick={(e) => {
              e.stopPropagation(); 
              deleteItem(item._id);
            }}>Delete</button>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <p><strong>Date:</strong> {selectedItem.date}</p>
              <p><strong>Exercise:</strong></p>
              <ul>
                {selectedItem.exercise.map((ex, index) => (
                 <li key={index}>
                    {ex.exercise_id.name} - Sets: {ex.sets}, Reps: {ex.reps}
                 </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
 );
};

export default History;
