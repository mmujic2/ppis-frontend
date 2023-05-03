import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalState";
import {Button} from "@mui/material";
const Home= () =>{
    const [jwt,setJwt] = useLocalState("","jwt");
    const [user,setUser] = useState();

    const logout = () => {
        fetch("auth/logout", {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + jwt
            },
            method: "post",
          }).then(() => {
            localStorage.clear();
            window.location.reload();
          })
    }

    console.log(user)
    return (
        <div>
            <h1>{user}</h1>
           <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick = {()=>logout()}
              >
                Odjava
              </Button>
        </div>
    )
}

export default Home;