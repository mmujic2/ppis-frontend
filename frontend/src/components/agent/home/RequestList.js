import React, { useEffect, useState } from 'react';
import Ticket from '../../user/ticket-list/Ticket';
import api from "../../../util/api";
import { Typography } from '@mui/material';

function RequestList() {
  const [urgentTickets,setUrgentTickets] = useState([])
  var mounted = false;

  useEffect(()=> {
    if(!mounted) {
      mounted=true
    api.get("/ticket/urgent").then((res)=>{
      setUrgentTickets(res.data)
    })
  }
  },[])

  return (
    <div 
    style={{height:"90%",width:"52%",backgroundColor:"#D9D9D9",
    position:"absolute",zIndex:1,marginLeft:"45%", boxShadow: '1px 2px 9px #000000',overflow:'hidden'}}>
        <h1 style={{color:"#00101F",fontFamily:"Yantramanav",fontSize:"180%", padding:"15px 15px 0px",margin:0}}>Urgentni zahtjevi</h1>
        <hr
              style={{
                color: "#00101F",
                backgroundColor: "#00101F",
                borderColor: "#00101F",
                height: "1px",
                flex: "1px",
                padding: 0,
                margin: "0px 10px 0px 10px",
              }}
            />
            {urgentTickets.length==0 ? <Typography style={{fontFamily:"Yantramanav",fontColor:"gray",textAlign:"center",marginTop:"40%"}}>Nema urgentnih zahtjeva</Typography> :
            <Ticket ticket={urgentTickets} bodyColor={"#D9D9D9"} ticketsPerPage={2}></Ticket>}
    </div>
  )
}

export default RequestList