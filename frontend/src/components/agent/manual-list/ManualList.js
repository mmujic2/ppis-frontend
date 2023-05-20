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

function ManualList() {
    const user = authService.getCurrentUser();
    const [rows, setRows] = useState();
    const navigate = useNavigate();

    const renderEditButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 5, backgroundColor:"#00101F" }}
                    onClick={(event) => {
                        navigate("/manual/edit?id=" + params.row.id)
                        event.ignore = true;
                    }}
                    startIcon={<EditIcon />}
                >
                    Uredi
                </Button>
            </strong>
        )
    }

    const renderDeleteButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ marginLeft: 5, backgroundColor:"#c62828" }}
                    onClick={(event) => {
                        api.delete("/manual/delete/"+ params.row.id).then((res) => {
                            window.location.reload(false);
                        })
                        
                        event.ignore = true;
                    }}
                    startIcon={<DeleteIcon />}
                >
                    Izbriši
                </Button>
            </strong>
        )
    }

    const columns = [
        {
            field: 'title', headerName: 'Naslov', width: 200, renderHeader: (params) => (
                <strong>
                    {'Naslov'}
                </strong>
            )
        },
        {
            field: 'category', headerName: 'Kategorija', width: 200, renderHeader: (params) => (
                <strong>
                    {'Kategorija'}
                </strong>
            )
        },
        {
            field: 'createdBy', headerName: 'Agent', width: 200, renderHeader: (params) => (
                <strong>
                    {'Agent'}
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
        },
        {
            field: 'col', headerName: '', width: 200, renderHeader: (params) => (
                <strong>
                    {''}
                </strong>
            ),
            renderCell: renderEditButton,
            hideable: true,
            width: 100
        },
        {
            field: 'col2', headerName: '', width: 200, renderHeader: (params) => (
                <strong>
                    {''}
                </strong>
            ),
            renderCell:renderDeleteButton,
            hideable: true,
        }
        
    ];
    const userColumns = [
        {
            field: 'title', headerName: 'Naslov', width: 200, renderHeader: (params) => (
                <strong>
                    {'Naslov'}
                </strong>
            )
        },
        {
            field: 'category', headerName: 'Kategorija', width: 200, renderHeader: (params) => (
                <strong>
                    {'Kategorija'}
                </strong>
            )
        },
        {
            field: 'createdBy', headerName: 'Agent', width: 200, renderHeader: (params) => (
                <strong>
                    {'Agent'}
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
        },
    ];

    var mounted = false;
    useEffect(() => {
        if (!mounted) {
            mounted = true;
            api.get("/manual/all").then((res) => {
                res.data.forEach(m => m.dateTime = dateFormat(m.dateTime, "dd/mm/yyyy, HH:MM"))
                res.data.forEach(m => m.createdBy = m.createdBy.firstname + " " + m.createdBy.lastname)
                res.data.forEach(m => m.category = m.category[0].toUpperCase() + m.category.substring(1).toLowerCase())
                setRows(res.data)
            })
        }
    }, [])

    return (
        <>
            <Header></Header>
                    {rows ?
                        <Container
                            style={{ backgroundColor: "#F5F5F5", width: "100%", padding: 0, height: "500px" }}
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
                                >Priručnici</h2>
                            </Box>
                            {user.role == "sd_user" ? <></> :
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
                                        navigate("/manual/create");
                                    }}
                                    startIcon={<AddIcon />}
                                >
                                    Dodaj
                                </Button>
                            </Box>
                                
                            </>
                            }
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
                                    noRowsLabel: 'Nema izvještaja',
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
                                columns={user.role == "sd_user" ? userColumns : columns}
                                onRowClick={(r,event) => { 
                                    if (!event.ignore) {
                                        navigate("/manual?id=" + r.row.id)
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


export default ManualList