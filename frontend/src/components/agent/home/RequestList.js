import React from 'react'

function RequestList() {
  return (
    <div 
    style={{height:"80%",width:"52%",backgroundColor:"#D9D9D9",
    position:"absolute",zIndex:1,marginLeft:"45%", boxShadow: '1px 2px 9px #000000'}}>
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
    </div>
  )
}

export default RequestList