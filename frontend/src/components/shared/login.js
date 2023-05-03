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
import logo from "../../images/logo.png";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import {useLocalState} from "../../util/useLocalState";

const Login = ({user,setUser}) => {
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
  const [jwt,setJwt] = useLocalState("","jwt");
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqBody = {
      email: email,
      password: password
    }

    fetch("auth/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(reqBody)
    }).then((res) => {
      if(res.status === 200) 
          return res.json();
      else
        return Promise.reject("Invalid login attempt");
    }).then(res=>{
      setJwt(res.token);
      setUser({firstname:res.firstName,lastname:res.lastName,email:res.email,role:res.role,department:res.department});
      window.location.href="/"
    }).catch((message) =>{
      alert(message);
    });

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
            <h1 color="#00101F" style={{ padding: 0, margin: 0 }}>
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

            <FormControl margin="normal" fullWidth variant="outlined">
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
            </FormControl>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                sx={{ mt: 3, mb: 2 }}
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
