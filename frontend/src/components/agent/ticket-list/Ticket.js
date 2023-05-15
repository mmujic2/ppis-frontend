import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReportIcon from "@mui/icons-material/Report";
import { Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketCard from "./TicketCard";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

function Ticket({ ticket, bodyColor, ticketsPerPage = 5 }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [ticketPage, setTicketPage] = useState([]);

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
        backgroundColor: bodyColor ? bodyColor : "#00101F",
        padding: 20,
      }}
    >
      {ticketPage.map((t) => (
        <TicketCard t={t}></TicketCard>
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
