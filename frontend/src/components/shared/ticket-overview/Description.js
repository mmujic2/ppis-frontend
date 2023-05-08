import React from 'react'
import {  Paper } from '@mui/material';

function Description({description}) {
  return (
    <Paper style={{width:"90%",marginLeft:"3%",marginTop:10,marginBottom:10,padding:"2%",textAlign: "justify",
          textJustify: "inter-word"}}>
            <span style={{padding:10,fontFamily:"Yantramanav"}}>{description}</span>
    </Paper>
  )
}

export default Description