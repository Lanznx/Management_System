import * as React from "react";
import { Box, TableContainer, Paper } from "@mui/material";
import { Table, TableBody, TablePagination } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";

import OrderRow from "./Components/OrderRow";
import EnhancedTableToolbar from "./Components/EnhancedTableToolbar";
import EnhancedTableHead from "./Components/EnhancedTableHead";
import { getAllOrders, getTagDict } from "./APIs";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(sort, orderBy) {
  return sort === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "orderId",
    numeric: false,
    disablePadding: true,
    label: "訂單編號",
  },
  {
    id: "orderTags",
    numeric: true,
    disablePadding: false,
    label: "標籤",
  },
  {
    id: "createTime",
    numeric: true,
    disablePadding: false,
    label: "時間",
  },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "總價",
  },
];

const attribute = [
  { id: "orderId", label: "訂單編號", type: "text" },
  { id: "orderPrice", label: "總價", type: "number" },
  { id: "orderTags", label: "標籤", type: "chip" },
];

export default function OrderList(props) {
  const [sort, setSort] = React.useState("asc"); // asc or desc 排序用
  const [orderBy, setOrderBy] = React.useState("name");
  const [allTags, setAllTags] = React.useState([
    { 10: "邱德晏的屁股努力加載中" },
    { 20: "邱德晏的屁股努力加載中" },
  ]);

  const [rows, setRows] = React.useState([
    {
      orderId: "努力加載中",
      totalPrice: "000",
      tags: { 18: "邱德晏的屁股" ,  12: "邱德晏的肚子" },
      createTime: "明天",
      orderProducts: ["努力加載中"],
    },
  ]);

  async function fetchTags() {
    const resp = await getTagDict();
    // console.log("[OrderRow.js fetchTags] resp: ", resp);
    setAllTags(resp);
    console.log("============================");
    console.log(allTags);
  }

  React.useEffect(() => {
    (async () => {
      const result = await getAllOrders();
      setRows(result);
      console.log(result);
    })();
    fetchTags();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isBackdropOpen, setIsBackdropOpen] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && sort === "asc";
    setSort(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer element={Paper}>
          <EnhancedTableToolbar
            label="訂單"
            attribute={attribute}
          />
          <Table aria-label="collapsible table">
            <EnhancedTableHead
              order={sort}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              head={headCells}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(sort, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <OrderRow
                    allTags={allTags}
                    key={index}
                    row={row}
                    refresh={props.refresh}
                    setIsBackdropOpen={setIsBackdropOpen}
                  />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
}
