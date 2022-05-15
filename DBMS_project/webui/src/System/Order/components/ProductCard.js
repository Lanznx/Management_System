import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Grid } from "@mui/material";
import Button from "@mui/material/Button";

export function ProductCard({ productInfo }) {
  const [productAmount, setProductAmount] = React.useState(productInfo.amount);
  const [amount, setAmount] = React.useState(0);
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 3,
        marginTop: 10,
        justifyContent: "center",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
            {productInfo.name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {amount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            if (amount + 1 > productInfo.amount) {
            } else {
              setAmount(amount + 1);
            }
          }}
          fullWidth="auto"
          variant="contained"
        >
          +
        </Button>
        <Button
          onClick={() => {
            if (amount - 1 < 0) {
            } else {
              setAmount(amount - 1);
            }
          }}
          fullWidth="auto"
          variant="contained"
        >
          -
        </Button>
      </CardActions>
    </Card>
  );
}
