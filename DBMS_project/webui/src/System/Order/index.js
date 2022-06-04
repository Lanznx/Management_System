import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import ProductCard from "./components/ProductCard.js";
import OrderTable from "./components/OrderTable";
import Tag from "./components/tag.js";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  getAllProducts,
  updateAmount,
  sendOrder,
  createTag,
  getTagDict,
} from "./APIs.js";

export default function Order() {
  const [productInfos, setProductInfos] = useState([]);
  const [canSend, setCanSend] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDatas, setOrderDatas] = useState([]);
  const [toZero, setToZero] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tags, setTags] = useState({});
  const [chosedTags, setChosedTags] = useState([]);
  const [open, setOpen] = useState(false);


  console.log("========Orders==========");
  console.log(orders)

  useEffect(() => {
    orders.map((order) => {
      if (order.amount > 0) setCanSend(true);
    });
  }, [orders]);

  useEffect(() => {
    handleGetProducts();
  }, [toZero, canSend]);


  async function handleGetProducts() {
    let allProduct = await getAllProducts();
    setProductInfos(allProduct);
    if (allProduct.length === 0)
      setProductInfos({
        name: "暫時沒有商品，可以趕快去新增呦！",
        productId: "",
        price: 0,
        amount: 0,
      });

    let tagDict = await getTagDict();
    setTags(tagDict);
  }

  function orderRec(name, productId, price, amount) {
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
    // add order to new orderDatas by productId and amount
    let newOrderDatas = {};
    for (let i = 0; i < newOrders.length; i++) {
      let order = newOrders[i];
      if (newOrderDatas[order.productId]) {
        newOrderDatas[order.productId] += order.amount;
      } else {
        newOrderDatas[order.productId] = order.amount;
      }
    }
    setOrderDatas(newOrderDatas);
  }

  async function handleSendOrder() {
    const canChangeAmount = await sendOrder(
      orderDatas,
      totalPrice,
      chosedTags
    );
    console.log(canChangeAmount);
    if(canChangeAmount) {
      orders.map((orders) => {
        updateAmount(orders.productId, -orders.amount);
      });
    } else {
      window.alert("Not enough amount");
    }
  }

  async function handleCreateTag() {
    let tag = document.getElementById("tag").value;
    let tagDict = await getTagDict();
    let tagId = Object.keys(tagDict).find(
      (key) => tagDict[key] === tag
    );
    if (tagDict[tagId]) {
      window.alert("此標籤已存在");
    } else if (!tag) {
      window.alert("您必須輸入標籤名稱");
    } else {
      await createTag(tag);
      let tagDict = await getTagDict();
      setTags(tagDict);
      window.alert("新增標籤成功");
      setOpen(false);
    }
  }

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

      <Grid container md={6}>
        <Stack
          md={11}
          alignItems="center"
          spacing={1}
          direction="row"
          flexWrap="wrap"
        >
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddCircleIcon />
          </IconButton>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>請輸入標籤</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="tag"
                label="Tag"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>取消</Button>
              <Button
                onClick={() => {
                  handleCreateTag();
                }}
              >
                提交
              </Button>
            </DialogActions>
          </Dialog>

          {Object.values(tags).map((tag) => (
            <Tag
              toZero={toZero}
              setToZero={setToZero}
              key={tag}
              tag={tag}
              tags={tags}
              chosedTags={chosedTags}
              setChosedTags={setChosedTags}
            />
          ))}
        </Stack>

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
              setOrders([]);
              setOrderDatas([]);
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
                setOrders([]);
                setOrderDatas([]);
                setToZero(true);
                setCanSend(false);
                handleSendOrder();
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
