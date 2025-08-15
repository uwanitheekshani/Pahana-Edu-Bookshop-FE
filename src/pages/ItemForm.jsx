// src/pages/ItemForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ItemForm() {
  const [item, setItem] = useState({
    itemCode: "",
    name: "",
    description: "",
    unitPrice: "",
    stock: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/PahanaBillingSystem_war/items/${id}`)
        .then((res) => setItem(res.data))
        .catch((err) => console.error("Error fetching item:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/PahanaBillingSystem_war/items/${id}`, item);
      } else {
        await axios.post("http://localhost:8080/PahanaBillingSystem_war/items", item);
      }
      navigate("/items");
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Item" : "Add Item"}</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Item Code</label>
          <input
            type="text"
            className="form-control"
            name="itemCode"
            value={item.itemCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={item.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Unit Price</label>
          <input
            type="number"
            className="form-control"
            name="unitPrice"
            value={item.unitPrice}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={item.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
