import { Toolbar, Typography } from "@mui/material";
import FormDialog from "./FormDialog";

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

      {/*  這裡是 Dialog */}
      <FormDialog label={props.label} addAPI={props.addAPI} attribute={props.attribute} refresh={props.refresh}/>
    </Toolbar>
  );
}

export default EnhancedTableToolbar;