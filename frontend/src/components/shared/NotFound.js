import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  
    return (
        <div style={{fontFamily:"Yantramanav",color:"#00101F", marginLeft:"20px"}}>
            <h1 style={{fontWeight:700}}>Stranica ne postoji</h1>
            <p>Resurs koji tražite ne postoji na ovoj lokaciji.</p>
            <Link to="/" style={{textDecoration:"none"}}>Povratak na početnu stranicu</Link>
        </div>
      )
  
}

export default NotFound