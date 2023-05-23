import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dateFormat from "dateformat";
import { Container, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import Textarea from "@mui/joy/Textarea";
import { FormControl, Button, Box } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import api from "../../../util/api";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import Header from "../header";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import authService from "../../../util/auth.service";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import "./editor.css"
import Description from "../ticket-overview/Description";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

function ForumPostList() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [forumTopic, setForumTopic] = useState();
  const [forumPosts, setForumPosts] = useState(undefined);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  let status = (searchParams.get("status") === "true");
  const [status2, setStatus2] = useState(true);

  const [commentPage, setCommentPage] = useState([]);
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState();
  const [numOfPages, setNumOfPages] = useState(1);
  const commentsPerPage = 5;
  const [toast, setToast] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = toast;

  const classes = useStyles();

  const LoadPosts = () => {
    api.get("/forumtopic/get/" + id).then(res1 => {
      setForumTopic(res1.data);
      api.get("/forumpost/get/" + id).then(res2 => {
        if (res2.status == 200) {
          setForumPosts(res2.data);
        }
        else {

        }

      })
    })

  }

  var mounted = false
  useEffect((() => {
    if (!mounted) {
      LoadPosts();
    }
  }), [])

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    if (forumPosts != undefined) {
      let n = forumPosts.length / commentsPerPage;
      if (Math.floor(n) == n) setNumOfPages(n);
      else setNumOfPages(Math.floor(n) + 1);
      goToPage(1);
    }
  }, [forumPosts]);

  const handleChange = (event, value) => {
    goToPage(value);
    setPage(value);
  };

  const goToPage = (p) => {
    setCommentPage(
      forumPosts.slice(
        (p - 1) * commentsPerPage,
        (p - 1) * commentsPerPage + commentsPerPage
      )
    )
    setLoading(false);
  };

  const sendComment = () => {
    if (comment == null || comment.length == 0) {
      setToast({ ...toast, open: true });
      return;
    }

    api
      .post("/forumpost/create", { content: comment, forumTopicId: id })
      .then((res) => {
        Array.prototype.unshift.apply(forumPosts, [res.data]);
        let n = forumPosts.length / commentsPerPage;
        if (Math.floor(n) == n) setNumOfPages(n);
        else setNumOfPages(Math.floor(n) + 1);
        goToPage(1);
      });
  };

  const closeTopic = () => {
    setLoading2(true)
    api.post("/forumtopic/close/" + id, {}).then(res => {
      setLoading2(false)
      navigate("/forum-list")
    })
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" color="#00101f" href="/" onClick={(e) => { e.preventDefault(); navigate("/forum-list") }}>
      Teme
    </Link>,
    <Typography key="3" color="text.primary">
      {forumTopic ? forumTopic.topic : ""}
    </Typography>,
  ];

  return (
    <>
      <Header></Header>
      <div style={{ width: "90%", alignSelf:"center" , margin: "auto" }}>

      

      <div style={{ width: "100%", alignSelf:"center" , padding: 0,margin: "auto", marginTop:"30px" }}>
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon style={{ color: "#00101f" }} fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>
      <Container
        style={{ backgroundColor: "#F5F5F5", width: "100%", padding: 0, height: "fit-content",margin: "auto", marginTop:10 }}
      >
        {forumTopic ?
          <>
            <Box sx={{ width: "100%", backgroundColor: "#00101F", display: "flex", justifyContent: "space-between"}}>
              <h2
                style={{
                  color: "white",
                  fontFamily: "Yantramanav",
                  padding: 5,
                  paddingLeft: 10
                  , marginBottom: 5
                }}
              >Komentari na temu: <span style={{ color: "#f54242" }}>{forumTopic.topic}</span></h2>
              {(status && (user.role === "sd_agent" || (user.email === forumTopic.createdBy.email))) ? <Button

                style={{
                  backgroundColor: "#f54242",
                  padding: "3px 15px 3px 15px",
                  height: "fit-content",
                  textTransform: "none",
                  marginTop: 20,
                  marginRight: 10,
                  fontFamily: "Yantramanav",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "white",
                }}
                onClick={closeTopic}
              >
                Zatvori {loading2 ? <CircularProgress color="inherit" size={15} /> : <CircularProgress color="inherit" size={0} />}
              </Button> : <></>}
            </Box>

            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={toast.open}
              autoHideDuration={6000}
              onClose={handleClose}
              key={vertical + horizontal}
            >
              <Alert onClose={handleClose} severity="error">
                Niste unijeli odgovor u polje!
              </Alert>
            </Snackbar>


            {forumPosts ?
              <>
                <div >

                  <Description description={forumPosts[forumPosts.length - 1].content} />
                  <hr
                    style={{ backgroundColor: "#00101f", width: "95%" }}
                  ></hr>
                </div>
                <Container
                  style={{
                    width: "95%",
                    backgroundColor: "#00101f",
                    padding: 20,
                  }}
                >
                  {commentPage.map((tc) => (
                    <Paper
                      key={tc.id}
                      style={{
                        padding: 15,
                        marginBottom: 20,
                        height: "auto",
                        backgroundColor: "white",
                        fontFamily: "Yantramanav",
                        overflow: "hidden",
                      }}
                    >
                      <span style={{ fontWeight: "bold", float: "right" }}>
                        {dateFormat(tc.dateTime, "dd/mm/yyyy, HH:MM")}
                      </span>
                      <span style={{ clear: "both", float: "left" }}>{tc.content}</span>
                      <span style={{ fontWeight: "bold", clear: "both", float: "right" }}>
                        {tc.createdBy.firstname} {tc.createdBy.lastname}
                      </span>
                    </Paper>
                  ))}
                  {forumPosts.length > 0 ? (
                    <Stack spacing={2}>
                      <div style={{ justifyContent: "center", display: "flex" }}>
                        <Pagination
                          classes={{ ul: classes.ul }}
                          color="primary"
                          onChange={handleChange}
                          page={page}
                          count={numOfPages}
                          renderItem={(item) => (
                            <PaginationItem
                              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                              {...item}
                            />
                          )}
                        />
                      </div>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  {(status) ?
                    <>
                      <hr></hr>
                      <FormControl required style={{ width: "100%" }}>
                        <Textarea
                          required
                          placeholder="Unesite komentar"
                          value={comment ? comment : ""}
                          name="comment"
                          onChange={(event) => {
                            handleCommentChange(event);
                          }}
                          minRows={5}
                          style={{ width: "100%" }}
                        />
                        <Button
                          style={{
                            backgroundColor: "#1769aa",
                            marginLeft: "90%",
                            marginTop: 10,
                            padding: "5px 20px 5px 20px",
                            textTransform: "none",
                            fontFamily: "Yantramanav",
                            fontWight: "500",
                            fontSize: "18px",
                            color: "white",
                          }}
                          onClick={sendComment}
                        >
                          Dodaj
                        </Button>
                      </FormControl>
                    </>
                    : <></>}
                </Container>
              </> : <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
              />}
          </>
          : <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>}
      </Container>
      </div>
    </>
  );
  
}

export default ForumPostList;
