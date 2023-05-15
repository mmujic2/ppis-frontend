import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';

export default function CloseModal({open,setOpen,ticket}) {
   const navigate = useNavigate();
 

  const handleClose = () => {
    setOpen(false);
  };

  const handleReport = () => {
    setOpen(false)
    navigate("/report/create",{ state: ticket})
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle style={{ margin: 0, padding: 10, backgroundColor: "#D9D9D9",color:"#00101f",fontFamily:"Yantramanav",fontWeight:"bold",width:"300px",fontSize:"20px" }}>
          {"Kreiranje izvještaja"}
        </DialogTitle>
        <DialogContentText style={{  padding: 10, backgroundColor: "#D9D9D9",color:"#00101f",fontFamily:"Yantramanav" }}>
            {"Da li želite kreirati izvještaj?"}
        </DialogContentText>
        
        <DialogActions style={{ margin: 0, padding: 10, backgroundColor: "#D9D9D9" }}>
          <Button onClick={handleClose} style={{backgroundColor:"#8A9DAE",color:"#00101f"}}>Ne</Button>
          <Button onClick={handleReport} autoFocus style={{backgroundColor:"#00101f",color:"white"}}>
            Da
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
