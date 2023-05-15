import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TicketCard from "../../user/ticket-list/TicketCard";
import Ticket from "../../user/ticket-list/Ticket";
import InfoIcon from "@mui/icons-material/Info";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import api from "../../../util/api";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormLabel,
  Tooltip,
  Container,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#D9D9D9" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: "#D9D9D9",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TicketForwardModal({ open, setOpen, ticketid }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState(2);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [assignedTo, setAssignedTo] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = () => {
    api
      .post("/ticket/assign/department/" + ticketid + "/" + category)
      .then((res) => {
        //Dodaj da vraca 404 ako nema agenata u odjelu, pa izbaci alert kao i ranije
        //Takodjer stavi da ti BE vraca 400 ako je u medjuvremenu, dok je stigao zahtjev
        //ticket presao u status koji NIJE ASSIGNED (npr. user je u medjuvremenu potvrdio rjesenje)
        //i u tom slucaju se ne treba proslijediti zahtjev
        //Na frontu u ovom slucaju (400) prikazi error alert i onda refresh stranicu da se ponovo
        //nabave svjezi podaci o ticketu i prikazu
        console.log(res);
        if (res.status == 400 || res.status == 404) {
          setSeverity("error");
          if (res.status == 404) {
            setAlert(true);
            setAlertMessage("U odabranom odjelu nema dostupnih agenata!");
          } else {
            setAlertMessage("Nije moguće proslijediti zahtjev!");
            setAlert(true);
            window.location.reload(false);
          }
        } else {
          setAssignedTo(res.data.assignedTo);
          console.log(assignedTo);

          //Ovdje sam izmijenila da se salje res.data.id, a ne da uzima iz state
          //iz razloga sto update state-a nije instantan
          //ali ti ces svakako ovo promijeniti da se salje jedan zahtjev tako da nije toliko ni bitno
          // samo stavi kad ti taj zahtjev vrati res koji ce biti agent kom je proslijedjen zahtjev
          // da se iz tog res-a uzimaju podaci kad se salje zahtjev za komentar (ispod imas objasnjenje)

          setSeverity("success");
          setAlertMessage(
            "Zahtjev je uspješno proslijeđen agentu: " +
              res.data.assignedTo.firstname +
              " " +
              res.data.assignedTo.lastname +
              "."
          );
          setAlert(true);
          setTimeout(() => {
            navigate("/ticket-list");
          }, 3000);

          api.post("/ticket-comment/create", {
            ticketId: ticketid,
            comment:
              "Zahtjev proslijeđen " +
              res.data.firstname +
              " " +
              res.data.lastname,
          });
        }
      });
  };

  const handleCloseAlert = () => {
    setAlert(false);
  };
  return (
    <div>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleCloseAlert}
      >
        <Alert sx={{ width: "100%" }} severity={severity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"xs"}
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Proslijedi zahtjev
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          style={{ margin: 0, padding: 10, backgroundColor: "#D9D9D9" }}
        >
          <Container maxWidth="sm">
            <FormControl style={{ width: "80%" }}>
              <InputLabel id="demo-simple-select-label">Odjel</InputLabel>
              <Select
                style={{ backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Odjel"
                name="category"
                value={category}
                onChange={(event) => {
                  handleCategoryChange(event);
                }}
              >
                <MenuItem value={2}>IT Sigurnost</MenuItem>
                <MenuItem value={3}>Mreža</MenuItem>
                <MenuItem value={4}>IT Administracija</MenuItem>
                <MenuItem value={5}>IT Nabavke</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Odaberite odjel kojem treba preusmjeriti zahtjev.">
              <InfoIcon
                style={{
                  marginTop: 15,
                  marginLeft: 20,
                  color: "#00101F",
                }}
              />
            </Tooltip>
            <Button
              style={{
                backgroundColor: "#00101F",
                marginTop: "20px",
                padding: "5px 20px 5px 20px",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWight: "500",
                fontSize: "18px",
                color: "white",
                float: "right",
              }}
              sx={{ marginLeft: 8 }}
              onClick={handleSubmit}
            >
              Spremi
            </Button>
          </Container>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
