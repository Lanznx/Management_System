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
    } else{
      setBackColor(true)
    }
  }, [props.toZero]);

  return (
    <Card
      sx={{
        background: backColor ? "#fff" : "#C4090E",
        margin: 3,
        justifyContent: "center",
      }}
    >
      <CardActionArea>
        <CardContent>
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
            variant="h5"
            sx={{
              color: backColor ? "#000" : "#fff",
            }}
          >
            {amount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          sx={{
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
          fullWidth={true}
          variant="contained"
        >
          +
        </Button>
        <Button
          sx={{
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
          fullWidth={true}
          variant="contained"
        >
          -
        </Button>
      </CardActions>
    </Card>
  );
}
