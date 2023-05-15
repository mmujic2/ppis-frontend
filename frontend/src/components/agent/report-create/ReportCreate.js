import React, { useEffect, useState } from 'react'
import Header from '../../shared/header';
import UnauthorizedAccess from '../../shared/UnauthorizedAccess';
import { Container, Box, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, FormControlLabel, Checkbox, TextField, Button, MobileStepper, Typography } from '@mui/material';
import authService from '../../../util/auth.service';
import { Textarea } from '@mui/joy';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useLocation, useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import { useTheme } from '@emotion/react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import api from '../../../util/api'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function ReportCreate() {
    const navigate = useNavigate();
    const location = useLocation()
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [reportData, setReportData] = useState({ slaBreached: false })
    const [ticket, setTicket] = useState()
    const [deptError,setDeptError] = useState(false)
    const [durationError,setDurationError] = useState(false)
    const [toast, setToast] = useState({
        open: false,
        vertical: "top",
        horizontal: "right",
      });
      const { vertical, horizontal, open } = toast;
    
      const handleClose = () => {
        setToast({ ...toast, open: false });
      };

    var mounted = false;

    const priority = () => {
        switch (ticket.priorityLevel) {
            case "LOW":
                return (
                    "Nizak prioritet"
                )
                break;
            case "MEDIUM":
                return (
                    "Srednji prioritet"
                )
                break;
            case "HIGH":
                return (
                    "Visok prioritet"
                )
                break;
            case "URGENT":
                return (
                    "Urgentno"
                )
                break;
        }
    }


    useEffect(() => {
        if (!mounted) {
            mounted = true
            setTicket(location.state)
        }
    }, [])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (event) => {

        if (event.target.name == "slaBreached") {

            setReportData({
                ...reportData,
                [event.target.name]: event.target.checked,
            })

            return
        }
        setReportData({
            ...reportData,
            [event.target.name]: event.target.value,
        })

    }

    const handleSubmit = () => {
        let err = false
        if (reportData.department == undefined || reportData.department.trim().length==0) {
            setDeptError(true);
            err = true
          }

          if (reportData.duration == undefined || reportData.duration.trim().length==0) {
            setDurationError(true);
            err = true
          }
          
          if (err) {
            setToast({ ...toast, open: true });
            return;
          }

        var report = {}
        report.department = reportData.department
        report.duration = reportData.duration
        report.description = reportData.description
        report.slaBreached = reportData.slaBreached
        report.businessImpact = reportData.businessImpact
        report.correctiveActions = reportData.correctiveActions
        report.tag = ticket.tag
        report.dateTimeRequested = ticket.date
        report.code = ticket.code
        report.priorityLevel = ticket.priorityLevel
        report.raisedById = ticket.createdBy.id
        console.log(report)

        document.body.style.cursor = "wait";

        api.post("/report/add",report).then((res)=> {
            document.body.style.cursor = "default";
            if(res.status==200) {
                navigate("/report?id=" +res.data.id,{state:res.data})
            }
        })
    }

    const user = authService.getCurrentUser();
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
            <Header></Header>
            {user.role == "sd_user" ? <UnauthorizedAccess></UnauthorizedAccess> :
                ticket ? <Container
                    style={{ backgroundColor: "#F5F5F5", width: "80%", padding: 0 }}
                >
                    <Box sx={{ width: "100%", backgroundColor: "#00101F" }}>
                        <h2
                            style={{
                                color: "white",
                                fontFamily: "Yantramanav",
                                padding: 5,
                                paddingLeft: 10
                            }}
                        >Izvještaj</h2>
                    </Box>
                    <Container
                        sx={{ padding: 0 }}
                    >
                        <Grid container direction="row" spacing={2} >
                            {activeStep === 0 && (
                                <>
                                    <Grid item style={{ textAlign: "center", padding: 0, marginTop: 15 }} xs={12}>
                                        <div style={{ backgroundColor: "#E4E4E4", borderRadius: "5px", width: "100%", padding: "10px", margin: 0 }}>
                                            <h5 style={{ textAlign: "start", margin: "0px 0px 10px 0px", fontFamily: "Yantramanav", color: "#00101f" }}>Opći podaci o izvještaju</h5>
                                            <Grid container spacing={2} sx={{ width: "100%", textAlign: "center" }}>
                                                <Grid item xs={6}>
                                                    <FormControl style={{ width: "100%" }}>
                                                        <FormLabel id="demo-simple-select-label" style={{ textAlign: "start" }}>
                                                            {ticket.tag == "INCIDENT" ? "Incident prijavio/la" : "Zahtjev podnio/la"}
                                                        </FormLabel>
                                                        <TextField InputProps={{
                                                            readOnly: true,

                                                        }} value={ticket.createdBy.firstname + " " + ticket.createdBy.lastname}></TextField>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl style={{ width: "100%" }}>
                                                        <FormLabel id="demo-simple-select-label" style={{ textAlign: "start" }}>
                                                            {ticket.tag == "INCIDENT" ? "Incident razriješio/la" : "Zahtjev ispunio/la"}
                                                        </FormLabel>
                                                        <TextField InputProps={{
                                                            readOnly: true,
                                                        }} value={ticket.assignedTo.firstname + " " + ticket.assignedTo.lastname}></TextField>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl style={{ width: "100%" }}>
                                                        <FormLabel id="demo-simple-select-label" style={{ textAlign: "start" }}>
                                                            {ticket.tag == "INCIDENT" ? "Vrijeme prijave incidenta" : "Vrijeme podnošenja zahtjeva"}
                                                        </FormLabel>
                                                        <TextField InputProps={{
                                                            readOnly: true,
                                                        }} value={dateFormat(ticket.date, "dd/mm/yyyy HH:MM ")}></TextField>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl style={{ width: "100%" }}>
                                                        <FormLabel required id="demo-simple-select-label" style={{ textAlign: "start" }}>
                                                            Zahvaćena usluga
                                                        </FormLabel>
                                                        <TextField error={deptError} required style={{ backgroundColor: "white" }} name="department" value={reportData.department} onChange={handleChange}></TextField>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item style={{ textAlign: "center", marginTop: 15, padding: 0 }} xs={12}>
                                        <div style={{ backgroundColor: "#E4E4E4", borderRadius: "5px", width: "100%", padding: "10px", margin: 0 }}>
                                            <h5 style={{ textAlign: "start", margin: "0px 0px 10px 0px", fontFamily: "Yantramanav", color: "#00101f" }}>Detaljne informacije</h5>
                                            <Grid container spacing={2} sx={{ width: "100%", textAlign: "center" }}>
                                                <Grid item xs={7}>
                                                    <FormControl style={{ width: "100%" }}>
                                                        <FormLabel id="demo-simple-select-label" style={{ textAlign: "start" }}>
                                                            Šifra izvještaja
                                                        </FormLabel>
                                                        <TextField InputProps={{
                                                            readOnly: true,
                                                        }} value={ticket.code}></TextField>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <FormControl style={{ width: "100%" }}>
                                                        <FormLabel id="demo-simple-select-label" style={{ textAlign: "start" }}>
                                                            Prioritet
                                                        </FormLabel>
                                                        <TextField InputProps={{
                                                            readOnly: true,
                                                        }} value={priority()}></TextField>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={7}>
                                                    <FormControl style={{ width: "100%" }}>
                                                        <FormLabel style={{ textAlign: "start" }} required>
                                                            Trajanje
                                                        </FormLabel>
                                                        <TextField required
                                                            error = {durationError}
                                                            value={reportData.duration}
                                                            onChange={handleChange}
                                                            name="duration"
                                                            type="number"
                                                            min
                                                            InputProps={{ inputProps: { min: 0 } }}
                                                            sx={{ backgroundColor: "white" }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={5} sx={{ paddingRight: 22 }}>
                                                    <FormControl style={{ width: "100%", textAlign: "start" }}>
                                                        <FormControlLabel
                                                            value="start"
                                                            control={<Checkbox />}
                                                            label="Da li je SLA prekršen?"
                                                            sx={{ color: "grey", paddingTop: 4 }}
                                                            labelPlacement="start"
                                                            name="slaBreached"
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>


                                </>
                            )}
                            {activeStep === 1 && (
                                <>
                                    <Grid item style={{ textAlign: "center", padding: 0, marginTop: 15 }} xs={12}>
                                        <div style={{ backgroundColor: "#E4E4E4", borderRadius: "5px", width: "100%", padding: "10px", margin: 0 }}>
                                            <h5 style={{ textAlign: "start", margin: "0px 0px 10px 0px", fontFamily: "Yantramanav", color: "#00101f" }}>Opis {ticket.tag == "INCIDENT" ? "incidenta" : "zahtjeva"}</h5>

                                            <Grid item xs={12}>
                                                <FormControl
                                                    required
                                                    style={{ width: "100%" }}
                                                >
                                                    <Textarea
                                                        value={reportData.description ? reportData.description : ""}
                                                        name="description"
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                        }}
                                                        minRows={8}
                                                        style={{ width: "100%" }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </div>


                                    </Grid>
                                    <Grid item style={{ textAlign: "center", padding: 0, marginTop: 15 }} xs={12}>
                                        <div style={{ backgroundColor: "#E4E4E4", borderRadius: "5px", width: "100%", padding: "10px", margin: 0 }}>
                                            <h5 style={{ textAlign: "start", margin: "0px 0px 10px 0px", fontFamily: "Yantramanav", color: "#00101f" }}>Poslovni utjecaj</h5>

                                            <Grid item xs={12}>
                                                <FormControl
                                                    required
                                                    style={{ width: "100%" }}
                                                >
                                                    <Textarea
                                                        value={reportData.businessImpact ? reportData.businessImpact : ""}
                                                        name="businessImpact"
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                        }}
                                                        minRows={8}
                                                        style={{ width: "100%" }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </div>


                                    </Grid>
                                    <Grid item style={{ textAlign: "center", padding: 0, marginTop: 15 }} xs={12}>
                                        <div style={{ backgroundColor: "#E4E4E4", borderRadius: "5px", width: "100%", padding: "10px", margin: 0 }}>
                                            <h5 style={{ textAlign: "start", margin: "0px 0px 10px 0px", fontFamily: "Yantramanav", color: "#00101f" }}>Korektivne akcije</h5>

                                            <Grid item xs={12}>
                                                <FormControl
                                                    required
                                                    style={{ width: "100%" }}
                                                >
                                                    <Textarea
                                                        value={reportData.correctiveActions ? reportData.correctiveActions : ""}
                                                        name="correctiveActions"
                                                        onChange={(event) => {
                                                            handleChange(event);
                                                        }}
                                                        minRows={8}
                                                        style={{ width: "100%" }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </div>


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
                            } />
                    </Container>
                </Container> : <></>}
        </div>
    )
}

export default ReportCreate