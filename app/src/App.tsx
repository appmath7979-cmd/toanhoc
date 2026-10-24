import { BrowserRouter, Route, Routes } from "react-router-dom";
import DatePicker from "./components/DatePicker";
import AddCustomer from "./pages/customer/AddCustomer";
import Customer from "./pages/customer/Customer";
import CustomerDetail from "./pages/customer/CustomerDetail";
import EditCustomer from "./pages/customer/EditCustomer";
import Message from "./pages/customer/message/Message";
import MessageDetail from "./pages/customer/message/MessageDetail";
import SettingCustomerLimit from "./pages/customer/SettingCustomerLimit";

export function App() {
  return (
    <>
      <DatePicker />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/customers/edit" element={<EditCustomer />} />
          <Route path={`/customers/:id`} element={<CustomerDetail />} />
          <Route path={`/customers/:id/message`} element={<Message />} />
          <Route
            path={`/customers/limit/:id`}
            element={<SettingCustomerLimit />}
          />
          <Route
            path={`/customers/:customer_id/message/:message_id`}
            element={<MessageDetail />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
