// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function BillingPage() {
//   const [customers, setCustomers] = useState([]);
//   const [items, setItems] = useState([]);
//   const [bills, setBills] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState("");
//   const [selectedItem, setSelectedItem] = useState("");
//   const [units, setUnits] = useState(1);
//   const [unitPrice, setUnitPrice] = useState(0);
//   const [total, setTotal] = useState(0);

//   // Fetch customers, items, and bills
//   useEffect(() => {
//     axios.get("http://localhost:8080/PahanaBillingSystem_war/customers")
//       .then(res => setCustomers(res.data))
//       .catch(err => console.error("Error loading customers", err));

//     axios.get("http://localhost:8080/PahanaBillingSystem_war/items")
//       .then(res => setItems(res.data))
//       .catch(err => console.error("Error loading items", err));

//     loadBills();
//   }, []);

//   const loadBills = () => {
//     axios.get("http://localhost:8080/PahanaBillingSystem_war/bills")
//       .then(res => setBills(res.data))
//       .catch(err => console.error("Error loading bills", err));
//   };

//   // When item changes, update price & total
//   useEffect(() => {
//     const selected = items.find(i => i.id === parseInt(selectedItem));
//     if (selected) {
//       setUnitPrice(selected.unitPrice);
//       setTotal(selected.unitPrice * units);
//     }
//   }, [selectedItem, units, items]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const billData = {
//       customerId: selectedCustomer,
//       itemId: selectedItem,
//       units,
//       total
//     };

//     axios.post("http://localhost:8080/PahanaBillingSystem_war/bills", billData)
//       .then(() => {
//         alert("Bill created successfully!");
//         setSelectedCustomer("");
//         setSelectedItem("");
//         setUnits(1);
//         setTotal(0);
//         loadBills(); // refresh table
//       })
//       .catch(err => {
//         console.error("Error creating bill", err);
//         alert("Failed to create bill");
//       });
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Create New Bill</h2>
//       <form onSubmit={handleSubmit} className="mt-4">
//         {/* Customer Dropdown */}
//         <div className="mb-3">
//           <label className="form-label">Customer</label>
//           <select
//             className="form-select"
//             value={selectedCustomer}
//             onChange={(e) => setSelectedCustomer(e.target.value)}
//             required
//           >
//             <option value="">-- Select Customer --</option>
//             {customers.map(c => (
//               <option key={c.id} value={c.id}>
//                 {c.name} ({c.accountNumber})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Item Dropdown */}
//         <div className="mb-3">
//           <label className="form-label">Item</label>
//           <select
//             className="form-select"
//             value={selectedItem}
//             onChange={(e) => setSelectedItem(e.target.value)}
//             required
//           >
//             <option value="">-- Select Item --</option>
//             {items.map(i => (
//               <option key={i.id} value={i.id}>
//                 {i.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Units */}
//         <div className="mb-3">
//           <label className="form-label">Units</label>
//           <input
//             type="number"
//             className="form-control"
//             value={units}
//             min="1"
//             onChange={(e) => setUnits(parseInt(e.target.value))}
//             required
//           />
//         </div>

//         {/* Unit Price */}
//         <div className="mb-3">
//           <label className="form-label">Unit Price</label>
//           <input
//             type="text"
//             className="form-control"
//             value={unitPrice}
//             disabled
//           />
//         </div>

//         {/* Total */}
//         <div className="mb-3">
//           <label className="form-label">Total</label>
//           <input
//             type="text"
//             className="form-control"
//             value={total}
//             disabled
//           />
//         </div>

//         <button type="submit" className="btn btn-success">Generate Bill</button>
//       </form>

//       {/* Bills Table */}
//       <h3 className="mt-5">All Bills</h3>
//       <table className="table table-striped mt-3">
//         <thead>
//           <tr>
//             <th>Bill ID</th>
//             <th>Customer</th>
//             <th>Item</th>
//             <th>Units</th>
//             <th>Unit Price</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bills.map(bill => (
//             <tr key={bill.id}>
//               <td>{bill.id}</td>
//               <td>{bill.customerName}</td>
//               <td>{bill.itemName}</td>
//               <td>{bill.units}</td>
//               <td>{bill.unitPrice}</td>
//               <td>{bill.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default BillingPage;


