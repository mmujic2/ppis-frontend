import React from 'react';
import StyleIcon from '@mui/icons-material/Style';
import ForumIcon from '@mui/icons-material/Forum';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

function Menu() {
  return (
    <div style={{marginLeft:"30px",width:"60%",marginTop:"17%",position:"absolute",backgroundColor:"inherit"}}>
    <Stack direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={3}>
    <div>
    <IconButton size='large' sx={{ boxShadow: 5 }} style={{backgroundColor:"white"}}>
      <StyleIcon style={{color:"#00101F"}}/>
    </IconButton>
    <Link style={{paddingLeft:20,fontFamily:"Yantramanav",fontSize:"100%",color:"#00101F",textDecoration:"none" }}>Pregledaj zahtjeve</Link>
    </div>
    <div>
    <IconButton size='large' sx={{ boxShadow: 5 }} style={{backgroundColor:"white"}}>
      <ForumIcon style={{color:"#00101F"}}/>
    </IconButton>
    <Link style={{paddingLeft:20,fontFamily:"Yantramanav",fontSize:"100%",color:"#00101F",textDecoration:"none" }}>Forum</Link>
    </div>
    <div>
    <IconButton size='large' sx={{ boxShadow: 5 }} style={{backgroundColor:"white"}}>
      <LiveHelpIcon style={{color:"#00101F"}}/>
    </IconButton>
    <Link style={{paddingLeft:20,fontFamily:"Yantramanav",fontSize:"100%",color:"#00101F",textDecoration:"none" }}>Pomoć</Link>
    </div>
    </Stack>
    </div>
    
  )
}

export default Menu