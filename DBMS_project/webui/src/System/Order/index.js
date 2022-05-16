import { Box } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { ProductCard } from "./components/ProductCard.js";
import { useEffect, useState } from "react";

const axios = require("axios");
export default function Order() {
  const [productInfos, setProductInfos] = useState([]);
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
    <Grid container>
      {productInfos.map((productInfo) => (
        <Grid key={productInfo.productId} item md={6}>
          <ProductCard productInfo={productInfo} />
        </Grid>
      ))}
    </Grid>
  );
}
