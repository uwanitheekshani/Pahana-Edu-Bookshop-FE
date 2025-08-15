import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  const menuItems = [
    { title: "Manage Customers", desc: "Add, edit, and view customers", link: "/customers", icon: "bi-people-fill", color: "primary" },
    { title: "Manage Items", desc: "Add, edit, and view items", link: "/items", icon: "bi-box-seam", color: "success" },
    { title: "Billing", desc: "Create and print customer bills", link: "/billing", icon: "bi-receipt", color: "warning" },
    { title: "Reports", desc: "View sales and customer reports", link: "/reports", icon: "bi-graph-up", color: "info" },
    { title: "Help", desc: "How to use the system", link: "/help", icon: "bi-question-circle", color: "secondary" }
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {userName} 👋</h2>
      <div className="row">
        {menuItems.map((item, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className={`card text-white bg-${item.color} h-100`} style={{ cursor: "pointer" }} onClick={() => navigate(item.link)}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <i className={`bi ${item.icon} mb-3`} style={{ fontSize: "2rem" }}></i>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
