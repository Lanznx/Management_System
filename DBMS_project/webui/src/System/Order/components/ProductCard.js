import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Grid } from "@mui/material";
import Button from "@mui/material/Button";

export function ProductCard({ productInfo }) {
  const [productAmount, setProductAmount] = React.useState(productInfo.amount);
  const [amount, setAmount] = React.useState(0);
  const [backColor, setBackColor] = React.useState(true);
  return (
    <Card
      sx={{
        background: backColor ? "#fff" : "#C4090E",
        maxWidth: 345,
        margin: 3,
        marginTop: 10,
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
            {productInfo.name}
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
            if (amount + 1 > productInfo.amount) {
              setBackColor(false);
            } else {
              setAmount(amount + 1);
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
