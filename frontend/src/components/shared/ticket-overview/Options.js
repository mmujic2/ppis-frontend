import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../util/api";
import authService from "../../../util/auth.service";
import TicketForwardModal from "../../agent/ticket-forward/TicketForwardModal";
import CloseModal from "./CloseModal";
import RelatedTicketsBind from '../../agent/home/RelatedTicketModals';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Options({ ticket,setTicket,setTicketComments,ticketComments}) {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const [alert, setAlert] = useState(false);
  const [severity,setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [openBind, setOpenBind] = useState(false);
  const [openReportDialog,setOpenReportDialog] = useState(false);

  const handleVerify = () => {
    api.post("/ticket/verify/" + ticket.id).then((res) => {

    if(res.status==200) {
      api.post("/ticket-comment/create",{ticketId:ticket.id,comment:"Potvrđeno rješenje"}).then((res)=> {
        if(res.status==200)
          setTicketComments([...ticketComments,res.data])
        })
      setSeverity("success")
      setAlertMessage("Uspješno ste potvrdili rješenje!");
      setAlert(true);
      setTicket({...ticket,status:"VERIFIED"})
      setTimeout(() => {
        navigate("/ticket-list");
      }, 3000);
    }
    });
  };

  const handleDelete = () => {
    api.delete("ticket/" + ticket.id).then((res) => {
      if(res.status==200) {
      setAlertMessage("Uspješno ste obrisali zahtjev!");
      setSeverity("success")
      setAlert(true);
      setTimeout(() => {
        navigate("/ticket-list");
      }, 3000);
    } else {
      if(res.status==400) {
      setAlertMessage("Nije moguće obrisati već preuzeti zahtjev")
      setAlert(true)
      setSeverity("error")
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    } }
    });
  };

  const handleModalForward = () => {
    setOpen(true);
  };

  const handleModalBackward = () => {
    setOpenBind(true);
  };

  const handleCloseTicket = () => {
    api.post("ticket/close/" + ticket.id).then((res) => {
      if(res.status==200) {
      api.post("/ticket-comment/create",{ticketId:ticket.id,comment:"Zatvoren zahtjev"}).then((res)=> {
        if(res.status==200)
          setTicketComments([res.data,...ticketComments])
          
        })
      setAlertMessage("Uspješno ste zatvorili zahtjev!");
      setSeverity("success")
      setAlert(true);
      setTicket({...ticket,status:"CLOSED"})
      setOpenReportDialog(true)
    } 
    
  })
  };

  const assignTicket = () => {
    try {
    api.post("/ticket/assign/"+ticket.id).then((res)=> {
        if(res.status==200) {
          api.post("/ticket-comment/create",{ticketId:ticket.id,comment:"Preuzet zahtjev"}).then((res)=> {
          if(res.status==200)
            setTicketComments([res.data,...ticketComments])
          })
          setTicket({...ticket,status:"ASSIGNED",assignedTo:res.data.assignedTo})
        } else {
          if(res.status==400) {
            setAlertMessage("Zahtjev je već preuzet od strane drugog agenta")
          } else if(res.status==404) {
            setAlertMessage("Zahtjev više ne postoji")
            
          }
          setAlert(true)
          setSeverity("error")
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
    }) } catch(e) {
        
    }
}

  const userOptions = () => {
    return (
      <>
          {
          //If status of ticket is ACTIVE (Otvoren), show only the option to delete it
          ticket.status == "ACTIVE" ? (
            <Button
              style={{
                backgroundColor: "#ff5252",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
              onClick={handleDelete}
            >
              Izbriši zahtjev
            </Button>
          ) 
          //If the ticket has been assigned and not verified or closed ->(U obradi)
          //show only the option to verify the proposed solution
          : ticket.status == "ASSIGNED" ? (
            <Button
              style={{
                backgroundColor: "#00101F",
                padding: "5px 20px 5px 20px",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
              onClick={handleVerify}
            >
              Potvrdi rješenje
            </Button>
          ) : (
            <div></div>
          )}
        </>
    )
  }

  const agentOptions = () => {
    return (
      <div>
          {
          //If the ticket is not closed or verified (it is in status ASSIGNED -> U obradi)
          //then show the options to forward the ticket and to link related tickets
          ticket.status=="ASSIGNED" ? 
           (
           <>
           <Button
              style={{
                backgroundColor: "#00101f",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
              onClick={handleModalForward}
            >
              Proslijedi zahtjev
            </Button>
            <Button
              style={{
                backgroundColor: "#00101F",
                padding: "5px 20px 5px 20px",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
              onClick={handleModalBackward}
            >
              Poveži zahtjeve
            </Button>
            </> ) 
            //If the ticket solution has been verified, show the option to close it
            : ticket.status == "VERIFIED" ?
            (<Button
              style={{
                backgroundColor: "#ff5252",
                padding: "5px 20px 5px 20px",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
                
              }}
              onClick={handleCloseTicket}
            >
              Zatvori zahtjev
            </Button>): <></> }  
         
          <TicketForwardModal
            open={open}
            setOpen={setOpen}
            ticketid={ticket.id}
          ></TicketForwardModal>
          <RelatedTicketsBind open={openBind} setOpen={setOpenBind} currId={ticket.id}></RelatedTicketsBind>
    </div>
    )
  }

  return (
    <>
    <CloseModal open={openReportDialog} setOpen={setOpenReportDialog} ticket={ticket}></CloseModal>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert sx={{ width: "100%" }} severity={severity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <ButtonGroup style={{ float: "right", margin: 0 }}>
      
      {//If the current user has created this ticket, show user options
      user.role == "sd_user" && ticket.createdBy.id===user.id ? 
        (userOptions())
      //If the current user is an agent who is assigned to this ticket
      //show agent options
      :ticket.assignedTo && ticket.assignedTo.id===user.id ? (
        agentOptions()
      ) 
      //If ticket hasn't been assigned to anyone, and the current user is an agent
      //show an option to assign the ticket to the current user
      : user.role="sd_agent" && ticket.assignedTo==null ? (
        <Button
                  style={{
                
                    backgroundColor: "#00101F",
                    padding: "0px 20px 0px 20px",
                    textTransform: "none",
                    fontFamily: "Yantramanav",
                    fontWight: "500",
                    fontSize: "18px",
                    color: "white",
                  }}
                  onClick={assignTicket}
                  sx={{ marginLeft: 8 }}
                >
                  Preuzmi
                </Button>
      ) :
      <></>}
      </ButtonGroup>
    </>
  );

}

export default Options;
