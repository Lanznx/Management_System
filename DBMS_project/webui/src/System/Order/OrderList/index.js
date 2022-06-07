import * as React from "react";
import { Box, TableContainer, Paper } from "@mui/material";
import { Table, TableBody, TablePagination } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";

import OrderRow from "./Components/OrderRow";
import EnhancedTableToolbar from "./Components/EnhancedTableToolbar";
import EnhancedTableHead from "./Components/EnhancedTableHead";
import { getAllOrders, getTagDict, createTag } from "./APIs";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isBackdropOpen, setIsBackdropOpen] = React.useState(false);
  const [sort, setSort] = React.useState("asc"); // asc or desc 排序用
  const [orderBy, setOrderBy] = React.useState("name");
  const [allTags, setAllTags] = React.useState({
    10: "邱德晏的屁股努力加載中",
    20: "邱德晏的肚子努力加載中",
  });
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([
    {
      orderId: "努力加載中",
      totalPrice: "000",
      tags: [
        {
          tagId: "10",
        },
      ],
      createTime: "明天",
      orderProducts: [
        {
          productId: "努力加載中",
          productName: "努力加載中",
          productPrice: "000",
          productAmount: "000",
        },
      ],
    },
  ]);

  async function handleCreateTag() {
    let tag = document.getElementById("tag").value;
    let tagDict = await getTagDict();
    let tagId = Object.keys(tagDict).find((key) => tagDict[key] === tag);
    if (tagDict[tagId]) {
      window.alert("此標籤已存在");
    } else if (!tag) {
      window.alert("您必須輸入標籤名稱");
    } else {
      await createTag(tag);
      let tagDict = await getTagDict();
      setAllTags(tagDict);
      window.alert("新增標籤成功");
      setOpen(false);
    }
  }

  async function fetchTags() {
    const resp = await getTagDict();
    // console.log("[OrderRow.js fetchTags] resp: ", resp);
    setAllTags(resp);
  }

  async function refresh() {
    setIsBackdropOpen(true);
    const results = await getAllOrders();
    setRows(results);
    console.log(results, "allOrders");
    await fetchTags();
    setIsBackdropOpen(false);
  }

  React.useEffect(() => {
    refresh();
  }, []);

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
            open={open}
            setOpen={setOpen}
            handleCreateTag={handleCreateTag}
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
                    refresh={refresh}
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
