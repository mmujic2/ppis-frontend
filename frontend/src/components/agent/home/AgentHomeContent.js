import React from 'react'
import Menu from './Menu';
import RequestList from './RequestList';
import graphic from '../../../images/homeAgentGraphic.svg';

function AgentHomeContent() {
  return (
    <div>
      <div style={{position:"absolute", zIndex:1,width:"100%",height:"200px",margin:0,padding:0,backgroundColor:"#00101F"}}>
      <h1 style={{color:"white",fontFamily:"Asap Condensed",fontSize:"350%",fontWeight:"700",paddingTop:"5%",paddingBottom:5,marginLeft:"20px"}}>
        Centar za podršku
      </h1>
      </div>
      <Menu></Menu>
      <div style={{margin:0,textAlign:"center",position:"absolute",marginLeft:"100px", zIndex:2,width:"50%",height:480}}>
        <img src={graphic} alt="React Logo" style={{position:"relative",zIndex:2,marginTop:"35%",width:"60%"}} />
      </div>
      <RequestList></RequestList>
    </div>
  )
}

export default AgentHomeContent