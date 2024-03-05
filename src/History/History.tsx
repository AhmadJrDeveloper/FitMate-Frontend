import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useInfo } from '../utils/AuthContext';
import Modal from 'react-bootstrap/Modal'; 
import Swal from 'sweetalert2'; 
import { toast } from 'react-toastify'; 
import './History.css'
interface HistoryItem {
    _id: string;
    name: string;
    date: string;
    exercise: Array<{
        name: string;
        sets: number;
        reps: number;
        _id: string; 
        exercise_id: {
            name: string; 
        };
    }>;
}


const History = () => {
 const [history, setHistory] = useState<HistoryItem[]>([]);
 const [showModal, setShowModal] = useState(false); 
 const [deletedItems, setDeletedItems] = useState<string[]>([]);
 const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
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
              // Mark the item as deleted
              setDeletedItems([...deletedItems, itemId]);
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
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
};


return (
  <div className="history-container">
    {history.map((item, index) => {
      // Check if the item is marked as deleted
      if (deletedItems.includes(item._id)) {
          return null; // Skip rendering if deleted
      }
      return (
          <div key={index} className="card custom-history" onClick={() => handleShowModal(item)}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <button className="btn btn-danger" onClick={(e) => {
                e.stopPropagation(); 
                deleteItem(item._id);
              }}>Delete</button>
            </div>
          </div>
      );
    })}
    
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedItem?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedItem && (
          <>
<p><strong>Date:</strong> {formatDate(selectedItem.date)}</p>
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
