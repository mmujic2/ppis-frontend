import React from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FeedbackIcon from "@mui/icons-material/Feedback";
import StyleIcon from "@mui/icons-material/Style";
import ForumIcon from "@mui/icons-material/Forum";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

function Menu() {
  const navigate = useNavigate();

  const createATicket = (tag) => {
    navigate("/create-ticket?tag=" + tag);
  };

  const openForum = () => {
    navigate("/forum-list")
  }

  return (
    <div
      style={{
        marginLeft: "50%",
        width: "60%",
        marginTop: "17%",
        position: "absolute",
        backgroundColor: "inherit",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <div>
          <IconButton
            size="large"
            sx={{ boxShadow: 5 }}
            style={{ backgroundColor: "white" }}
            onClick={() => createATicket("incident")}
          >
            <ReportProblemIcon style={{ color: "#00101F" }} />
          </IconButton>
          <Link
            to="/create-ticket?tag=incident"
            style={{
              paddingLeft: 20,
              fontFamily: "Yantramanav",
              fontSize: "100%",
              color: "#00101F",
              textDecoration: "none",
            }}
          >
            Prijavi problem
          </Link>
        </div>
        <div>
          <IconButton
            onClick={() => createATicket("req")}
            size="large"
            sx={{ boxShadow: 5 }}
            style={{ backgroundColor: "white" }}
          >
            <FeedbackIcon style={{ color: "#00101F" }} />
          </IconButton>
          <Link
            to="/create-ticket?tag=req"
            style={{
              paddingLeft: 20,
              fontFamily: "Yantramanav",
              fontSize: "100%",
              color: "#00101F",
              textDecoration: "none",
            }}
          >
            Podnesi zahtjev za uslugom
          </Link>
        </div>
        <div>
          <IconButton
            size="large"
            sx={{ boxShadow: 5 }}
            style={{ backgroundColor: "white" }}
          >
            <StyleIcon style={{ color: "#00101F" }} />
          </IconButton>
          <Link
            to="/ticket-list"
            style={{
              paddingLeft: 20,
              fontFamily: "Yantramanav",
              fontSize: "100%",
              color: "#00101F",
              textDecoration: "none",
            }}
          >
            Pregledaj zahtjeve
          </Link>
        </div>
        <div>
          <IconButton
            size="large"
            sx={{ boxShadow: 5 }}
            style={{ backgroundColor: "white" }}
            onClick={() => openForum()}
          >
            <ForumIcon style={{ color: "#00101F" }} />
          </IconButton>
          <Link
            style={{
              paddingLeft: 20,
              fontFamily: "Yantramanav",
              fontSize: "100%",
              color: "#00101F",
              textDecoration: "none",
            }}
            to="/forum-list"
          >
            Forum
          </Link>
        </div>
        <div>
          <IconButton
            size="large"
            sx={{ boxShadow: 5 }}
            style={{ backgroundColor: "white" }}
          >
            <LiveHelpIcon style={{ color: "#00101F" }} />
          </IconButton>
          <Link
            to="/manual-list"
            style={{
              paddingLeft: 20,
              fontFamily: "Yantramanav",
              fontSize: "100%",
              color: "#00101F",
              textDecoration: "none",
            }}
          >
            Pomoć
          </Link>
        </div>
      </Stack>
    </div>
  );
}

export default Menu;
