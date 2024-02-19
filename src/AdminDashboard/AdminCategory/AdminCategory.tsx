import { useState, useEffect } from "react";
import ModalButton from "../../components/Modal/Modal";
import axios from "axios";
import "./AdminCategory.css";
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import UpdateModal from "../../components/UpdateModal/UpdateModal";

interface Category {
  _id: string;
  name: string;
}

const AdminCategory = () => {
  const [data, setData] = useState<Category[] | null>(null);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
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
      const add = await axios.post(`${apiUrl}/categories`, formData);
      if (add.status === 200) {
        setData((prevData: any) => [...prevData, add.data]);
        toast.success("Category added successfully!");
      } else {
        toast.error("Failed to add category.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the category.");
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
        const deleteCategory = await axios.delete(`${apiUrl}/categories/${id}`);
        if (deleteCategory.status === 200) {
          setData((prevData: any) =>
            prevData.filter((data: any) => data._id !== id)
          );
          toast.success("Category deleted successfully");
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonColor: "#0A233F",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while Deleting the category.");
    }
  };

  const handleUpdate = async (formData: any, id: string) => {
    console.log(formData);
    try {
      const updateCategory = await axios.put(
        `${apiUrl}/categories/${id}`,
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
        toast.success("Category updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the category.");
    }
  };

  // const handleUpdateModalOpen = (category: Category) => {
  //   setSelectedCategory(category);
  // };

  return (
    <div className="Category-Container">
      <div className="Category-Button">
        <ModalButton
          ButtonTitle="Add Category"
          ModalTitle="Add Category"
          fields={[{ label: "Category Name", stateName: "name", type: "text" }]}
          onSubmit={handleAdd}
        />
      </div>
      <div className="Category-Table">
        {data && (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((category: Category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td className="action-icons-container">
                  <UpdateModal
                      ModalTitle="Update Category"
                      ButtonTitle="Update"
                      fields={[{ label: "Category Name", stateName: "name", type: "text" }]}
                      initialFormValues={{ name: category.name }}
                      onSubmit={(formData: any) => handleUpdate(formData, category._id)}
                    />

                    <FaTrash
                      className="action-icon"
                      onClick={() => handleDelete(category._id)}
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

export default AdminCategory;
