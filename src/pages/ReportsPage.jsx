import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from "recharts";

function ReportsPage() {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch Items
    axios.get("http://localhost:8080/PahanaBillingSystem_war/item")
      .then(res => setItems(res.data))
      .catch(() => setError("Failed to load items"));

    // Fetch Customers
    axios.get("http://localhost:8080/PahanaBillingSystem_war/customer")
      .then(res => setCustomers(res.data))
      .catch(() => setError("Failed to load customers"));

    // Fetch Bills
    axios.get("http://localhost:8080/PahanaBillingSystem_war/bill")
      .then(res => setBills(res.data))
      .catch(() => setError("Failed to load bills"));
  }, []);

  // Prepare charts data
  const itemsChartData = items.map(i => ({
    name: i.itemName,
    Stock: i.quantity,
    Price: i.unitPrice
  }));

  const customerChartData = customers.map(c => ({
    name: c.name,
    UnitsConsumed: c.unitConsumed
  }));

  const billChartData = bills.map(b => ({
    name: `Bill-${b.id}`,
    TotalAmount: b.totalAmount,
    TotalQty: b.totalQty
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div className="container mt-4">
      <h2>System Reports</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Items Chart */}
      <h4 className="mt-4">Items Stock & Price</h4>
      <BarChart width={700} height={300} data={itemsChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Stock" fill="#8884d8" />
        <Bar dataKey="Price" fill="#82ca9d" />
      </BarChart>

      {/* Customers Chart */}
      <h4 className="mt-4">Customer Units Consumed</h4>
      <BarChart width={700} height={300} data={customerChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="UnitsConsumed" fill="#FF8042" />
      </BarChart>

      {/* Bills Chart */}
      <h4 className="mt-4">Billing Overview</h4>
      <PieChart width={400} height={400}>
        <Pie
          data={billChartData}
          dataKey="TotalAmount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {billChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* Optionally: Table showing billing details */}
      {/* <h4 className="mt-4">Billing Details Table</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Bill ID</th>
            <th>Customer</th>
            <th>Total Qty</th>
            <th>Total Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{customers.find(c => c.id === b.customerId)?.name || "Unknown"}</td>
              <td>{b.totalQty}</td>
              <td>Rs. {b.totalAmount.toFixed(2)}</td>
              <td>{new Date(b.billDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default ReportsPage;
