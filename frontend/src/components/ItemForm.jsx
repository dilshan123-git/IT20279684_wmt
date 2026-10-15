
import { useEffect, useState } from "react";

const defaultValues = {
  name: "",
  category: "",
  price: "",
  discountPercentage: 0,
  description: "",
  imageUrl: "",
};

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [formData, setFormData] = useState({
    ...defaultValues,
    ...(initialValues || {}),
    discountPercentage: initialValues?.discountPercentage ?? 0,
  });

  useEffect(() => {
    setFormData({
      ...defaultValues,
      ...(initialValues || {}),
      discountPercentage: initialValues?.discountPercentage ?? 0,
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const discount = Number(formData.discountPercentage);
    const price = Number(formData.price);

    if (
      formData.discountPercentage === "" ||
      !Number.isFinite(discount) ||
      discount < 0 ||
      discount > 100
    ) {
      alert("Discount percentage must be between 0 and 100.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      await onSubmit({
        ...formData,
        price,
        discountPercentage: discount,
      });
    } catch (error) {
      console.error("Failed to submit item:", error);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label htmlFor="name">Item Name</label>
      <input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        name="price"
        min="0"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="discountPercentage">
        Discount Percentage (%)
      </label>
      <input
        id="discountPercentage"
        type="number"
        name="discountPercentage"
        min="0"
        max="100"
        step="0.01"
        value={formData.discountPercentage}
        onChange={handleChange}
        required
      />

      <small>Enter a value between 0% and 100%.</small>

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="imageUrl">Image URL</label>
      <input
        id="imageUrl"
        type="url"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <button className="btn primary" type="submit">
        {submitText}
      </button>
    </form>
  );
}

export default ItemForm;
