import { BrowserRouter, Route, Routes } from "react-router-dom";
import DatePicker from "./components/DatePicker";
import Container from "./components/ui/layouts/Container";
import AddCustomer from "./pages/customer/AddCustomer";
import Customer from "./pages/customer/Customer";
import CustomerDetail from "./pages/customer/CustomerDetail";
import EditCustomer from "./pages/customer/EditCustomer";
import Message from "./pages/customer/message/Message";
import MessageDetail from "./pages/customer/message/MessageDetail";
import SettingCustomerLimit from "./pages/limit/SettingCustomerLimit";
import CreateLottery from "./pages/lottery/CreateLottery";
import Lottery from "./pages/lottery/Lotterry";

export function App() {
  return (
    <Container>
      <BrowserRouter>
        <DatePicker />
        <Routes>
          <Route path="/" element={<Lottery />} />
          <Route path="/lottery/create" element={<CreateLottery />} />
          <Route path="/customer" element={<Customer />} />
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
    </Container>
  );
}
