import React, { useEffect, useState } from 'react'
import Header from '../../shared/header';
import { Textarea } from '@mui/joy';
import { Container, MenuItem, Typography } from '@mui/material';
import { Box, Button } from '@mui/material';
import { FormControl, TextField, InputLabel } from '@mui/material';
import "./editor.css"
import authService from '../../../util/auth.service';
import UnauthorizedAccess from '../../shared/UnauthorizedAccess';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Select } from '@mui/material';
import { Navigate, useLocation } from "react-router-dom";
import api from '../../../util/api';
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from 'react-router-dom';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import NotFound from '../../shared/NotFound';

function ForumCreateEdit() {
  const [loading, setLoading] = useState(false);
  const [forumTitle, setForumTitle] = useState("")
  const [forumPostContent, setForumPostContent] = useState()


  const navigate = useNavigate();

  const [toast, setToast] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { vertical, horizontal, open } = toast;

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };


  const handleSubmit = () => {

    if (forumPostContent == undefined || forumPostContent.length == 0 || forumTitle == undefined || forumTitle.length == 0) {
      setToast({ ...toast, open: true, msg: "Unesite vrijednosti u sva polja!" });
      return
    }
    setLoading(true);
    let body1 = { topic: forumTitle }


    api.post("/forumtopic/create", body1).then((res) => {
      if (res.status == 200) {
        if (forumPostContent != undefined && forumPostContent.length > 0) {
          let body = { content: forumPostContent, forumTopicId: res.data.id }
          api.post("/forumpost/create", body).then(res2 => {
            setLoading(false)
            navigate("/forumpost-list?id=" + res.data.id + "&status=" + res.data.open)
          })
        }
      }
      else {
        setToast({ ...toast, open: true, msg: "Došlo je do greške." });
      }
    })



  }

  const user = authService.getCurrentUser();
  return (
    <div>
      <Header></Header>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error">
          {toast.msg}
        </Alert>
      </Snackbar>

      <Container
        sx={{ mt: 2 }}
        style={{ backgroundColor: "#F5F5F5", padding: 0, width: "80%" }}
      >
        <Box sx={{ width: "100%", backgroundColor: "#00101F" }}>
          <h2
            style={{
              color: "white",
              fontFamily: "Yantramanav",
              padding: 5,
              paddingLeft: 10
            }}
          >Forum</h2>
        </Box>
        <Container
          sx={{ padding: "0 10px 0 10px" }}
        >
          <FormControl required style={{ width: "60%" }}>

            <TextField
              id="title"
              required
              style={{ backgroundColor: "white", marginBottom: 20 }}
              value={forumTitle}
              name="title"
              onChange={(event) => {
                setForumTitle(event.target.value)
              }}
              label="Naslov"
            ></TextField>
          </FormControl>
          <div style={{ height: "100%" }}>
            <Textarea
              required
              placeholder="Unesite opis teme"
              value={forumPostContent ? forumPostContent : ""}
              name="content"
              onChange={(event) => {
                setForumPostContent(event.target.value)
              }}
              minRows={5}
              style={{ width: "100%" }}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#00101F",
              marginLeft: "90%",
              marginTop: 10,
              padding: "5px 20px 5px 20px",
              textTransform: "none",
              fontFamily: "Yantramanav",
              fontWight: "500",
              fontSize: "18px",
              color: "white",
            }}
            onClick={handleSubmit}
            sx={{ marginLeft: 8,marginBottom:10 }}
          >
            Kreiraj      {loading ? <CircularProgress color="inherit" size={15} /> : <CircularProgress color="inherit" size={0} />}
          </Button>

        </Container>
      </Container>

    </div>
  )
}

export default ForumCreateEdit