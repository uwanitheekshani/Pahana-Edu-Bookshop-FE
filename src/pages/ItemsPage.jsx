import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/PahanaBillingSystem_war/item");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to fetch items.");
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete("http://localhost:8080/PahanaBillingSystem_war/item", {
          params: { itemId: id },
        });
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        setError("Failed to delete item.");
      }
    }
  };

  return (
    <div className="container mt-5">
         <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Items Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/items/new" className="btn btn-success mb-3">
        Add Item
      </Link>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.Id}>
              <td>{item.Id}</td>
              <td>{item.itemName}</td>
              <td>{item.description}</td>
              <td>{item.unitPrice}</td>
              <td>{item.quantity}</td>
              <td>
                <Link
                  to={`/items/edit/${item.Id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItem(item.Id)}
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
