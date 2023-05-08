import React from 'react'
import { Link } from 'react-router-dom'

function UnauthorizedAccess() {
  return (
    <div style={{fontFamily:"Yantramanav",color:"#00101F", marginLeft:"20px"}}>
        <h1 style={{fontWeight:700}}>Neautorizovan pristup</h1>
        <p>Nemate potrebna prava da pristupite ovoj stranici.</p>
        <Link to="/" style={{textDecoration:"none"}}>Povratak na početnu stranicu</Link>
    </div>
  )
}

export default UnauthorizedAccess