import React from 'react'
import graphic from "../../../images/homeUserGraphic.svg";

import SearchBar from './SearchBar';
import Menu from './Menu';



function UserHomeContent() {

  return (
    <div>
    <div style={{position:"absolute", zIndex:2,width:"100%",height:"200px",margin:0,padding:0,backgroundColor:"#00101F"}}>
      <h1 style={{color:"white",fontFamily:"Asap Condensed",fontSize:"250%",fontWeight:"700",paddingTop:"1%",margin:0,textAlign:"center"}}>
        Centar za podršku
      </h1>
      <SearchBar></SearchBar>
    <div>
    </div>
    </div>
   <div style={{margin:0,textAlign:"center",position:"absolute", zIndex:1,width:"45%",height:480,backgroundColor:"#00101F",borderBottomRightRadius:"100%",borderBottomLeftRadius:"100%",borderTopRightRadius:"100%"}}>
    <img src={graphic} alt="React Logo" style={{position:"relative",zIndex:1,marginTop:"28%",width:"60%"}} />
    </div>
    
    <Menu></Menu>
    

    </div>
  )
}

export default UserHomeContent