import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dateFormat from "dateformat";
import { Card, Container, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import Textarea from "@mui/joy/Textarea";
import { FormControl, Button } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import api from "../../../util/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ReportIcon from "@mui/icons-material/Report";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

function Ticket({ ticket }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [ticketPage, setTicketPage] = useState([]);
  const ticketsPerPage = 5;

  const classes = useStyles();
  useEffect(() => {
    let n = ticket.length / ticketsPerPage;
    if (Math.floor(n) == n) setNumOfPages(n);
    else setNumOfPages(Math.floor(n) + 1);
    goToPage(1);
  }, [ticket]);

  const handleChange = (event, value) => {
    goToPage(value);
    setPage(value);
  };

  const goToPage = (p) => {
    setTicketPage(
      ticket.slice(
        (p - 1) * ticketsPerPage,
        (p - 1) * ticketsPerPage + ticketsPerPage
      )
    );
  };

  const priority = (ticket) => {
    switch (ticket.priorityLevel) {
      case "LOW":
        return (
          <div style={{ width: "fit-content", float: "left" }}>
            <ReportIcon
              style={{
                color: "#2e7d32",
                verticalAlign: "middle",
                verticalAlign: "middle",
              }}
            ></ReportIcon>
            <span
              style={{
                color: "#2e7d32",
                fontWeight: "bold",
                fontFamily: "Yantramanav",
                verticalAlign: "middle",
                paddingLeft: "10px",
              }}
            >
              Nizak prioritet
            </span>
          </div>
        );
        break;
      case "MEDIUM":
        return (
          <div style={{ width: "fit-content", float: "left" }}>
            <ReportIcon
              style={{ color: "#ffc400", verticalAlign: "middle" }}
            ></ReportIcon>
            <span
              style={{
                color: "#ffc400",
                fontWeight: "bold",
                fontFamily: "Yantramanav",
                verticalAlign: "middle",
                paddingLeft: "10px",
              }}
            >
              Srednji prioritet
            </span>
          </div>
        );
        break;
      case "HIGH":
        return (
          <div style={{ width: "fit-content", float: "left" }}>
            <ReportIcon
              style={{ color: "#ed6c02", verticalAlign: "middle" }}
            ></ReportIcon>
            <span
              style={{
                color: "#ed6c02",
                fontWeight: "bold",
                fontFamily: "Yantramanav",
                verticalAlign: "middle",
                paddingLeft: "10px",
              }}
            >
              Visok prioritet
            </span>
          </div>
        );
        break;
      case "URGENT":
        return (
          <div style={{ width: "fit-content", float: "left" }}>
            <ReportIcon
              style={{ color: "#c62828", verticalAlign: "middle" }}
            ></ReportIcon>
            <span
              style={{
                color: "#c62828",
                fontWeight: "bold",
                fontFamily: "Yantramanav",
                verticalAlign: "middle",
                paddingLeft: "10px",
              }}
            >
              Urgentno
            </span>
          </div>
        );
        break;
    }
  };

  const category = (ticket) => {
    switch (ticket.category) {
      case "SOFTWARE":
        return "Softver";
        break;
      case "HARDWARE":
        return "Hardver";
        break;
      case "NETWORK":
        return "Mreža";
        break;
      default:
        return "Ostalo";
        break;
    }
  };

  return (
    <Container
      style={{
        width: "90%",
        backgroundColor: "#00101F",
        padding: 20,
      }}
    >
      {ticketPage.map((t) => (
        <Link to={"/ticket?id=" + t.id}>
          <Card
            hoverable
            key={t.id}
            style={{
              padding: 15,
              marginBottom: 20,
              height: "auto",
              backgroundColor: "white",
              fontFamily: "Yantramanav",
              overflow: "hidden",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "100%" }}>
              <span
                style={{
                  fontWeight: "bold",
                  float: "left",
                  fontFamily: "Yantramanav",
                }}
              >
                {dateFormat(t.date, "dd/mm/yyyy, HH:MM")}
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  float: "right",
                  fontFamily: "Yantramanav",
                }}
              >
                Kategorija: {category(t)}
              </span>
            </div>

            <span
              style={{
                clear: "both",
                float: "left",
                fontWeight: "bold",
                fontSize: "1.8em",
                fontFamily: "Yantramanav",
              }}
            >
              {t.title}
            </span>
            <span
              style={{
                clear: "both",
                float: "left",
                marginBottom: "20px",
                fontFamily: "Yantramanav",
              }}
            >
              {t.description}
            </span>

            <div style={{ width: "100%" }}>
              <span
                style={{
                  fontWeight: "bold",
                  clear: "both",
                  float: "left",
                  fontFamily: "Yantramanav",
                }}
              >
                {t.createdBy.firstname} {t.createdBy.lastname}
              </span>
              <span
                style={{
                  fontFamily: "Yantramanav",

                  fontWeight: "bold",
                  float: "right",
                }}
              >
                {priority(t)}
              </span>
            </div>
          </Card>
        </Link>
      ))}
      {ticket.length > 0 ? (
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
    </Container>
  );
}

export default Ticket;
