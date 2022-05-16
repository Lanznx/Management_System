import { Box } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { ProductCard } from "./components/ProductCard.js";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
const axios = require("axios");
export default function Order() {
  const [productInfos, setProductInfos] = useState([]);
  const [canSend, setCanSend] = useState(false);
  useEffect(() => {
    axios({
      method: "post",
      url: "https://nccu-dbms-team11.herokuapp.com/product/getAllProducts",
      data: {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
      },
    }).then((response) => {
      let allProduct = response.data.allProductInformation;
      setProductInfos(allProduct);
    });
  }, []);
  return (
    <Grid container spacing={2} sx={{ display: "flex" }}>
      {productInfos.map((productInfo) => (
        <Grid key={productInfo.productId} item md={6}>
          <ProductCard
            productInfo={productInfo}
            sx={{ justifyContent: "flex-end" }}
          />
        </Grid>
      ))}
      <Grid item md={6}>
        <IconButton
          sx={{ marginLeft: "24px", color: canSend ? "#0095E6" : "grey", "&:hover":{color: '#C4090E'} }}
          onClick={()=>{
            // setProductInfos(productInfos.map((productInfo)=>{productInfo.amount = 0}))
            
          }}
        >
          <CancelIcon />
        </IconButton>
        <IconButton
          sx={{ marginLeft: "24px", color: canSend ? "#0095E6" : "grey" }}
        >
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
