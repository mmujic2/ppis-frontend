import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from "../../../util/api"
import Header from '../../shared/header';
import logo from '../../../images/logo_blue.png'
import Icon from '@material-ui/core/Icon';
import { Container } from '@mui/material';
import dateFormat from 'dateformat';
import {Breadcrumbs,Button} from '@mui/material';
import {Stack,Typography} from '@mui/material';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Backdrop from "@mui/material/Backdrop";
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from "@mui/material/CircularProgress";
import jsPDF from 'jspdf';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

function ReportOverview() {
  const [report, setReport] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const navigate = useNavigate();
  
  

  const breadcrumbs = [
    <Link underline="hover" key="1" color="#00101f" href="/" onClick={(e)=>{e.preventDefault(); navigate("/report-list")}}>
      Izvještaji
    </Link>,
    <Typography key="3" color="text.primary">
      ITIL izvještaj
    </Typography>,
  ];

  var mounted = false;
  useEffect(() => {
    if (!mounted && location.state && id === location.state.id) {
      mounted = true;
      setReport(location.state);
    } else if (!mounted) {
      mounted = true;
      if (id != null) {
        api.get("/report/" + id).then((res) => {
          setReport(res.data);
        });
      }
    }
  }, []);


    const printDocument = () =>{
      const input = document.getElementById('divToPrint');
      html2canvas(input)
        .then((canvas) => {
          let imgWidth = 208;
          let imgHeight = canvas.height * imgWidth / canvas.width;
          const imgData = canvas.toDataURL('img/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          // pdf.output('dataurlnewwindow');
          pdf.save("izvjestaj.pdf");
        })
      
    }
  
 

  return (
    <>
      <Header></Header>
      <div style={{marginLeft:"30px",width:"1200px", marginTop:"30px",display:"flex",justifyContent:"space-between"}}>
      <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon style={{color:"#00101f"}} fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      </Stack>
      <Button
                  startIcon={<DownloadIcon style={{color:"white"}} />}
                  style={{
                    backgroundColor: "#00101F",
                    padding: "5px 10px 5px 10px",
                    textTransform: "none",
                    fontFamily: "Yantramanav",
                    fontSize: "16px",
                    color: "white",
                  }}
                  onClick={printDocument}
                >
                  Preuzmi
        </Button>
        </div>
      <div>
        {report ?
          <>
            <Container id="divToPrint" style={{ width: "1300px", backgroundColor: "white", textAlign: "center", padding: 10, marginTop: "10px" }} >
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "100px", height: "50px", backgroundColor: "white", textAlign: "center", border: "thin solid grey", padding: "2px" }}><Icon >
                  <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
                </Icon></div>
                <div style={{
                  width: "600px",
                  height: "50px",
                  backgroundColor: "white",
                  textAlign: "center",
                  border: "thin solid grey",
                  fontFamily: "Yantramanav",
                  fontWeight: "bold",
                  display: "inline",
                  padding: "2px"
                }}><div style={{ marginTop: "15px" }}>Međunarodni aerodrom Sarajevo</div></div>

                <div style={{
                  width: "600px",
                  fontFamily: "Yantramanav",
                  fontWeight: "bold",
                  height: "50px",
                  backgroundColor: "white",
                  textAlign: "center",
                  border: "thin solid grey",
                  padding: "2px"
                }}><div style={{ marginTop: "15px" }}>Kurta Schorka 36, Sarajevo 71000</div></div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{
                  border: "thin solid grey", fontFamily: "Yantramanav",
                  fontWeight: "bold",
                  height: "40px",
                  backgroundColor: "#A9A9A9",
                  textAlign: "center",
                  border: "thin solid grey",
                  padding: "2px",
                  color: "white",

                }}>
                  <h2 style={{ marginTop: "5px" }}>ITIL Izvještaj</h2>
                </div>
              </div>
              <div style={{ marginTop: "10px", width: "100%" }}>
                <div style={{
                  border: "thin solid grey", fontFamily: "Yantramanav",
                  fontWeight: "bold",
                  height: "40px",
                  backgroundColor: "#D3D3D3",
                  textAlign: "center",
                  border: "thin solid black",
                  padding: "2px"
                }}>
                  <div style={{ marginTop: "10px" }}>Opšte informacije</div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      {report.tag == "INCIDENT" ? <strong>Incident prijavio/la: </strong> : <strong>Zahtjev za uslugom podnio/la: </strong>}
                      {report.raisedBy.firstname + " " + report.raisedBy.lastname}
                    </div>
                  </div>


                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      {report.tag == "INCIDENT" ? <strong>Incident riješio/la: </strong> : <strong>Zahtjev za uslugom ispunio/la: </strong>}
                      {report.resolvedBy.firstname + " " + report.resolvedBy.lastname}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      <strong>Datum izvještaja: </strong>{dateFormat(report.reportDate, 'dd/mm/yyyy')}
                    </div>
                  </div>


                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      <strong>Zahvaćena usluga: </strong>{report.department}
                    </div>
                  </div>
                </div>


              </div>
              <div style={{ marginTop: "10px", width: "100%" }}>
                <div style={{
                  border: "thin solid grey", fontFamily: "Yantramanav",
                  fontWeight: "bold",
                  height: "40px",
                  backgroundColor: "#D3D3D3",
                  textAlign: "center",
                  border: "thin solid black",
                  padding: "2px"
                }}>
                  <div style={{ marginTop: "10px" }}>Detaljne informacije</div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      {report.tag == "INCIDENT" ? <strong>Datum nastanka incidenta: </strong> : <strong>Datum podnošenja zahtjeva: </strong>}
                      {dateFormat(report.dateTimeRequested, 'dd/mm/yyyy')}
                    </div>
                  </div>


                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      {report.tag == "INCIDENT" ? <strong>Vrijeme nastanka incidenta: </strong> : <strong>Vrijeme podnošenja zahtjeva: </strong>}
                      {dateFormat(report.dateTimeRequested, 'HH:MM') + ' h'}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      <strong>Šifra: </strong>{report.code}
                    </div>
                  </div>


                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      <strong>Nivo prioriteta: </strong>{report.priorityLevel == "LOW" ? "Nizak" : report.priorityLevel == "MEDIUM" ? "Srednji" : report.priorityLevel == "HIGH" ? "Visok" : "Urgentno"}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                      <strong>SLA prekršen? </strong>{report.slaBreached? "DA" : "NE"}
                    </div>
                  </div>


                  <div style={{
                    width: "50%",
                    fontFamily: "Yantramanav",
                    height: "50px",
                    backgroundColor: "white",
                    textAlign: "start",
                    border: "thin solid grey",
                    padding: "5px"
                  }}>
                    <div style={{ marginTop: "15px" }}>
                     {report.tag=="INCIDENT"?<strong>Trajanje prekida: </strong> : <strong>Trajanje obrade zahtjeva: </strong>}
                     {report.duration + ' sati'}
                    </div>
                  </div>
                </div>


              </div>
              <div style={{ marginTop: "10px", width: "100%" }}>
                <div style={{
                  border: "thin solid grey", fontFamily: "Yantramanav",
                  fontWeight: "bold",
                  height: "40px",
                  backgroundColor: "#D3D3D3",
                  textAlign: "center",
                  border: "thin solid black",
                  padding: "2px"
                }}>
                  <div style={{ marginTop: "10px" }}>{report.tag=="INCIDENT" ? "Opis incidenta" : "Opis zahtjeva za uslugom"}</div>
                </div>
                <div style={{
                    fontFamily: "Yantramanav",
                    height: "auto",
                    backgroundColor: "white",
                    textAlign: "justify",
                    border: "thin solid grey",
                    padding: "10px"
                  }}>
                    {report.description}
                  </div>
                
              </div>
              <div style={{ marginTop: "10px", width: "100%" }}>
                <div style={{
                  border: "thin solid grey", fontFamily: "Yantramanav",
                  fontWeight: "bold",
                  height: "40px",
                  backgroundColor: "#D3D3D3",
                  textAlign: "center",
                  border: "thin solid black",
                  padding: "2px"
                }}>
                  <div style={{ marginTop: "10px" }}>Poslovni utjecaj</div>
                </div>
                <div style={{
                    fontFamily: "Yantramanav",
                    height: "auto",
                    backgroundColor: "white",
                    textAlign: "justify",
                    border: "thin solid grey",
                    padding: "10px"
                  }}>
                    {report.businessImpact}
                  </div>
                  <div style={{ marginTop: "10px", width: "100%" }}>
                <div style={{
                  border: "thin solid grey", fontFamily: "Yantramanav",
                  fontWeight: "bold",
                  height: "40px",
                  backgroundColor: "#D3D3D3",
                  textAlign: "center",
                  border: "thin solid black",
                  padding: "2px"
                }}>
                  <div style={{ marginTop: "10px" }}>Korektivne akcije</div>
                </div>
                <div style={{
                    fontFamily: "Yantramanav",
                    height: "auto",
                    backgroundColor: "white",
                    textAlign: "justify",
                    border: "thin solid grey",
                    padding: "10px"
                  }}>
                    {report.correctiveActions}
                  </div>
                </div>
              </div>
            </Container>
          </>

          : <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>}</div>
    </>
  )
}

export default ReportOverview