import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@mui/material/Typography';
import  logo  from '../../images/header_logo2.png';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import api from "../../util/api";
import setBodyColor from "../../functions/setBodyColor";
import authService from '../../util/auth.service';


import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navToHome = () => {
   navigate("/");
  };
  
  const logout = () => {
    document.body.style.cursor='wait';
    api.post('/auth/logout').then(
        () => {
        document.body.style.cursor='default';
        authService.logout();
        navigate("/login");
        }
      )
  }

  setBodyColor({ color: "#E4E4E4" });

  return (
    <AppBar position="static" style={{backgroundColor:'#00101F'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <IconButton
              size="large"
              onClick={navToHome}
            >
              <Icon style={{width:'50px',height:'5%'}}>
              <img src={logo} alt="Logo" style={{width: "100%"}} />
                </Icon>
            </IconButton>
            <Button color="inherit" onClick={navToHome} style={{textTransform: 'none',fontFamily:"Yantramanav",fontWight:"500",fontSize:"22px"}}>Početna</Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
           
        
          <Button color="inherit" onClick={logout} style={{textTransform: 'none',fontFamily:"Yantramanav",fontWight:"500",fontSize:"22px"}}>Odjava</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;