import { Toolbar, Typography } from "@mui/material";

const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
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
    </Toolbar>
  );
}

export default EnhancedTableToolbar;