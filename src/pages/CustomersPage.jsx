import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  // Load customers when page loads
  useEffect(() => {
    axios
      .get("http://localhost:8080/PahanaBillingSystem_war/customers")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
      });
  }, []);

  // Delete customer
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:8080/PahanaBillingSystem_war/customers/${id}`)
        .then(() => {
          setCustomers(customers.filter((c) => c.id !== id));
        })
        .catch((err) => {
          console.error("Delete error:", err);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customer Accounts</h2>

      <Link to="/customers/new" className="btn btn-primary mb-3">
        <i className="bi bi-plus-circle"></i> Add New Customer
      </Link>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Account No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Units Consumed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.accountNumber}</td>
                <td>{c.name}</td>
                <td>{c.address}</td>
                <td>{c.telephone}</td>
                <td>{c.unitsConsumed}</td>
                <td>
                  <Link
                    to={`/customers/edit/${c.id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersPage;
