import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function OrderTable(props) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>品項</TableCell>
            <TableCell align="right">價錢</TableCell>
            <TableCell align="right">數量</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.orders.map((order) => (
            <TableRow
              key={order.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.name}
              </TableCell>
              <TableCell align="right">{order.price}</TableCell>
              <TableCell align="right">{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
