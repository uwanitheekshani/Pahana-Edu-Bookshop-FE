import React, { useEffect, useState } from "react";
import axios from "axios";

function BillingPage() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [bills, setBills] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [units, setUnits] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch customers, items, and bills
  useEffect(() => {
    axios.get("http://localhost:8080/PahanaBillingSystem_war/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error("Error loading customers", err));

    axios.get("http://localhost:8080/PahanaBillingSystem_war/items")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error loading items", err));

    loadBills();
  }, []);

  const loadBills = () => {
    axios.get("http://localhost:8080/PahanaBillingSystem_war/bills")
      .then(res => setBills(res.data))
      .catch(err => console.error("Error loading bills", err));
  };

  // When item changes, update price & total
  useEffect(() => {
    const selected = items.find(i => i.id === parseInt(selectedItem));
    if (selected) {
      setUnitPrice(selected.unitPrice);
      setTotal(selected.unitPrice * units);
    }
  }, [selectedItem, units, items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const billData = {
      customerId: selectedCustomer,
      itemId: selectedItem,
      units,
      total
    };

    axios.post("http://localhost:8080/PahanaBillingSystem_war/bills", billData)
      .then(() => {
        alert("Bill created successfully!");
        setSelectedCustomer("");
        setSelectedItem("");
        setUnits(1);
        setTotal(0);
        loadBills(); // refresh table
      })
      .catch(err => {
        console.error("Error creating bill", err);
        alert("Failed to create bill");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create New Bill</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Customer Dropdown */}
        <div className="mb-3">
          <label className="form-label">Customer</label>
          <select
            className="form-select"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            required
          >
            <option value="">-- Select Customer --</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.accountNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Item Dropdown */}
        <div className="mb-3">
          <label className="form-label">Item</label>
          <select
            className="form-select"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            required
          >
            <option value="">-- Select Item --</option>
            {items.map(i => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        {/* Units */}
        <div className="mb-3">
          <label className="form-label">Units</label>
          <input
            type="number"
            className="form-control"
            value={units}
            min="1"
            onChange={(e) => setUnits(parseInt(e.target.value))}
            required
          />
        </div>

        {/* Unit Price */}
        <div className="mb-3">
          <label className="form-label">Unit Price</label>
          <input
            type="text"
            className="form-control"
            value={unitPrice}
            disabled
          />
        </div>

        {/* Total */}
        <div className="mb-3">
          <label className="form-label">Total</label>
          <input
            type="text"
            className="form-control"
            value={total}
            disabled
          />
        </div>

        <button type="submit" className="btn btn-success">Generate Bill</button>
      </form>

      {/* Bills Table */}
      <h3 className="mt-5">All Bills</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Units</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.customerName}</td>
              <td>{bill.itemName}</td>
              <td>{bill.units}</td>
              <td>{bill.unitPrice}</td>
              <td>{bill.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillingPage;
