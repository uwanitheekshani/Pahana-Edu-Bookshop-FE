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
    unitsConsumed: ""
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8080/PahanaBillingSystem_war/customers/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => console.error(err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios
        .put(`http://localhost:8080/PahanaBillingSystem_war/customers/${id}`, formData)
        .then(() => navigate("/customers"))
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:8080/PahanaBillingSystem_war/customers", formData)
        .then(() => navigate("/customers"))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Edit Customer" : "Add New Customer"}</h2>
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

        <div className="mb-3">
          <label className="form-label">Units Consumed</label>
          <input
            type="number"
            name="unitsConsumed"
            value={formData.unitsConsumed}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          {isEdit ? "Update" : "Save"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/customers")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;
