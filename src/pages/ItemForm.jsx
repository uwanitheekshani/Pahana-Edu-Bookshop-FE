// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function ItemForm() {
//   const [item, setItem] = useState({
//     itemName: "",
//     description: "",
//     unitPrice: "",
//     quantity: ""
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       axios
//         .get("http://localhost:8080/PahanaBillingSystem_war/item/byId", {
//           params: { itemId: id },
//         })
//         .then((res) => setItem(res.data))
//         .catch((err) => setError("Failed to fetch item details."));
        
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     setItem({ ...item, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     if (!item.itemName.trim()) return "Item name is required.";
//     if (!item.unitPrice || isNaN(item.unitPrice)) return "Valid unit price is required.";
//     if (!item.quantity || isNaN(item.quantity)) return "Valid quantity is required.";
//     return null;
//   };

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       setSuccess("");
//       return;
//     }

//     try {
//       if (id) {
//         await axios.put("http://localhost:8080/PahanaBillingSystem_war/item", null, {
//           params: {
//             itemId: id,
//             itemName: item.itemName,
//             description: item.description,
//             unitPrice: item.unitPrice,
//             quantity: item.quantity
//           }
//         });
//          setSuccess("Item updated successfully!");
//       } else {
//         await axios.post("http://localhost:8080/PahanaBillingSystem_war/item", null, {
//           params: {
//             itemName: item.itemName,
//             description: item.description,
//             unitPrice: item.unitPrice,
//             quantity: item.quantity
//           }
//         });
//          setSuccess("Item added successfully!");
//         setItem({ itemName: "", description: "", unitPrice: "", quantity: "" }); // reset form
//       }
//     //   navigate("/items");
//      setError("");
//       // Optional: auto-redirect after 1.5s
//       setTimeout(() => navigate("/items"), 1500);
//     } catch (err) {
//       console.error("Error saving item:", err);
//       setError("Failed to save item. Please try again.");
//        setSuccess("");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>{id ? "Edit Item" : "Add Item"}</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
//         <div className="mb-3">
//           <label className="form-label">Item Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="itemName"
//             value={item.itemName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             name="description"
//             value={item.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Unit Price</label>
//           <input
//             type="number"
//             className="form-control"
//             name="unitPrice"
//             value={item.unitPrice}
//             onChange={handleChange}
//             step="0.01"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Quantity</label>
//           <input
//             type="number"
//             className="form-control"
//             name="quantity"
//             value={item.quantity}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {id ? "Update Item" : "Add Item"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ItemForm;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ItemForm() {
  const [item, setItem] = useState({
    itemName: "",
    description: "",
    unitPrice: "",
    quantity: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:8080/PahanaBillingSystem_war/item/byId", {
          params: { itemId: id },
        })
        .then((res) => setItem(res.data))
        // .catch((err) => setError("Failed to fetch item details."));
        .catch((err) => {
  console.error("Error fetching item details:", err); // logs the full error
  setError("Failed to fetch item details. See console for details.");
});

    }
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!item.itemName.trim()) return "Item name is required.";
    if (!item.unitPrice || isNaN(item.unitPrice)) return "Valid unit price is required.";
    if (!item.quantity || isNaN(item.quantity)) return "Valid quantity is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    try {
      if (id) {
        await axios.put("http://localhost:8080/PahanaBillingSystem_war/item", null, {
          params: {
            itemId: id,
            itemName: item.itemName,
            description: item.description,
            unitPrice: item.unitPrice,
            quantity: item.quantity
          }
        });
        setSuccess("Item updated successfully!");
      } else {
        await axios.post("http://localhost:8080/PahanaBillingSystem_war/item", null, {
          params: {
            itemName: item.itemName,
            description: item.description,
            unitPrice: item.unitPrice,
            quantity: item.quantity
          }
        });
        setSuccess("Item added successfully!");
        setItem({ itemName: "", description: "", unitPrice: "", quantity: "" }); // reset form
      }
      setError("");
      // Optional: auto-redirect after 1.5s
      setTimeout(() => navigate("/items"), 1500);
    } catch (err) {
      console.error("Error saving item:", err);
      setError("Failed to save item. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Item" : "Add Item"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            name="itemName"
            value={item.itemName}
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
          />
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
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={item.quantity}
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

