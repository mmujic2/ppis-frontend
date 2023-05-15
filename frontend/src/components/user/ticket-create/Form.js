import React from "react";
import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormLabel,
  Tooltip,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Textarea from "@mui/joy/Textarea";
import InfoIcon from "@mui/icons-material/Info";
import ReportIcon from "@mui/icons-material/Report";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import api from "../../../util/api";
import { useTheme } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../util/auth.service";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Form = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const title =
    searchParams.get("tag") == "req"
      ? "Zahtjev za uslugom"
      : "Prijava problema";
  const tag = searchParams.get("tag") == "req" ? "REQUEST" : "INCIDENT";
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ priorityLevel: "LOW" });
  const [categoryError, setCategoryError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = toast;

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    switch (event.target.name) {
      case "category":
        setCategoryError(false);
        break;
      case "title":
        if (event.target.value.trim().length > 0) setTitleError(false);
        else setTitleError(true);
        break;
      case "description":
        if (event.target.value.trim().length > 0) setDescriptionError(false);
        else setDescriptionError(true);
        break;
    }
  };

  const handleSubmit = () => {
    let err = false
    if (formData.category == undefined) {
      setCategoryError(true);
      err=true
    }

    if (formData.title == undefined) {
      setTitleError(true);
      err=true
    }

    if (formData.description == undefined) {
      setDescriptionError(true);
      err=true
    }

    if (err) {
      setToast({ ...toast, open: true });
      return;
    }

    formData.tag = tag;
    formData.userId = authService.getCurrentUser().id;

    document.body.style.cursor = "wait";

    api.post("/ticket/create", formData).then((res) => {
      document.body.style.cursor = "default";
      navigate("/ticket?id=" + res.data.id, { state: res.data });
    });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error">
          Unesite vrijednosti u sva obavezna polja!
        </Alert>
      </Snackbar>
      <Container
        sx={{ mt: 2 }}
        style={{ backgroundColor: "#F5F5F5", padding: 30, width: "80%" }}
      >
        <Typography variant="h5" style={{ color: "#00101F" }}>
          {title}
        </Typography>
        <hr
          style={{
            color: "#00101F",
            backgroundColor: "#00101F",
            borderColor: "#00101F",
            height: "1px",
            flex: "1px",
            marginBottom: 20,
          }}
        />
        <Grid container direction="row" spacing={2}>
          {activeStep === 0 && (
            <>
              <Grid item xs={12}>
                <div>
                  <FormControl required style={{ width: "60%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Kategorija
                    </InputLabel>
                    <Select
                      style={{ backgroundColor: "white" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Kategorija"
                      name="category"
                      value={formData.category ? formData.category : ""}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      error={categoryError}
                    >
                      <MenuItem value={"HARDWARE"}>Hardver</MenuItem>
                      <MenuItem value={"SOFTWARE"}>Softver</MenuItem>
                      <MenuItem value={"NETWORK"}>Mreža</MenuItem>
                      <MenuItem value={"OTHER"}>Ostalo</MenuItem>
                    </Select>
                  </FormControl>
                  <Tooltip title="Odaberite kategoriju koja najpreciznije opisuje Vaš zahtjev.">
                    <InfoIcon
                      style={{
                        marginTop: 15,
                        marginLeft: 20,
                        color: "#00101F",
                      }}
                    />
                  </Tooltip>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <FormControl required style={{ width: "60%" }}>
                    <TextField
                      required
                      error={titleError}
                      style={{ backgroundColor: "white" }}
                      value={formData.title ? formData.title : ""}
                      name="title"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      label="Naslov"
                    ></TextField>
                  </FormControl>
                  <Tooltip title="Unesite kratak i precizan opis zahtjeva.">
                    <InfoIcon
                      style={{
                        marginTop: 15,
                        marginLeft: 20,
                        color: "#00101F",
                      }}
                    />
                  </Tooltip>
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  required
                  style={{ width: "100%" }}
                  error={descriptionError}
                >
                  <FormLabel>Detaljan opis</FormLabel>
                  <Textarea
                    value={formData.description ? formData.description : ""}
                    name="description"
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    minRows={8}
                    style={{ width: "100%" }}
                  />
                </FormControl>
              </Grid>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ color: "#00101F", fontWeight: "600" }}
                  >
                    Nivo prioriteta
                  </FormLabel>

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="LOW"
                    name="priorityLevel"
                    onChange={handleChange}
                    value={formData.priorityLevel}
                  >
                    <div style={{ height: "fit-content" }}>
                      <FormControlLabel
                        style={{ color: "#00101F" }}
                        value="LOW"
                        control={<Radio style={{ color: "#00101F" }} />}
                        label="Nizak"
                      />
                      <Tooltip title="Nizak nivo - minoran utjecaj na sistem.">
                        <ReportIcon
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "30px",
                            color: "#2e7d32",
                          }}
                        ></ReportIcon>
                      </Tooltip>
                    </div>
                    <div style={{ height: "fit-content" }}>
                      <FormControlLabel
                        style={{ color: "#00101F" }}
                        value="MEDIUM"
                        control={<Radio style={{ color: "#00101F" }} />}
                        label="Srednji"
                      />
                      <Tooltip title="Srednji nivo - većina sistema i dalje normalno funkcionira.">
                        <ReportIcon
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "20px",
                            color: "#ffc400",
                          }}
                        ></ReportIcon>
                      </Tooltip>
                    </div>
                    <div style={{ height: "fit-content" }}>
                      <FormControlLabel
                        style={{ color: "#00101F" }}
                        value="HIGH"
                        control={<Radio style={{ color: "#00101F" }} />}
                        label="Visok"
                      />
                      <Tooltip title="Visok nivo - funkcionalnosti sistema su ozbiljno narušene.">
                        <ReportIcon
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "32px",
                            color: "#ed6c02",
                          }}
                        ></ReportIcon>
                      </Tooltip>
                    </div>
                    <div style={{ height: "fit-content" }}>
                      <FormControlLabel
                        style={{ color: "#00101F" }}
                        value="URGENT"
                        control={<Radio style={{ color: "#00101F" }} />}
                        label="Urgentno"
                      />
                      <Tooltip title="Urgentno -  kompletan sistem ili važna funkcionalnost je pogođena.">
                        <ReportIcon
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "5px",
                            color: "#c62828",
                          }}
                        ></ReportIcon>
                      </Tooltip>
                    </div>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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
                  Spremi
                </Button>
              </Grid>
            </>
          )}
        </Grid>
        <MobileStepper
          sx={{ backgroundColor: "#F5F5F5" }}
          variant="text"
          steps={2}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              sx={{ color: "#00101F" }}
              size="small"
              onClick={handleNext}
              disabled={activeStep === 2 - 1}
            >
              Nastavi
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              sx={{ color: "#00101F" }}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Nazad
            </Button>
          }
        />
      </Container>
    </div>
  );
};

export default Form;
