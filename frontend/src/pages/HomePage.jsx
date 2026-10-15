
import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../api/itemApi.js";
import ItemCard from "../components/ItemCard.jsx";

function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setError("");

      const { data } = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items", error);
      setError("Failed to load items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    try {
      await deleteItem(id);
      await fetchItems();
    } catch (error) {
      console.error("Failed to delete item", error);
      alert("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <section>
      <div className="hero">
        <h1>Item Details</h1>
        <p>
          View, manage, edit, and remove items from the inventory.
        </p>
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : items.length === 0 ? (
        <p>No items available. Add a new item from the menu.</p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePage;
