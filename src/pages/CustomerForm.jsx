import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    accountNumber: "",
    name: "",
    address: "",
    telephone: "",
    // unitsConsumed: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch existing customer details for editing
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8080/PahanaBillingSystem_war/customer/byId`, { params: { customerId: id } })
        .then((res) => setFormData(res.data))
        .catch((err) => {
          console.error("Failed to fetch customer details:", err);
          setError("Failed to fetch customer details.");
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.accountNumber || !formData.name || !formData.address || !formData.telephone) {
    setError("All fields are required.");
    return;
  }

  try {
    if (isEdit) {
      await axios.put("http://localhost:8080/PahanaBillingSystem_war/customer", null, {
        params: {
          customerId: id,
          accountNumber: formData.accountNumber,
          name: formData.name,
          address: formData.address,
          telephone: formData.telephone,
        },
      });
      setSuccess("Customer updated successfully!");
    } else {
      // For add (POST)
      await axios.post("http://localhost:8080/PahanaBillingSystem_war/customer", null, {
        params: {
          accountNumber: formData.accountNumber,
          name: formData.name,
          address: formData.address,
          telephone: formData.telephone,
        },
      });
      setSuccess("Customer added successfully!");
    }

    setError("");
    setTimeout(() => navigate("/customers"), 1500);
  } catch (err) {
    console.error("Error saving customer:", err);
    setError("Failed to save customer.");
    setSuccess("");
  }
};


  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Edit Customer" : "Add New Customer"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telephone</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* <div className="mb-3">
          <label className="form-label">Units Consumed</label>
          <input
            type="number"
            name="unitsConsumed"
            value={formData.unitsConsumed}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div> */}

        <button type="submit" className="btn btn-success">
          {isEdit ? "Update Customer" : "Add Customer"}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/customers")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;

