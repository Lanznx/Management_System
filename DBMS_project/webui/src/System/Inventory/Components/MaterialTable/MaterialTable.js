import * as React from 'react';
import { Box, TableContainer, Paper } from "@mui/material";
import { Table, TableBody, TablePagination } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";

import CollapsibleRow from "./CollapsibleRow";
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import EnhancedTableHead from "../EnhancedTableHead";

import { addNewMaterial } from '../../APIs'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "名稱",
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: false,
      label: "數量",
    }
  ]

const attribute = [
    {id: "materialName", label: "原料名稱", type: "text"},
    {id: "materialPrice", label: "價錢", type: "number"},
    {id: "materialAmount", label: "數量", type: "number"}
  ]

export default function MaterialTable(props){
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const [isBackdropOpen, setIsBackdropOpen] = React.useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }    

    return (
    <Box sx={{ width: "100%" }}>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isBackdropOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer element={Paper}>
                <EnhancedTableToolbar
                    label="原料"
                    attribute={attribute}
                    addAPI={addNewMaterial}
                    refresh={props.refresh}
                />
                <Table aria-label="collapsible table">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={props.rows.length}
                        head={headCells}
                    />
                    <TableBody>
                        {props.rows
                        .slice()
                        .sort(getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                            <CollapsibleRow
                                key={index}
                                row={row}
                                refresh={props.refresh}
                                setIsBackdropOpen={setIsBackdropOpen}
                            />
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    </Box>
    )
}