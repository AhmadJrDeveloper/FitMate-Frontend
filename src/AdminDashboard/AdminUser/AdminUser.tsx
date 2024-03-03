import  { useState, useEffect } from "react";
import { Card,  } from "react-bootstrap";
import ModalButton from "../../components/Modal/Modal";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import "./AdminUser.css";
import UpdateModal from "../../components/UpdateModal/UpdateModal";

interface User {
  _id: string;
  username: string;
  type: string;
  firstName: string;
  lastName: string;
  image: string;
  insta: string;
  facebook: string;
}

const AdminUser = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admins`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };
    fetchData();
  }, []);

  const handleAdd = async (formData: any) => {
    try {
      const add = await axios.post(`${apiUrl}/admins`, formData);
      if (add.status === 200) {
        setData((prevData: any) => [...prevData, add.data]);
        toast.success("Admin added successfully!");
      } else {
        toast.error("Failed to add category.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the admin.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "black",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const deleteCategory = await axios.delete(`${apiUrl}/admins/${id}`);
        if (deleteCategory.status === 200) {
          setData((prevData: any) =>
            prevData.filter((data: any) => data._id !== id)
          );
          toast.success("Admin deleted successfully");
          Swal.fire({
            title: "Deleted!",
            text: "Your Admin has been deleted.",
            icon: "success",
            confirmButtonColor: "black",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while Deleting the admin.");
    }
  };

  const handleUpdate = async (formData: any, id: string) => {
    try {
      const updateAdmin = await axios.put(
        `${apiUrl}/admins/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (updateAdmin.status === 200) {
        setData((prevData: User[] | null) => {
          return prevData?.map((data: User) => {
            if (data._id === id) {
              return { ...data, ...updateAdmin.data };
            }
            return data;
          }) || null;
        });
        toast.success("Admin updated successfully!");
      } else {
        toast.error("Failed to update admin.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the admin.");
    }
  };

  return (
    <div className="User-Container">
      <div className="Category-Button">
        <ModalButton
          ButtonTitle="Add Admin"
          ModalTitle="Add Admin"
          fields={[
            { label: "Admin Username", stateName: "username", type: "text" },
            { label: "Admin First Name", stateName: "firstName", type: "text" },
            { label: "Admin Last Name", stateName: "lastName", type: "text" },
            { label: "Admin Password", stateName: "password", type: "text" },
            {
              label: "Admin Type",
              stateName: "type",
              type: "select",
              options: [
                { value: "admin", label: " Admin" },
                { value: "trainer", label: " Trainer" },
              ],
            },
            { label: "Admin Image", stateName: "image", type: "file" },
            { label: "Admin Instagram", stateName: "insta", type: "text" },
            { label: "Admin FaceBook", stateName: "facebook", type: "text" },
          ]}
          onSubmit={handleAdd}
        />
      </div>
      <div className="Admins-Cards">
        {loading ? ( // Render loader when loading state is true
          <Loader />
        ) : data ? ( // Render cards when data is available
          data.map((user: User) => (
            <Card key={user._id} className="mb-3" style={{ width: "17.5rem" }}>
              <img
                src={`http://localhost:4000/uploads/${user.image}`}
                className="card-img-top"
                alt="Admin"
              />
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>
                  <strong>First Name:</strong> {user.firstName}
                  <br />
                  <strong>Last Name:</strong> {user.lastName}
                  <br />
                  <strong>Type:</strong> {user.type}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <UpdateModal
                    ModalTitle="Update Admin"
                    ButtonTitle="Update"
                    fields={[
                      {
                        label: "Admin Username",
                        stateName: "username",
                        type: "text",
                      },
                      {
                        label: "Admin First Name",
                        stateName: "firstName",
                        type: "text",
                      },
                      {
                        label: "Admin Last Name",
                        stateName: "lastName",
                        type: "text",
                      },
                      {
                        label: "Admin Type",
                        stateName: "type",
                        type: "select",
                        options: [
                          { value: "admin", label: " Admin" },
                          { value: "trainer", label: " Trainer" },
                        ],
                      },
                      { label: "Admin Image", stateName: "image", type: "file" },
                      {
                        label: "Admin Instagram",
                        stateName: "insta",
                        type: "text",
                      },
                      {
                        label: "Admin FaceBook",
                        stateName: "facebook",
                        type: "text",
                      },
                    ]}
                    initialFormValues={{
                      username: user.username,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      type: user.type,
                      insta: user.insta,
                      facebook: user.facebook,
                      image: user.image,
                    }}
                    onSubmit={(formData: any) => handleUpdate(formData, user._id)}
                  />
                                    <FaTrash className="trash-icon-size" onClick={() => handleDelete(user._id)} /> {/* Use FaTrash icon */}

                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
