import React from "react";
import authService from "../../util/auth.service";
import AgentTicketList from "../agent/ticket-list/TicketList";
import UserTicketList from "../user/ticket-list/TicketList";

const TicketList= () =>{
    
    const user = authService.getCurrentUser();
   
    return (
        <div>
          {user.role == "sd_agent" ? <AgentTicketList></AgentTicketList> : <UserTicketList></UserTicketList>}
        </div>
    )
}

export default TicketList;