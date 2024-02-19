import { useState, useEffect } from "react";
import ModalButton from "../../components/Modal/Modal";
import axios from "axios";
import "./AdminUser.css";
import {FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import UpdateModal from "../../components/UpdateModal/UpdateModal";

interface User {
  _id: string;
  username: string;
  type: string;
  firstName: string;
  lastName: string;
}

const AdminUser = () => {
  const [data, setData] = useState<User[] | null>(null);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admins`);
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async (formData: any) => {
    console.log('the form data is', formData);
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
        confirmButtonColor: "#0A233F",
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
            confirmButtonColor: "#0A233F",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while Deleting the admin.");
    }
  };

  const handleUpdate = async (formData: any, id: string) => {
    console.log(formData);
    try {
      const updateCategory = await axios.put(
        `${apiUrl}/admins/${id}`,
        formData
      );
      if (updateCategory.status === 200) {
        setData((prevData: any) => {
          const updatedData = prevData.map((data: any) => {
            if (data._id === id) {
              return { ...data, ...formData };
            }
            return data;
          });
          return updatedData;
        });
        toast.success("Admin updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the admin.");
    }
  };


  return (
    <div className="Category-Container">
      <div className="Category-Button">
        <ModalButton
          ButtonTitle="Add Admin"
          ModalTitle="Add Admin"
          fields={[{ label: "Admin Username", stateName: "username", type: "text" }
        ,{ label: "Admin First Name", stateName: "firstName", type: "text" },
        { label: "Admin Last Name", stateName: "lastName", type: "text" }
        ,{ label: "Admin Password", stateName: "password", type: "text" },
        {
            label: 'Admin Type',
            stateName: 'type',
            type: 'select',
            options: [
                { value: 'admin', label: 'Trainer ' },
                { value: 'trainer', label: ' Admin' }
            ]
        }
        
    ]}

          onSubmit={handleAdd}
        />
      </div>
      <div className="Category-Table">
        {data && (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Type</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user: User) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td> {user.lastName}</td>
                  <td>{user.type}</td>
                  <td className="action-icons-container">
                  <UpdateModal
                      ModalTitle="Update Category"
                      ButtonTitle="Update"
                      fields={[{ label: "Admin Username", stateName: "username", type: "text" }
                      ,{ label: "Admin First Name", stateName: "firstName", type: "text" },
                      { label: "Admin Last Name", stateName: "lastName", type: "text" },
                      {
                          label: 'Admin Type',
                          stateName: 'type',
                          type: 'select',
                          options: [
                              { value: 'admin', label: ' Admin' },
                              { value: 'trainer', label: '  Trainer' }
                          ]
                      }
                      
                  ]}
                    initialFormValues={{ username: user.username ,firstName:user.firstName
                    ,lastName:user.lastName, type:user.type}}
                      onSubmit={(formData: any) => handleUpdate(formData, user._id)}
                    />

                    <FaTrash
                      className="action-icon"
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
