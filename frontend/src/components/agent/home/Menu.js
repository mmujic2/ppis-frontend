import React from 'react';
import StyleIcon from '@mui/icons-material/Style';
import ForumIcon from '@mui/icons-material/Forum';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TopicIcon from '@mui/icons-material/Topic';

function Menu() {
  const navigate = useNavigate();

  const showLog = () => {
    navigate("/ticket-list");
    //console.log("nesto")
  };
  const showManual = () => {
    navigate("/manual-list");
    //console.log("nesto")
  };

  const showReportList = () => {
    navigate("/report-list");
  };

  const showForumList = () => {
    navigate("/forum-list");
  };

  return (
    <div style={{marginLeft:"30px",width:"60%",marginTop:"17%",position:"absolute",backgroundColor:"inherit",zIndex:3}}>
    <Stack direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={3}>
    <div>
    <IconButton size='large' sx={{ boxShadow: 5 }} style={{backgroundColor:"white"}} onClick={() => showLog()}>
      <StyleIcon style={{color:"#00101F"}}/>
      
    </IconButton>
    <Link
     to="/ticket-list"
     style={{paddingLeft:20,fontFamily:"Yantramanav",fontSize:"100%",color:"#00101F",textDecoration:"none",zIndex:10 }}
     >Pregled zahtjeva</Link>
    </div>
    <div>
    <IconButton size='large' sx={{ boxShadow: 5 }} style={{backgroundColor:"white"}} onClick={() => showForumList()}>
      <ForumIcon style={{color:"#00101F"}}/>
    </IconButton>
    <Link to="/forum-list" style={{paddingLeft:20,fontFamily:"Yantramanav",fontSize:"100%",color:"#00101F",textDecoration:"none" }}>Forum</Link>
    </div>
    <div>
    <IconButton size='large' sx={{ boxShadow: 5 }} style={{backgroundColor:"white"}} onClick={() => showManual()}>
      <LiveHelpIcon style={{color:"#00101F"}}/>
    </IconButton>
    <Link to="/manual-list" style={{paddingLeft:20,fontFamily:"Yantramanav",fontSize:"100%",color:"#00101F",textDecoration:"none" }}>Pomoć</Link>
    </div>
    <div>
    <IconButton size='large' sx={{ boxShadow: 5 }} style={{backgroundColor:"white"}} onClick={() => showReportList()}>
      <TopicIcon style={{color:"#00101F"}}/>
    </IconButton>
    <Link to="/report-list" style={{paddingLeft:20,fontFamily:"Yantramanav",fontSize:"100%",color:"#00101F",textDecoration:"none" }}>Izvještaji</Link>
    </div>
    </Stack>
    </div>
    
  )
}

export default Menu