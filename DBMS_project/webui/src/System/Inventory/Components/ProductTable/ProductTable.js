import * as React from 'react';
import { Box, TableContainer, Paper } from "@mui/material";
import { Table, TableBody, TablePagination } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";

import EnhancedTableToolbar from '../EnhancedTableToolbar';
import EnhancedTableHead from "../EnhancedTableHead";

import { addNewProduct, getMaterialDict } from '../../APIs'
import ProductRow from './ProductRow';

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
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "售價",
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: false,
      label: "數量",
    }
];
  
const init_attribute = [
    {id: "productName", label: "產品名稱", type: "text"},
    {id: "productPrice", label: "價錢", type: "number"},
    {id: "productAmount", label: "數量", type: "number"},
    {id: "materialIds", label: "原料", type: "chip", options: [{materialId: '0', materialName: '邱德晏的屁股'}]}
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

    const [attribute, setAttribute] = React.useState(init_attribute);

    React.useEffect(() => {
        const fetchData = async () => {
            setIsBackdropOpen(true);
            const materialDict = await getMaterialDict();
            setAttribute(init_attribute.map(attr => {
                if (attr.type === "chip") {
                    return {...attr, options: materialDict}
                }
                return attr;
            }));
            setIsBackdropOpen(false);
        }

        fetchData();
    }, []);

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
                    label="產品"
                    attribute={attribute}
                    addAPI={addNewProduct}
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
                        .map((row) => (
                            <ProductRow
                                key={row.id}
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