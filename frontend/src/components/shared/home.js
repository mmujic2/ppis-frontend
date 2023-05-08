import React, { useEffect, useState } from "react";
import { useLocalState } from "../../util/useLocalState";
import {Button} from "@mui/material";
import api from "../../util/api";
import authService from "../../util/auth.service";
import { useNavigate } from "react-router-dom";
import Header from "./header"
import AgentHomeContent from "../agent/home/AgentHomeContent";
import UserHomeContent from "../user/home/UserHomeContent";

const Home= () =>{
    
    
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

   
    return (
        <div>
          <Header></Header>
          {user.role == "sd_agent" ? <AgentHomeContent></AgentHomeContent> : <UserHomeContent></UserHomeContent>}
        </div>
    )
}

export default Home;