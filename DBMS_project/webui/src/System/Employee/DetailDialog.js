import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

import { updateEmployee } from './APIs';

export default function DetailDialog(props) {
    const { open, setIsDialogOpen, refresh } = props

    const [employeeName, setEmployeeName] = React.useState(props.row.employeeName)
    const [employeeUnitSalary, setEmployeeUnitSalary] = React.useState(props.row.employeeUnitSalary)

    const handleSubmit = async (employeeId, employeeName, employeeUnitSalary) => {
        console.log("[FormDialog.js handleSubmit] update employee: ", employeeId);
        const resp = await updateEmployee(employeeId, employeeName, employeeUnitSalary);
        console.log("update resp: ", resp);
        await refresh();
        setIsDialogOpen(false);
    }

    return (
        <Box>
            <Dialog open={open} onClose={()=>{setIsDialogOpen(false)}}>
                <DialogTitle> 員工詳細資料 </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="員工編號"
                        value={props.row.employeeId}
                        type="text"
                        variant='standard'
                        onChange={(e) => {}}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="員工姓名"
                        value={employeeName}
                        type="text"
                        variant='standard'
                        onChange={(e) => {setEmployeeName(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="員工薪水"
                        value={employeeUnitSalary}
                        type="number"
                        variant='standard'
                        onChange={(e) => {setEmployeeUnitSalary(e.target.value)}}
                    />
                    <DialogContentText>
                        員工工時：{props.row.employeeWorkingHours}
                    </DialogContentText>
                    <DialogContentText>
                        員工薪水：{props.row.employeeTotalSalary}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setIsDialogOpen(false)}} color="primary">
                        取消
                    </Button>
                    <Button onClick={()=>{handleSubmit(props.row.employeeId)}} color="primary">
                        確定
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}