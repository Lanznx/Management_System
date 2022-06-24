import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import swal from "sweetalert";
import { signUp } from "./APIs";

export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      phoneNumber: data.get("phoneNumber"),
      acceptTerms: data.get("acceptTerms"),
    };

    if (obj.acceptTerms === null) {
      swal("Failed", "請勾選同意服務條款", "warning");
      return;
    }

    if (obj.password === null) {
      swal("Failed", "請輸入密碼", "warning");
      return;
    }

    if (obj.phoneNumber === null) {
      swal("Failed", "請輸入手機號碼", "warning");
      return;
    }

    if (obj.password != obj.confirmPassword) {
      swal("Failed", "密碼不一致", "warning");
      return;
    }

    // check if email validation by regular expression
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(obj.email)) {
      swal("Failed", "請輸入正確的email格式", "warning");
      return;
    }

    // if all validation is ok, send data to server
    let resp = await signUp(
      obj.username,
      obj.password,
      obj.email,
      obj.phoneNumber
    );
    if (resp === "註冊成功") {
      swal("Success", resp, "success");
      window.location.href = "/signIn"
    } else {
      swal("failed", "註冊失敗！\n帳號名稱重複", "Fail")
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          註冊
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="使用者名稱"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="電子郵件"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="確認密碼"
                type="confirmPassword"
                id="confirmPassword"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                label="手機號碼"
                type="number"
                id="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="acceptTerms" color="primary" />}
                label="確認使用者條款"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            註冊
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                有帳號了嗎? 按這裡登入
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
