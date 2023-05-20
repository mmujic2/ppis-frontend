import React, { useState } from "react";
import Header from "../../shared/header";
import { useEffect } from "react";
import api from "../../../util/api";
import { Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { makeStyles } from "@material-ui/core";
import Ticket from "./Ticket";
import Backdrop from "@mui/material/Backdrop";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { RefreshRounded } from "@mui/icons-material";
import {
  Grid,
  IconButton,
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
import { right } from "@popperjs/core";

function TicketList() {
  const [assignedTickets, setAssignedTickets] = useState();
  const [openTickets, setOpenTickets] = useState();
  const [closedTickets, setClosedTickets] = useState();
  const [displayedData, setDisplayedData] = useState();

  const [categoryError, setCategoryError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);
  const [formData, setFormData] = useState({});
  const [sortData, setSortData] = useState({
    icon: <ArrowUpwardIcon />,
    up: true,
  });
  const [loading,setLoading] = useState(false)

  const [filterData, setFilterData] = useState({
    priorityLevel: null,
    category: null,
    ticketType: null,
    userEmail: null,
    tag:null,
    sorting: "descending",
  });

  const [valueTab, setValueTab] = React.useState("1");
  const [backgroundColorTab, setBackgroundColorTab] = useState([
    "#F5F5F5",
    "#00101F",
    "#00101F",
  ]);

  const classes = useStyles();

  const handleFilter = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    console.log(valueTab)
    switch (valueTab) {
      case "1":
        filterData.ticketType = "assigned";
        break;
      case "2":
        filterData.ticketType = "open";
        break;
      case "3":
        filterData.ticketType = "closed";
        break;
    }

    switch (event.target.name) {
      case "category":
        setCategoryError(false);
        filterData.category = event.target.value;
        break;
      case "priorityLevel":
        setPriorityError(false);
        filterData.priorityLevel = event.target.value;
        break;
      case "tag":
        filterData.tag = event.target.value;
        break;
      case "sorting":
        console.log("sortchange");

        if (sortData.up === true) {
          setSortData({icon:<ArrowDownwardIcon />,up : false})
          setFilterData({...filterData,sorting : "descending"});
        } else {
          setSortData({icon:<ArrowUpwardIcon />,up : true})
          setFilterData({...filterData,sorting : "ascending"});
        }

        break;
    }

    if (filterData.ticketType != null) {
     reloadData()
    }
  };

  const handleChange = (event, newValue) => {
    let type=""
    switch(newValue) {
     case "1":
        setDisplayedData(assignedTickets)
        type="assigned"
        break;
      
      case "2":
        setDisplayedData(openTickets)
        type="open"
        break;
      case "3":
        setDisplayedData(closedTickets)
        type="closed"
        break;
    }

    setFormData({...formData,category:null,priorityLevel:null,tag:null})
    setFilterData({...filterData,ticketType:type,category:null,priorityLevel:null,tag:null})
    setSortData({up:true})

    const newBackgroundColor = backgroundColorTab.map((c, i) => {
      if (i == valueTab - 1) return "#00101F";
      else if (i == newValue - 1) return "#F5F5F5";
      else return c;
    });
    setBackgroundColorTab(newBackgroundColor);
    setValueTab(newValue);
  };

  var mounted=false;
  useEffect(() => {
    if(!mounted) {
      mounted=true;
    api.get("/ticket/agentassigned").then((res) => {
      setAssignedTickets(res.data);
      setDisplayedData(res.data);
    });
    api.get("/ticket/agentopen").then((res) => {
      setOpenTickets(res.data);
    });
    api.get("/ticket/agentclosed").then((res) => {
      setClosedTickets(res.data);
    });
  }
  }, []);

  const reloadData = () =>{
    setLoading(true)
    api.post("/ticket/agentfilter", filterData).then((res) => {
      setDisplayedData(res.data);
      setLoading(false)
    });
  }

  return (
    <>
      <Header></Header>
      <Container
        sx={{ mt: 2 }}
        style={{ backgroundColor: "#F5F5F5", padding: 0, width: "80%" }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={valueTab} >
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                classes={{ indicator: classes.customStyleOnActiveTab }}
                sx={{ backgroundColor: "#00101F" }}
                indicatorColor={""}
              >
                <Tab
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: backgroundColorTab[0],
                    fontFamily: "Yantramanav",
                  }}
                  indicatorColor={""}
                  label={
                    <span
                      className={
                        valueTab == 1
                          ? classes.activeTab
                          : classes.customStyleOnTab
                      }
                    >
                      Preuzeti aktivni zahtjevi
                    </span>
                  }
                  value="1"
                />
                <Tab
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: backgroundColorTab[1],
                    fontFamily: "Yantramanav",
                  }}
                  label={
                    <span
                      className={
                        valueTab == 2
                          ? classes.activeTab
                          : classes.customStyleOnTab
                      }
                    >
                      Otvoreni zahtjevi
                    </span>
                  }
                  value="2"
                />
                <Tab
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: backgroundColorTab[2],
                    fontFamily: "Yantramanav",
                  }}
                  label={
                    <span
                      className={
                        valueTab == 3
                          ? classes.activeTab
                          : classes.customStyleOnTab
                      }
                    >
                      Obrađeni zahtjevi
                    </span>
                  }
                  value="3"
                />
              </TabList>
            </Box>
            <Grid item xs={12}>
              <div>
               <Button
               style={{
                height: "fit-content",
                marginTop: 25,
                marginLeft: 80,
                color:"#00101f"
              }}
              onClick={reloadData}
               ><RefreshRounded></RefreshRounded></Button>
              <FormControl
                  style={{
                    width: "20%",
                    height: "fit-content",
                    marginTop: 15,
                    marginLeft: 10,
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Vrsta
                  </InputLabel>
                  <Select
                    style={{ backgroundColor: "white" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Vrsta"
                    name="tag"
                    value={formData.tag ? formData.tag : ""}
                    onChange={(event) => {
                      handleFilter(event);
                    }}
                    error={categoryError}
                  >
                    <MenuItem value={"INCIDENT"}>Incident</MenuItem>
                    <MenuItem value={"REQUEST"}>Zahtjev za uslugom</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  style={{
                    width: "20%",
                    height: "fit-content",
                    marginTop: 15,
                    marginLeft: 20
                  }}
                >
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
                      handleFilter(event);
                    }}
                    error={categoryError}
                  >
                    <MenuItem value={"HARDWARE"}>Hardver</MenuItem>
                    <MenuItem value={"SOFTWARE"}>Softver</MenuItem>
                    <MenuItem value={"NETWORK"}>Mreža</MenuItem>
                    <MenuItem value={"OTHER"}>Ostalo</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  style={{ width: "20%", marginTop: 15, marginLeft: 20 }}
                >
                  <InputLabel id="demo-simple-select-label1">
                    Prioritet
                  </InputLabel>
                  <Select
                    style={{ backgroundColor: "white" }}
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select2"
                    label="Prioritet"
                    name="priorityLevel"
                    value={formData.priorityLevel ? formData.priorityLevel : ""}
                    onChange={(event) => {
                      handleFilter(event);
                    }}
                    error={priorityError}
                  >
                    <MenuItem value={"LOW"}>Nizak</MenuItem>
                    <MenuItem value={"MEDIUM"}>Srednji</MenuItem>
                    <MenuItem value={"HIGH"}>Visok</MenuItem>
                    <MenuItem value={"URGENT"}>Urgentni</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  name="sorting"
                  value={filterData.sorting}
                  variant="sort"
                  startIcon={sortData.up? <ArrowUpwardIcon></ArrowUpwardIcon> : <ArrowDownwardIcon></ArrowDownwardIcon>}
                  style={{ float: right, marginTop: 30, marginRight: 70 }}
                  onClick={handleFilter}
                >
                  Datum
                </Button>
              </div>
            </Grid>

            <TabPanel value="1">
              {displayedData != null && loading!=true ? (
                <Ticket ticket={displayedData}></Ticket>
              ) : (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </TabPanel>
            <TabPanel value="2">
            {displayedData != null && loading!=true ? (
                <Ticket ticket={displayedData}></Ticket>
              ) : (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </TabPanel>
            <TabPanel value="3">
            {displayedData != null && loading!=true ? (
                <Ticket ticket={displayedData}></Ticket>
              ) : (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
}

const useStyles = makeStyles({
  customStyleOnTab: {
    fontSize: "1em",
    color: "white",
    fontWeight: "500",
  },
  customStyleOnActiveTab: {
    color: "black",
    backgroundColor: "#F5F5F5",
  },
  activeTab: {
    fontSize: "1em",
    fontWeight: "600",
    color: "black",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    border: "none",
  },
});

export default TicketList;
