import * as React from "react"
import { useState, useEffect } from "react"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from '@mui/material/LinearProgress';
import Alert from "@mui/material/Alert"
import { Collapse } from "@mui/material"

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [newObj, setNewObj] = useState({})
    const [resp, setResp] = useState("")
    const [progressing, setProgressing] = useState(false)

    return (
      <Box>
        <IconButton onClick={handleClickOpen}>
          <AddCircleIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>加入您的 {props.label}</DialogTitle>
          <DialogContent>
            <DialogContentText>加了也沒用，就跟系學會一樣</DialogContentText>
            {/* use props.new to dynamically create a TextField input form */}
            {props.new.attribute.map((item, index) => {
              return (
                <TextField
                  key={index}
                  autoFocus
                  margin="dense"
                  label={item.label}
                  type={item.type}
                  fullWidth
                  onChange={(e) => {
                    setNewObj({ ...newObj, [item.id]: e.target.value })
                  }}
                />
              )}
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button
              onClick={async() => {
                setProgressing(true)

                // use props.new.api to add newObj to the database
                setResp(await props.new.api(newObj))
                setProgressing(false)


              }}
            >
              送出
            </Button>
          </DialogActions>
          <Collapse in={ resp != ""}>
            <Alert severity="info" onClose={ ()=> { setResp("") } }> { resp } </Alert>
          </Collapse>
          <Collapse in={progressing}>
            <LinearProgress open={ progressing }/>
          </Collapse>
        </Dialog>
      </Box>
    );
  }