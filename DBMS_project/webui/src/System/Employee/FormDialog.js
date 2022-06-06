import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { IconButton } from '@mui/material';
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { addNewEmployee } from './APIs';

export default function FormDialog(props) {
    const { refresh } = props

    const [employeeName, setEmployeeName] = React.useState('')
    const [employeeUnitSalary, setEmployeeUnitSalary] = React.useState('')
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    const handleSubmit = async (employeeName, employeeUnitSalary) => {
        console.log("[FormDialog.js handleSubmit] add employee: ", employeeName);
        const resp = await addNewEmployee(employeeName, employeeUnitSalary);
        console.log("add resp: ", resp);
        await refresh();
        setIsDialogOpen(false);
    }

    return (
        <Box>
            <IconButton onClick={()=>{setIsDialogOpen(true)}}>
                <AddCircleIcon />
            </IconButton>
            <Dialog open={isDialogOpen} onClose={()=>{setIsDialogOpen(false)}}>
                <DialogTitle> 新增員工 </DialogTitle>
                <DialogContent>
                <DialogContentText>幫助您更好的管理員工支出</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="員工姓名"
                        value={employeeName}
                        type="text"
                        onChange={(e) => {setEmployeeName(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="員工薪水"
                        value={employeeUnitSalary}
                        type="number"
                        onChange={(e) => {setEmployeeUnitSalary(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setIsDialogOpen(false)}} color="primary">
                        取消
                    </Button>
                    <Button onClick={()=>{handleSubmit(employeeName, employeeUnitSalary)}} color="primary">
                        確定
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}