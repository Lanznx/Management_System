import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Grid } from "@mui/material";
import Button from "@mui/material/Button";

export default function ProductCard(props) {
  const productAmount = props.productInfo.amount;
  const [amount, setAmount] = React.useState(0);
  const [backColor, setBackColor] = React.useState(true);
  React.useEffect(() => {
    console.log("tozeroooo");
    if (props.toZero) setAmount(0);
    props.setToZero(false);
    if (amount > productAmount) {
      setBackColor(false);
    } else {
      setBackColor(true);
    }
  }, [props.toZero]);

  return (
    <Card
      sx={{
        background: backColor ? "#fff" : "#C4090E",
        margin: 1.5,
        justifyContent: "center",
      }}
    >
      <CardActionArea>
        <CardContent
          onClick={() => {
            if (amount + 1 > productAmount) {
              setBackColor(false);
            } else {
              setAmount(amount + 1);
              props.orderRec(
                props.productInfo.name,
                props.productInfo.productId,
                props.productInfo.price,
                amount + 1
              );
            }
          }}
          sx={{
            height: "130px",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: backColor ? "#000" : "#fff",
            }}
          >
            {props.productInfo.name}
          </Typography>

          <Typography
            variant="h7"
            component="div"
            sx={{
              color: backColor ? "#000" : "#fff",
            }}
          >
            <i>$.{props.productInfo.price}</i>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          "&.MuiCardActions-root>:not(:first-of-type)": {
            marginLeft: 0,
          },
        }}
      >
        <Button
          sx={{
            minHeight: "30px",
            alignContent: "baseline",
            background: backColor ? "primary" : "#C4090E",
            color: backColor ? "#fff" : "#C4090E",
            "&:hover": {
              background: backColor ? "primary" : "#C4090E",
              color: backColor ? "#fff" : "#C4090E",
            },
          }}
          onClick={() => {
            if (amount + 1 > productAmount) {
              setBackColor(false);
            } else {
              setAmount(amount + 1);
              props.orderRec(
                props.productInfo.name,
                props.productInfo.productId,
                props.productInfo.price,
                amount + 1
              );
            }
          }}
          variant="contained"
        >
          +
        </Button>
        <Typography
          variant="h5"
          sx={{
            color: backColor ? "#000" : "#fff",
          }}
        >
          {amount}
        </Typography>
        <Button
          sx={{
            minHeight: "30px",
            background: backColor ? "primary" : "#C4090E",
            "&:hover": {
              background: backColor ? "primary" : "#fff",
              color: backColor ? "#fff" : "#000",
            },
          }}
          onClick={() => {
            if (amount - 1 < 0) {
            } else {
              setAmount(amount - 1);
              setBackColor(true);
              props.orderRec(
                props.productInfo.name,
                props.productInfo.productId,
                props.productInfo.price,
                amount - 1
              );
            }
          }}
          variant="contained"
        >
          -
        </Button>
      </CardActions>
    </Card>
  );
}
