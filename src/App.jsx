import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CustomersPage from "./pages/CustomersPage";
import CustomerForm from "./pages/CustomerForm";
import ItemsPage from "./pages/ItemsPage";
import ItemForm from "./pages/ItemForm";
import BillingPage from "./pages/BillingPage";
// import HelpPage from "./pages/HelpPage";
import HelpPage from './pages/HelpPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Customers */}
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/new" element={<CustomerForm />} />
      <Route path="/customers/edit/:id" element={<CustomerForm />} />

        {/* Items */}
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/items/new" element={<ItemForm />} />
      <Route path="/items/edit/:id" element={<ItemForm />} />

        {/* Billing */}
      <Route path="/billing" element={<BillingPage />} />

        {/* Help */}
      <Route path="/help" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
    

  );
}
