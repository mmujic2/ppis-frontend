import "./App.css";
import Login from "./components/shared/login";
import Home from "./components/shared/home";
import PrivateRoute from "./components/shared/privateroute";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import CreateTicket from "./components/user/ticket-create/CreateTicket";
import TicketOverview from "./components/shared/ticket-overview/TicketOverview";
import NotFound from "./components/shared/NotFound";
import TicketList from "./components/user/ticket-list/TicketList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/create-ticket"
            element={<CreateTicket></CreateTicket>}
          ></Route>
          <Route
            path="/ticket"
            element={<TicketOverview></TicketOverview>}
          ></Route>
          <Route
            path="/ticket-list"
            element={<TicketList></TicketList>}
          ></Route>
        </Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
