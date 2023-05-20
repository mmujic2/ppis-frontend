import React from 'react';
import authService from '../../../util/auth.service'
import UnauthorizedAccess from "../../shared/UnauthorizedAccess";
import Header from '../../shared/header';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import api from "../../../util/api"
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dateFormat from "dateformat";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function ReportList() {
    const user = authService.getCurrentUser();
    const [rows, setRows] = useState();
    const navigate = useNavigate();

    const columns = [
        {
            field: 'code', headerName: 'Šifra', width: 200, renderHeader: (params) => (
                <strong>
                    {'Šifra'}
                </strong>
            )
        },
        {
            field: 'tag', headerName: 'Vrsta', width: 200, renderHeader: (params) => (
                <strong>
                    {'Vrsta'}
                </strong>
            )
        },
        {
            field: 'department', headerName: 'Zahvaćena usluga', width: 180, renderHeader: (params) => (
                <strong>
                    {'Zahvaćena usluga'}
                </strong>
            )
        },
        {
            field: 'reportDate', headerName: 'Vrijeme', width: 200, renderHeader: (params) => (
                <strong>
                    {'Vrijeme'}
                </strong>
            )
        },
        {
            field: 'raisedBy', headerName: 'Korisnik', width: 200, renderHeader: (params) => (
                <strong>
                    {'Korisnik'}
                </strong>
            )
        },
        {
            field: 'resolvedBy', headerName: 'Agent', width: 200, renderHeader: (params) => (
                <strong>
                    {'Agent'}
                </strong>
            )
        },
    ];

    var mounted = false;
    useEffect(() => {
        if (!mounted) {
            mounted = true;
            api.get("/report/all").then((res) => {
                let data = res.data
                res.data.forEach(r => r.reportDate = dateFormat(r.reportDate, "dd/mm/yyyy, HH:MM"))
                setRows(res.data)
            })
        }
    }, [])

    return (
        <>
            <Header></Header>
            {user.role == "sd_user" ? <UnauthorizedAccess></UnauthorizedAccess> :
                <>
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
                                    }}
                                >Izvještaji</h2>
                            </Box>
                            <DataGrid
                                sx={{
                                    // disable cell selection style
                                    '.MuiDataGrid-cell:focus': {
                                        outline: 'none'
                                    },
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
                                columns={columns}
                                onRowClick={(r) => { navigate("/report?id=" + r.row.id) }}
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
                </>}
        </>
    )
}


export default ReportList