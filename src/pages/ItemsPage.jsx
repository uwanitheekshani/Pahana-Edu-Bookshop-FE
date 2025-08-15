// src/pages/ItemsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/PahanaBillingSystem_war/items");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:8080/PahanaBillingSystem_war/items/${id}`);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Items Management</h2>
      <Link to="/items/new" className="btn btn-success mb-3">
        Add Item
      </Link>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Item Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemCode}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.unitPrice}</td>
              <td>{item.stock}</td>
              <td>
                <Link to={`/items/edit/${item.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemsPage;
