import React from "react";
import { Accordion } from "react-bootstrap";

function HelpPage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📚 System Help & Guidelines</h2>
      <p className="text-muted text-center">
        Follow these instructions to use the Pahana Edu Billing System efficiently.
      </p>

      <Accordion defaultActiveKey="0" flush>
        {/* Login Help */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>🔐 How to Login</Accordion.Header>
          <Accordion.Body>
            - Enter your registered email and password.<br />
            - If you don’t have an account, click <strong>Register</strong> to create one.<br />
            - Make sure your credentials are correct to avoid login errors.
          </Accordion.Body>
        </Accordion.Item>

        {/* Register Help */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>📝 How to Register</Accordion.Header>
          <Accordion.Body>
            - Click on the <strong>Register</strong> button from the login page.<br />
            - Fill in your name, email, and password.<br />
            - After registration, you can log in using your new credentials.
          </Accordion.Body>
        </Accordion.Item>

        {/* Customer Management */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>👤 Manage Customers</Accordion.Header>
          <Accordion.Body>
            - Navigate to <strong>Customers</strong> from the dashboard.<br />
            - Add new customer details including name, address, and contact info.<br />
            - Edit or delete existing customers when necessary.
          </Accordion.Body>
        </Accordion.Item>

        {/* Items Management */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>📦 Manage Items</Accordion.Header>
          <Accordion.Body>
            - Go to the <strong>Items</strong> section in the dashboard.<br />
            - Add new items with their name, description, and unit price.<br />
            - Update or delete items as needed.
          </Accordion.Body>
        </Accordion.Item>

        {/* Billing */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>💳 Create a Bill</Accordion.Header>
          <Accordion.Body>
            - Open the <strong>Billing</strong> section from the dashboard.<br />
            - Select the customer and item.<br />
            - Enter units consumed and the total will be calculated automatically.<br />
            - Click <strong>Generate Bill</strong> to save it in the system.
          </Accordion.Body>
        </Accordion.Item>

        {/* Logout */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>🚪 Logout</Accordion.Header>
          <Accordion.Body>
            - Click the <strong>Logout</strong> button on the top-right corner.<br />
            - This will securely end your session and redirect you to the login page.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default HelpPage;
