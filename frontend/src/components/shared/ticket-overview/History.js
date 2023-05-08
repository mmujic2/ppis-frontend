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
import { FormControl, Button } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import api from "../../../util/api";
import { makeStyles } from "@material-ui/core/styles";

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

function History({ ticketComments, ticketId }) {
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

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    let n = ticketComments.length / commentsPerPage;
    if (Math.floor(n) == n) setNumOfPages(n);
    else setNumOfPages(Math.floor(n) + 1);
    goToPage(1);
  }, [ticketComments]);

  const handleChange = (event, value) => {
    goToPage(value);
    setPage(value);
  };

  const goToPage = (p) => {
    setCommentPage(
      ticketComments.slice(
        (p - 1) * commentsPerPage,
        (p - 1) * commentsPerPage + commentsPerPage
      )
    );
  };

  const sendComment = () => {
    if (comment == null || comment.length == 0) {
      setToast({ ...toast, open: true });
      return;
    }

    api
      .post("/ticket-comment/create", { comment: comment, ticketId: ticketId })
      .then((res) => {
        Array.prototype.unshift.apply(ticketComments, [res.data]);
        let n = ticketComments.length / commentsPerPage;
        if (Math.floor(n) == n) setNumOfPages(n);
        else setNumOfPages(Math.floor(n) + 1);
        goToPage(1);
      });
  };

  return (
    <>
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
      <div>
        <span
          style={{
            marginLeft: "3%",
            fontSize: "180%",
            fontWeight: "bold",
            color: "#00101f",
            fontFamily: "Yantramanav",
          }}
        >
          Historija
        </span>
        <hr
          style={{ marginLeft: "3%", backgroundColor: "#00101f", width: "90%" }}
        ></hr>
      </div>
      <Container
        style={{
          marginLeft: "3%",
          width: "90%",
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
            <span style={{ clear: "both", float: "left" }}>{tc.comment}</span>
            <span style={{ fontWeight: "bold", clear: "both", float: "right" }}>
              {tc.createdBy.firstname} {tc.createdBy.lastname}
            </span>
          </Paper>
        ))}
        {ticketComments.length > 0 ? (
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
        <hr></hr>
        <FormControl required style={{ width: "100%" }}>
          <Textarea
            required
            placeholder="Unesite odgovor"
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
      </Container>
    </>
  );
}

export default History;
