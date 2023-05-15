import "./App.css";
import Login from "./components/shared/login";
import Home from "./components/shared/home";
import PrivateRoute from "./components/shared/privateroute";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import CreateTicket from "./components/user/ticket-create/CreateTicket";
import TicketOverview from "./components/shared/ticket-overview/TicketOverview";
import NotFound from "./components/shared/NotFound";
import ManualCreateEdit from "./components/agent/manual-edit/ManualCreateEdit";
import ManualOverview from "./components/shared/manual-overview/ManualOverview";
import TicketList from "./components/shared/ticketlist";
import ReportCreate from "./components/agent/report-create/ReportCreate";
import ReportOverview from "./components/agent/report-overview/ReportOverview";

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
          <Route
            path="/manual/create"
            element={<ManualCreateEdit></ManualCreateEdit>}
          ></Route>
          <Route
            path="/manual/edit"
            element={<ManualCreateEdit></ManualCreateEdit>}
          ></Route>
          <Route
            path="/manual"
            element={<ManualOverview></ManualOverview>}
          ></Route>
           <Route
            path="/report/create"
            element={<ReportCreate></ReportCreate>}
          ></Route>
          <Route
            path="/report"
            element={<ReportOverview></ReportOverview>}
          ></Route>
        </Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
