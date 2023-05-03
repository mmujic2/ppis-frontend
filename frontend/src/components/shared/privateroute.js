import React from "react";
import { useLocalState } from "../../util/useLocalState";
import {Navigate} from "react-router-dom";
import { Buffer } from "buffer";

const PrivateRoute = ({children,user})=> {
    const [jwt,setJwt] = useLocalState("","jwt");

    return(
        jwt!=null && jwt.length>0
            && JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString()).exp*1000 >= Date.now()
            ?children
            :<Navigate to="/login"></Navigate>
    )
   
}

export default PrivateRoute;

