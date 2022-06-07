import * as React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deleteOrder, updateOrder } from "../APIs";
import MultipleTags from "./MultipleTags";

export default function OrderRow(props) {
  console.log("props: ", props);

  // row 原料資料
  // history 原料更動紀錄
  // refresh 刷新原料資料 API
  const { row, refresh, allTags } = props;
  const [chosedTags, setChosedTags] = React.useState(
    row.tags.map((tag) => {
      if (allTags[tag.tagId]) return tag.tagId;
    })
  );

  const [orderData, setOrderData] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(row.totalPrice);
  const [canSend, setCanSend] = React.useState(false);
  const [newRow, setNewRow] = React.useState(row);
  const [orderProducts, setOrderProducts] = React.useState(row.orderProducts);
  const [expandOpen, setExpandOpen] = React.useState(false);

    React.useEffect(()=>{
      let checkChosedTags = row.tags.map((tag) => {
        if (allTags[tag.tagId]) return tag.tagId;
      });
      setChosedTags(checkChosedTags);
    }, [allTags, row])


  React.useEffect(() => {
    setNewRow({
      orderId: row.orderId,
      createTime: row.createTime,
      totalPrice: totalPrice,
      orderProducts: orderProducts.map((orderProduct) => {
        return {
          productId: orderProduct.productId,
          productName: orderProduct.productName,
          productPrice: orderProduct.productPrice,
          productAmount: orderData[orderProduct.productId],
        };
      }),
      tags: chosedTags,
    });

    // console.log(row, "row");
    // console.log(newRow, "newRow");

    if (JSON.stringify(row) !== JSON.stringify(newRow)) {
      setCanSend(true);
      console.log("row !== newRow");
    } else console.log("row === newRow");
  }, [orderData, chosedTags, totalPrice]);

  const handleAmountChange = (event) => {
    const { id, value } = event.target;
    const newOrderData = { ...orderData };
    newOrderData[id] = value;
    setOrderData(newOrderData);
  };

  const handleDelete = async (id) => {
    console.log("[CollapsibleRow.js handleDelete] delete order: ", id);
    props.setIsBackdropOpen(true);
    let resp = await deleteOrder(id);
    console.log("delete resp: ", resp);
    await props.refresh();
    props.setIsBackdropOpen(false);
    refresh();
  };

  const handleUpdate = async (id) => {
    console.log("[CollapsibleRow.js handleUpdate] update order: ", id);
    props.setIsBackdropOpen(true);
    let resp = await updateOrder(id, orderData, chosedTags, totalPrice);
    console.log("update resp: ", resp);
    await props.refresh();
    props.setIsBackdropOpen(false);
    refresh();
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setExpandOpen(!expandOpen);
            }}
          >
            {expandOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell size="small" width="50px">
          <Typography variant="h12">{row.orderId}</Typography>
        </TableCell>
        <TableCell align="right">
          <MultipleTags
            label={"標籤"}
            options={Object.values(allTags).map((tag) => tag)}
            chosedTags={chosedTags}
            setChosedTags={setChosedTags}
            allTags={allTags}
          />
        </TableCell>
        <TableCell align="right"> {row.createTime} </TableCell>
        <TableCell align="right"> {row.totalPrice} </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            disabled={!canSend}
            color="success"
            aria-label="delete"
            onClick={() => {
              // handleUpdate(row.id, orderData, Object.keys(chosedTags), totalPrice);
              setCanSend(false);
              console.log(canSend);
            }}
          >
            <CheckCircleIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expandOpen} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell> 商品名稱 </TableCell>
                    <TableCell align="right"> 數量 </TableCell>
                    <TableCell align="right"> 小計 </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderProducts.map((orderProduct) => (
                    <TableRow
                      key={orderProduct.productName}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {orderProduct.productName}
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          value={orderProduct.productAmount}
                          type="number"
                          onChange={(e) => {
                            handleAmountChange(e);
                            setOrderProducts(
                              orderProducts.map((orderProduct) => {
                                if (orderProduct.productId === e.target.id) {
                                  return {
                                    ...orderProduct,
                                    productAmount: e.target.value,
                                  };
                                } else return orderProduct;
                              })
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {orderProduct.productPrice * orderProduct.productAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      加總
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }} />
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {row.totalPrice}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
