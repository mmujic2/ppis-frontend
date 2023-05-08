import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import setBodyColor from "../../functions/setBodyColor";
import logo from "../../images/logo2.png";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import {useLocalState} from "../../util/useLocalState";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import AuthService from "../../util/auth.service"

const Login = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: 300,
    width: 700,
    margin: "auto",
    backgroundColor: "#D9D9D9",
  };

  const btnstyle = {
    margin: "20px 0",
    backgroundColor: "#00101F",
  };

  const textfieldStyle = {
    margin: "1rem auto",
  };

  setBodyColor({ color: "#00101F" });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showError,setShowError] = useState(false);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    document.body.style.cursor='wait';
    const reqBody = {
      email: email,
      password: password
    }

    AuthService.login(email,password).then(
      () => {
        document.body.style.cursor='default';
        setShowError(false);
        navigate("/")
      },
      error => {
        document.body.style.cursor='default';
        setShowError(true);
      }
    )

  };


  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          margin: "30px auto",
        }}
      >
        <img src={logo} alt="Logo" width={250} />
      </div>

      <Grid>
        <Paper elevation={8} style={paperStyle}>
          <div style={{ margin: "20px auto" }}>
            <h1 color="#00101F" style={{ padding: 0, margin: 0, fontFamily: 'Yantramanav' }}>
              Prijava
            </h1>
            <hr
              style={{
                color: "black",
                backgroundColor: "black",
                borderColor: "black",
                height: "1px",
                flex: "1px",
                padding: 0,
                margin: 0,
              }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Email adresa</InputLabel>
              <OutlinedInput
                id="email"
                endAdornment={<InputAdornment position="end"></InputAdornment>}
                label="Email adresa"
                name="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>

            <FormControl style={{margin:0,marginTop:8}} fullWidth variant="outlined">
              <InputLabel>Lozinka</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Lozinka"
                onChange={(event) => setPassword(event.target.value)}
              />
              <span style={{display: showError ? "block" : "none",color:"#d32f2f",fontFamily: 'Yantramanav', marginTop:10,fontSize:'16px' }}>Neispravni pristupni podaci.</span>
            </FormControl>
            <div style={{ display: "flex", justifyContent: "flex-end", padding:0, margin:0 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{backgroundColor: "#00101F",marginTop:10,textTransform: 'none',fontFamily:"Yantramanav",fontWight:"500",fontSize:"18px"}}
                fullWidth
                sx={{ mt: 0, mb: 2 }}
              >
                Nastavi
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
