import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import {i18n} from 'dateformat';
import dateFormat from 'dateformat';
import Options from './Options';
import RelatedTickets from './RelatedTickets';
import RelatedTicketsBind from '../../agent/home/RelatedTicketModals';
import api from "../../../util/api"
import userEvent from '@testing-library/user-event';
import authService from '../../../util/auth.service';

function TopInfo({ticket,setTicket,setTicketComments,ticketComments}) {

  const [open,setOpen] = useState(false)
  const [openBind,setOpenBind] = useState(false)
  const [relatedTickets,setRelatedTickets] = useState([])

    const priority = () => {
        switch(ticket.priorityLevel) {
          case "LOW":
          return(
            <div style={{width:"fit-content",float:"left"}}>
            <ReportIcon style={{color: "#2e7d32",verticalAlign:"middle",verticalAlign:"middle" }}></ReportIcon>
            <span style={{color: "#2e7d32",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}>Nizak prioritet  <span style={{color:'white'}}>  |  </span>{ticket.tag=="INCIDENT" ?<span style={{color:"#c62828"}}>Incident</span>:<span style={{color:"#ffeb3b"}}>Zahtjev za uslugom</span>}</span>
            
            </div>
          )
          break;
          case "MEDIUM":
            return(
              <div style={{width:"fit-content",float:"left"}}>
              <ReportIcon style={{color: "#ffc400",verticalAlign:"middle" }}></ReportIcon>
              <span style={{color: "#ffc400",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}>Srednji prioritet  <span style={{color:'white'}}>  |  </span>{ticket.tag=="INCIDENT" ?<span style={{color:"#c62828"}}>Incident</span>:<span style={{color:"#ffeb3b"}}>Zahtjev za uslugom</span>
              }</span>
              </div>
            )
            break;
          case "HIGH":
            return(
              <div style={{width:"fit-content",float:"left"}}>
              <ReportIcon style={{color: "#ed6c02",verticalAlign:"middle" }}></ReportIcon>
              <span style={{color: "#ed6c02",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}>Visok prioritet  <span style={{color:'white'}}>  |  </span>{ticket.tag=="INCIDENT" ?<span style={{color:"#c62828"}}>Incident</span>:<span style={{color:"#ffeb3b"}}>Zahtjev za uslugom</span>}</span>
              </div>
            )
            break;
          case "URGENT":
            return(
              <div style={{width:"fit-content",float:"left"}}>
              <ReportIcon style={{color: "#c62828",verticalAlign:"middle" }}></ReportIcon>
              <span style={{color: "#c62828",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}>Urgentno  <span style={{color:'white'}}>  |  </span>{ticket.tag=="INCIDENT" ?<span style={{color:"#c62828"}}>Incident</span>:<span style={{color:"#ffeb3b"}}>Zahtjev za uslugom</span>}</span>
              
              </div>
            )
            break;
        }
      }

      const status = () => {
        switch(ticket.status) {
          case "ACTIVE":
          return(
            <div style={{width:"fit-content",float:"right"}}>
            <span style={{color: "#ffeb3b",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}><span style={{color:'white'}}>Status:</span> Otvoren</span>
            </div>
          )
          break;
          case "ASSIGNED":
            return(
              <div style={{width:"fit-content",float:"right"}}>
              <span style={{color: "#ed6c02",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}><span style={{color:'white'}}>Status:</span> U obradi</span>
              </div>
            )
            break;
          case "VERIFIED":
            return(
              <div style={{width:"fit-content",float:"right"}}>
              <span style={{color: "#2e7d32",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}><span style={{color:'white'}}>Status:</span> Verifikovan</span>
              </div>
            )
            break;
          case "CLOSED":
            return(
              <div style={{width:"fit-content",float:"right"}}>
              <span style={{color: "#c62828",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}><span style={{color:'white'}}>Status:</span> Zatvoren</span>
              </div>
            )
            break;
        }
      }
    
      const category = () => {
        switch(ticket.category) {
          case "SOFTWARE":
            return "Softver";
          break;
          case "HARDWARE":
            return "Hardver";
            break;
          case "NETWORK":
            return "Mreža";
            break;
          default:
            return "Ostalo";
          break;
        }
      }

      const user = authService.getCurrentUser();
    
      const showRelatedTickets = () => {
        if(user.role=="sd_user")
        return;
        if(ticket.relatedTicketIds.length>0)
          api.post("/ticket/idarray",{ids:ticket.relatedTicketIds}).then((res)=> {
            setRelatedTickets(res.data);
            setOpen(true)
          })

      }

  return (
    <Container sx={{ mt: 2 }} style={{ backgroundColor: "#00101F", padding: 30, width: "100%",margin:0,height:180 }}>
          <div style={{width:"100%"}}>
          {priority()}
          <span style={{fontFamily:"Yantramanav",color:"white",fontWeight:"bold",float:"right"}}>{dateFormat(ticket.date, " dddd, dd. mmmm  yyyy. HH:MM ")}</span>
          </div>
          <div style={{width:"100%",clear:"both",marginTop:"30px"}}>
            <span style={{fontFamily:"Yantramanav",color:"#ff5252",fontWeight:"bold",float:"left",fontSize:"80%"}}>Šifra: #{ticket.code}</span>

          </div>
          <div style={{width:"100%",clear:"both",marginTop:"30px"}}>
            <span style={{fontFamily:"Yantramanav",color:"white",fontWeight:"bold",float:"left",fontSize:"180%"}}>{ticket.title}</span>
            <span style={{fontFamily:"Yantramanav",color:"white",fontWeight:"bold",fontSize:"90%",float:"right",textAlign:"middle"}}><a  href="#" style={{textDecoration:"none",color:"white"}} onClick={showRelatedTickets}>{ticket.relatedTicketIds?ticket.relatedTicketIds.length:"0"} povezanih zahtjeva</a> | Kategorija: {category()}</span>
          </div>
          <div style={{width:"100%",clear:"both",marginTop:"30px"}}>
            <span style={{fontFamily:"Yantramanav",color:"white",fontWeight:"bold",float:"left",fontSize:"100%"}}>Prijavio: {ticket.createdBy.firstname} {ticket.createdBy.lastname}</span>
            {status()}
          </div>
          
          <div style={{width:"100%",clear:"both",paddingTop:"5px",display:"inline-block"}}>
          {ticket.assignedTo ? <span style={{verticalAlign:"middle",fontFamily:"Yantramanav",color:"white",fontWeight:"bold",float:"left",fontSize:"100%"}}>Preuzeo: {ticket.assignedTo.firstname} {ticket.assignedTo.lastname}</span>
          :<></>}
            <Options relatedTickets={relatedTickets} setRelatedTickets={setRelatedTickets} ticket={ticket} setTicket={setTicket} setTicketComments={setTicketComments} ticketComments={ticketComments}></Options>
          </div>
          <RelatedTickets open={open} setOpen={setOpen} tickets={relatedTickets} ></RelatedTickets>
          </Container>
  )
}

export default TopInfo