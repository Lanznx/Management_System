import { Toolbar, Typography } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const EnhancedTableToolbar = (props) => {
  const { setOpen, open, handleCreateTag } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {props.label && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.label}
        </Typography>
      )}
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
      </Stack>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
