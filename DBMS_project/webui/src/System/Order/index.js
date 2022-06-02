import { Grid } from "@mui/material";
import ProductCard from "./components/ProductCard.js";
import OrderTable from "./components/OrderTable";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";
import { getAllProducts } from "./API.js";
const axios = require("axios");



export default function Order() {
  const [productInfos, setProductInfos] = useState([]);
  const [canSend, setCanSend] = useState(false);
  const [orders, setOrders] = useState([]);
  const [toZero, setToZero] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tags, setTags] = useState(["製作中", "未完成", "已完成"]);

  useEffect(() => {
    let allProduct = getAllProducts()
    setProductInfos(allProduct);
  }, []);

  function createTag() {
    axios({
      method: "post",
      url: "https://nccu-dbms-team11.herokuapp.com/product/addNewTag",
      data: {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        tagName: tags[tags.length - 1],
      },
    })
      .then((response) => {
        window.alert(`新增標籤 ${tags[tags.length - 1]} 成功`);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  function sendOrder() {
    axios({
      method: "post",
      url: "https://nccu-dbms-team11.herokuapp.com/order/addNewOrder",
      data: {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        order: orders,
        totalPrice: totalPrice,
        tagId: [""],
      },
    })
      .then((response) => {
        console.log(response);
        window.alert("訂單已送出");
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  function createTag() {
    axios({
      method: "post",
      url: "https://nccu-dbms-team11.herokuapp.com/product/addNewTag",
      data: {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        tagName: tags[tags.length - 1],
      },
    })
      .then((response) => {
        window.alert(`新增標籤 ${tags[tags.length - 1]} 成功`);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  function sendOrder() {
    axios({
      method: "post",
      url: "https://nccu-dbms-team11.herokuapp.com/order/addNewOrder",
      data: {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
        order: orders,
        totalPrice: totalPrice,
        tagId: [""],
      },
    })
      .then((response) => {
        console.log(response);
        window.alert("訂單已送出");
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  function orderRec(name, productId, price, amount) {
    console.log("first");
    let order = {
      name: name,
      productId: productId,
      price: price,
      amount: amount,
    };
    const newOrders = [
      ...orders.filter((item) => item.productId !== productId),
      order,
    ];
    setOrders(newOrders);
  }

  useEffect(() => {
    orders.map((order) => {
      if (order.amount > 0) {
        setCanSend(true);
      } else if (order.amount === 0) {
        // const newOrders = [
        //   ...orders.filter((item) => item.productId !== productId),
        //   order,
        // ];
        // setOrders(newOrders);
      }
    });
  }, [orders]);

  return (
    <Grid container spacing={2} sx={{ display: "flex" }}>
      <Grid container md={6}>
        {productInfos.map((productInfo) => (
          <Grid item md={4} key={productInfo.productId}>
            <ProductCard
              toZero={toZero}
              setToZero={setToZero}
              orderRec={orderRec}
              productInfo={productInfo}
              sx={{ justifyContent: "flex-end", width: "30px" }}
            />
          </Grid>
        ))}
      </Grid>

      <Grid item md={6}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">收件人</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <OrderTable
          orders={orders}
          toZero={toZero}
          setToZero={setToZero}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
        <Grid item md={12}>
          <IconButton
            disabled={!canSend}
            sx={{
              color: "grey",
              "&:hover": { color: "#C4090E" },
            }}
            onClick={() => {
              setOrders(orders.filter((item) => item.productId === 0));
              setToZero(true);
              setCanSend(false);
            }}
          >
            <CancelIcon />
          </IconButton>
          <IconButton
            disabled={!canSend}
            sx={{ color: canSend ? "#1976d2" : "grey" }}
            onClick={() => {
              if (canSend) {
                setOrders(orders.filter((item) => item.productId === 0));
                sendOrder();
                setToZero(true);
                setCanSend(false);
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
