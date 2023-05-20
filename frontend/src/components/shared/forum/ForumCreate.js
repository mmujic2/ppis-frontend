import React, { useEffect, useState } from 'react'
import Header from '../../shared/header';
import RichTextEditor from 'react-rte';
import { Container, MenuItem, Typography } from '@mui/material';
import {Box,Button} from '@mui/material';
import {FormControl,TextField,InputLabel} from '@mui/material';
import "./editor.css"
import authService from '../../../util/auth.service';
import UnauthorizedAccess from '../../shared/UnauthorizedAccess';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {Select} from '@mui/material';
import { Navigate, useLocation } from "react-router-dom";
import api from '../../../util/api';
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from 'react-router-dom';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import NotFound from '../../shared/NotFound';

function ForumCreateEdit() {
    const [loading, setLoading] = useState(false);
    const [forumTitle, setForumTitle] = useState("")
    const [forumPostContent, setForumPostContent] = useState(RichTextEditor.createEmptyValue())

    const [val,setVal] = useState(RichTextEditor.createEmptyValue())
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [titleError,setTitleError] = useState(false)
    const [categoryError,setCategoryError] = useState(false)
    const [idInvalid,setIdInvalid] = useState(false)
    const [manual,setManual] = useState()
    const navigate = useNavigate();
    const id = searchParams.get("id");
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

    const handleChange = (e) => {
        setManual({...manual,[e.target.name]:e.target.value})
    }
    var mounted = false;

    useEffect(()=> {
      if(!mounted) {
        mounted=true;
        if(window.location.pathname.includes('/edit')) {
          api.get('/manual/' + id).then((res)=> {
            if(res.status==200) {
              setManual(res.data)
              setVal(RichTextEditor.createValueFromString(res.data.content, 'html'))
            } else  {
              setIdInvalid(true)
            }
          })
        } else {
          setManual({});
        }
      }
    },[])

    const handleSubmit = ()=> {
      setLoading(true);
      let body1 = {topic: forumTitle}
      console.log(body1)
      
      api.post("/forumtopic/create", body1).then((res) => {
        if(res.status == 200) {
            if(forumPostContent != undefined && forumPostContent.toString('markdown').length > 0) {
                let body = {content: forumPostContent.toString('markdown'), forumTopicId: res.data.id}
                api.post("/forumpost/create", body).then(res2 => {
                    setLoading(false)
                    navigate("/forumpost-list?id=" + res.data.id + "&status=" + res.data.open)
                })
            }
        }
        else {
            setToast({ ...toast, open:true,msg: "Došlo je do greške." });
        }
      })


      /*if(id) {
        api.put('/manual/update/' + id,body).then((res)=> {

          if(res.status==200) {
            navigate('/manual?id='+res.data.id)
          } else {
            setToast({ ...toast, open:true,msg: "Došlo je do greške." });
          }
  
        })
      } else {
      api.post('/manual/add',body).then((res)=> {

        if(res.status==200) {
          navigate('/manual?id=' + res.data.id)
          console.log(res.data)
        } else {
          setToast({ ...toast, open:true,msg: "Došlo je do greške." });
        }

      })
    }*/
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
        {(user.role!="sd_user" && user.role!="sd_agent") ?  <UnauthorizedAccess></UnauthorizedAccess> :
        idInvalid? 
        <NotFound></NotFound>
        : manual?
        <Container
          sx={{ mt: 2 }}
          style={{ backgroundColor: "#F5F5F5", padding: 0, width: "80%"}}
        >
        <Box sx={{ width: "100%", backgroundColor: "#00101F" }}>
            <h2
                style={{
                    color:"white",
                    fontFamily:"Yantramanav",
                    padding:5,
                    paddingLeft:10
                }}
            >Forum</h2>
        </Box>
        <Container
          sx={{ padding:"0 10px 0 10px" }}
        >
        <FormControl required style={{ width: "60%" }}>
    
           <TextField
                      id="title"
                      required
                      error={titleError}
                      style={{ backgroundColor: "white", marginBottom:20 }}
                      value={forumTitle}
                      name="title"
                      onChange={(event) => {
                        setForumTitle(event.target.value)
                      }}
                      label="Naslov"
                    ></TextField>
        </FormControl>
        <div style={{height:"100%"}}>
        <RichTextEditor
        className="text-editor"
        toolbarClassName="editor-toolbar"
        editorClassName="editor"
        value={forumPostContent}
        onChange={(e)=>setForumPostContent(e)}/>
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
                  sx={{ marginLeft: 8 }}
                >
                  Kreiraj      {loading ? <CircularProgress color="inherit" size={15} /> : <CircularProgress color="inherit" size={0} />}
        </Button>
        
        </Container>
        </Container> : 
        <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
        </Backdrop>}
      
    </div>
  )
}

export default ForumCreateEdit