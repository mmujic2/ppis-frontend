import React from 'react';
import authService from '../../../util/auth.service'
import UnauthorizedAccess from "../../shared/UnauthorizedAccess";
import Header from '../../shared/header';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import api from "../../../util/api"
import { Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dateFormat from "dateformat";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { render } from 'react-dom';

function ForumList() {
    const user = authService.getCurrentUser();
    const [rows, setRows] = useState();
    const navigate = useNavigate();

    const columns = [
        {
            field: 'topic', headerName: 'Naslov', width: 200, renderHeader: (params) => (
                <strong>
                    {'Naslov'}
                </strong>
            )
        },
        {
            field: 'status', headerName: 'Otvoren', width: 200, renderHeader: (params) => (
                <strong>
                    {'Otvoren'}
                </strong>
            )
        },
        {
            field: 'createdBy', headerName: 'Kreirao', width: 200, renderHeader: (params) => (
                <strong>
                    {'Kreirao'}
                </strong>
            )
        },
        {
            field: 'dateTime', headerName: 'Vrijeme', width: 200, renderHeader: (params) => (
                <strong>
                    {'Vrijeme'}
                </strong>
            ),
            minwidth: 150
        }
    ];

    var mounted = false;

    useEffect(() => {
        if (!mounted) {
            mounted = true;
            api.get("/forumtopic/all").then((res) => {
                res.data.forEach(m => m.dateTime = dateFormat(m.dateTime, "dd/mm/yyyy, HH:MM"))
                res.data.forEach(m => m.createdBy = m.createdBy.firstname + " " + m.createdBy.lastname)
                res.data.forEach(m => m.status = m.open ? "Da" : "Ne")
                setRows(res.data)
            })
        }
    }, [])

    return (
        <>
            <Header></Header>
                    {rows ?
                        <Container
                            style={{ backgroundColor: "#F5F5F5", width: "100%", padding: 0, height: "fit-content" }}
                        >
                            <Box sx={{ width: "100%", backgroundColor: "#00101F" }}>
                                <h2
                                    style={{
                                        color: "white",
                                        fontFamily: "Yantramanav",
                                        padding: 5,
                                        paddingLeft: 10
                                        ,marginBottom: 5
                                    }}
                                >Forum</h2>
                            </Box>
                            <>
                                <Box sx={{ display:"flex",
                                            justifyContent:"flex-end",
                                            alignItems:"flex-end"}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        
                                        size="medium"
                                        style={{margin: 5, marginBottom:10, marginRight:10, backgroundColor:"#00101F", fontFamily: "Yantramanav"}}
                                        onClick={(event) => {
                                            navigate("/create-forum");
                                        }}
                                        startIcon={<AddIcon />}
                                    >
                                        Kreiraj
                                    </Button>
                                </Box>
                            </>

                            <DataGrid
                                sx={{
                                    // disable cell selection style
                                    '.MuiDataGrid-cell:focus': {
                                        outline: 'none'
                                    },
                                    paddingLeft: 2,
                                    // pointer cursor on ALL rows
                                    '& .MuiDataGrid-row:hover': {
                                        cursor: 'pointer'
                                    }
                                }}

                                localeText={{
                                    noRowsLabel: 'Nema forum postova',
                                    noResultsOverlayLabel: 'Nisu pronađeni izvještaji.',
                                    toolbarFilters: 'Filteri',
                                    toolbarFiltersLabel: 'Prikaži filtere',
                                    toolbarFiltersTooltipHide: 'Sakrij filtere',
                                    toolbarFiltersTooltipShow: 'Prikaži filtere',
                                    columnsPanelTextFieldLabel: 'Nađi kolonu',
                                    columnsPanelTextFieldPlaceholder: 'Naziv kolone',
                                    columnsPanelDragIconLabel: 'Promijeni redoslijed kolona',
                                    columnsPanelShowAllButton: 'Prikaži sve',
                                    columnsPanelHideAllButton: 'Sakrij sve',
                                    filterPanelAddFilter: 'Add filter',
                                    filterPanelRemoveAll: 'Ukloni sve',
                                    filterPanelDeleteIconLabel: 'Izbriši',
                                    filterPanelLogicOperator: 'Logički operator',
                                    filterPanelOperator: 'Operator',
                                    filterPanelOperatorAnd: 'I',
                                    filterPanelOperatorOr: 'ILI',
                                    filterPanelColumns: 'Kolone',
                                    filterPanelInputLabel: 'Vrijednost',
                                    filterPanelInputPlaceholder: 'Vrijednost filtera',
                                    filterOperatorContains: 'contains',
                                    filterOperatorEquals: 'jednako je',
                                    filterOperatorStartsWith: 'počinje sa',
                                    filterOperatorEndsWith: 'završava sa',
                                    filterOperatorIs: 'je',
                                    filterOperatorNot: 'nije',
                                    filterOperatorAfter: 'je nakon',
                                    filterOperatorOnOrAfter: 'je na ili nakon',
                                    filterOperatorBefore: 'je ispred',
                                    filterOperatorOnOrBefore: 'je na ili ispred',
                                    filterOperatorIsEmpty: 'je prazno',
                                    filterOperatorIsNotEmpty: 'nije prazno',
                                    filterOperatorIsAnyOf: 'je bilo šta od',
                                    columnMenuLabel: 'Menu',
                                    columnMenuShowColumns: 'Prikaži kolone',
                                    columnMenuManageColumns: 'Upravljaj kolonama',
                                    columnMenuFilter: 'Filtriraj',
                                    columnMenuHideColumn: 'Sakrij kolonu',
                                    columnMenuUnsort: 'Poništi sortiranje',
                                    columnMenuSortAsc: 'Sortiraj uzlazno',
                                    columnMenuSortDesc: 'Sortiraj silazno',
                                    footerTotalRows: 'Ukupno redova:',

                                }}
                                componentsProps={{
                                    pagination: {
                                      labelRowsPerPage: ('Veličina stranice')
                                    }
                                  }}
                                rows={rows}
                                columns={columns}
                                onRowClick={(r,event) => { 
                                    if (!event.ignore) {
                                        navigate("/forumpost-list?id=" + r.row.id + "&status=" + r.row.open)
                                    }
                                 }}
                                    
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </Container>
                        : <Backdrop
                        sx={{
                          color: "#fff",
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={true}
                      >
                        <CircularProgress color="inherit" />
                      </Backdrop>}
        </>
    )
}


export default ForumList