import React from 'react'
import authService from '../../../util/auth.service';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Options({ticket}) {
    const user = authService.getCurrentUser();
  return (
    <>
    {user.role=="sd_user"?
    <ButtonGroup style={{float:"right",margin:0}}>
              <Button
                  style={{
                    backgroundColor: "#ff5252",
                    textTransform: 'none',
                    fontFamily: "Yantramanav",
                    fontWeight: "500", fontSize: "15px", color: "white",
                    height:"30px"
                }}
               
              >Izbriši zahtjev</Button>
              <Button
                 style={{
                  backgroundColor: "#00101F",
                   padding: "5px 20px 5px 20px", textTransform: 'none',
                  fontFamily: "Yantramanav",
                  fontWeight: "500", fontSize: "15px", color: "white",
                  height:"30px"
              }}
              >Potvrdi rješenje</Button>
      </ButtonGroup> : 
      <ButtonGroup style={{float:"right",margin:0}}>
      <Button
          style={{
            backgroundColor: "#00101f",
            textTransform: 'none',
            fontFamily: "Yantramanav",
            fontWeight: "500", fontSize: "15px", color: "white",
            height:"30px"
        }}
       
      >Proslijedi zahtjev</Button>
      <Button
         style={{
          backgroundColor: "#00101F",
           padding: "5px 20px 5px 20px", textTransform: 'none',
          fontFamily: "Yantramanav",
          fontWeight: "500", fontSize: "15px", color: "white",
          height:"30px"
      }}
      >Poveži zahtjeve</Button>
      <Button
         style={{
          backgroundColor: "#ff5252",
           padding: "5px 20px 5px 20px", textTransform: 'none',
          fontFamily: "Yantramanav",
          fontWeight: "500", fontSize: "15px", color: "white",
          height:"30px"
      }}
      >Zatvori zahtjev</Button>
      </ButtonGroup> 
      }
    </>
  )
}

export default Options