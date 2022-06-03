import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function OrderTable(props) {
  const [totalAmount, setTotalAmount] = React.useState(0);

  React.useEffect(() => {
    let subTotalAmount = 0;
    let subTotalPrice = 0;
    props.orders.map((order) => {
      subTotalAmount += order.amount;
      subTotalPrice += order.price * order.amount;
      setTotalAmount(subTotalAmount);
      props.setTotalPrice(subTotalPrice);
    });
  }, [props.orders]);

  React.useEffect(() => {
    setTotalAmount(0);
    props.setTotalPrice(0);
  }, [props.toZero]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "12px" }}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              品項
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
              數量
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
              價錢
            </TableCell>
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
              <TableCell align="right">{order.amount}</TableCell>
              <TableCell align="right">{order.price}</TableCell>

            </TableRow>
          ))}
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              加總
            </TableCell>
            <TableCell align="right"  sx={{ fontWeight: "bold" }}>
              {totalAmount}
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              {props.totalPrice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
