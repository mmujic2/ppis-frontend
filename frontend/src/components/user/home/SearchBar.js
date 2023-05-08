import React from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import authService from '../../../util/auth.service';
import IconButton from '@mui/material/IconButton';


function SearchBar() {
var user = authService.getCurrentUser();
  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        margin: "30px auto",
      }}>
    <Grid>
    <span style={{color:"white",fontFamily:"Yantramanav",fontSize:"100%",paddingBottom:10}}>Dobrodošli {user.firstName}, da li imate pitanje?</span>
    
    <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',marginTop:"10px",width:600 }}
    >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
  </Grid>
  </div>
  )
}

export default SearchBar