
import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { createItem } from "../api/itemApi.js";

function AddItemPage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createItem(formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create item", error);
      alert(
        error.response?.data?.message || "Failed to create item"
      );
      throw error;
    }
  };

  return (
    <ItemForm
      submitText="Add Item"
      onSubmit={handleCreate}
    />
  );
}

export default AddItemPage;