import React, { useState, useEffect } from "react";
import axios from "axios";

function BillingPage() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [billItems, setBillItems] = useState([{ id: "", quantity: 1 }]);
  const [customerId, setCustomerId] = useState("");
  const [totalQty, setTotalQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch customers & items
  useEffect(() => {
    axios
      .get("http://localhost:8080/PahanaBillingSystem_war/customer")
      .then((res) => setCustomers(res.data))
      .catch(() => setError("Failed to load customers"));

    axios
      .get("http://localhost:8080/PahanaBillingSystem_war/item")
      .then((res) => setItems(res.data))
      .catch(() => setError("Failed to load items"));
  }, []);

  // Update totals whenever billItems changes
  useEffect(() => {
    let qtySum = 0;
    let amountSum = 0;

    billItems.forEach((b) => {
      const item = items.find((i) => i.Id === parseInt(b.id));
      if (item) {
        qtySum += Number(b.quantity) || 0;
        amountSum += (Number(b.quantity) || 0) * (item.unitPrice || 0);
      }
    });

    setTotalQty(qtySum);
    setTotalAmount(amountSum);
  }, [billItems, items]);

  const handleItemChange = (index, field, value) => {
    const newBillItems = [...billItems];
    newBillItems[index][field] = value;
    setBillItems(newBillItems);
  };

  const addItemRow = () => {
    setBillItems([...billItems, { id: "", quantity: 1 }]);
  };

  const removeItemRow = (index) => {
    const newBillItems = billItems.filter((_, i) => i !== index);
    setBillItems(newBillItems);
  };

  const formatDateTime = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    date.getFullYear() +
    "-" + pad(date.getMonth() + 1) +
    "-" + pad(date.getDate()) +
    "T" + pad(date.getHours()) +
    ":" + pad(date.getMinutes()) +
    ":" + pad(date.getSeconds())
  );
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!customerId || billItems.length === 0) {
    setError("Please select a customer and add at least one item.");
    return;
  }

  const now = new Date();

  const billData = {
    customerId: parseInt(customerId),
    items: billItems.map((b) => ({
      id: parseInt(b.id),
      quantity: parseInt(b.quantity),
    })),
    totalQty: totalQty,
    totalAmount: totalAmount,
    billDate: formatDateTime(now), // ✅ formatted correctly
  };

  axios
    .post("http://localhost:8080/PahanaBillingSystem_war/bill", billData, {
      headers: { "Content-Type": "application/json" },
    })
    .then(() => {
      setSuccess("Bill created successfully!");
      setError("");
      setBillItems([{ id: "", quantity: 1 }]);
      setCustomerId("");
      setTotalQty(0);
      setTotalAmount(0);
    })
    .catch(() => {
      setError("Failed to create bill.");
      setSuccess("");
    });
};

  return (
    <div className="container mt-4">
      <h2>Create Bill</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Customer Selection */}
        <div className="mb-3">
          <label className="form-label">Customer</label>
          <select
            className="form-select"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Items Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Line Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((row, index) => {
              const item = items.find((i) => i.Id === parseInt(row.id));
              return (
                <tr key={index}>
                  <td>
                    <select
                      className="form-select"
                      value={row.id}
                      onChange={(e) =>
                        handleItemChange(index, "id", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Item</option>
                      {items.map((i) => (
                        <option key={i.Id} value={i.Id}>
                          {i.itemName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={row.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>{item ? item.unitPrice.toFixed(2) : "-"}</td>
                  <td>
                    {item
                      ? (item.unitPrice * row.quantity).toFixed(2)
                      : "-"}
                  </td>
                  <td>
                    {billItems.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItemRow(index)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addItemRow}
        >
          Add Item
        </button>

        {/* Totals */}
        <div className="mb-3">
          <strong>Total Qty:</strong> {totalQty} <br />
          <strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}
        </div>

        <button type="submit" className="btn btn-success">
          Save Bill
        </button>
      </form>
    </div>
  );
}

export default BillingPage;

