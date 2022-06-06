import * as React from 'react';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { Toolbar, Typography } from '@mui/material';
import { Paper, Box } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedIcon from '@mui/icons-material/Feed';

import DetailDialog from './DetailDialog';
import FormDialog from './FormDialog';

import { getAllEmployee, deleteEmployee } from './APIs';

export default function Employee(){
    const [employees, setEmployees] = React.useState([]);
    const [isBackdropOpen, setIsBackdropOpen] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleDelete = async (id) => {
        console.log("[Employee.js handleDelete] delete employee: ", id);
        setIsBackdropOpen(true);
        let resp = await deleteEmployee(id);
        console.log("delete resp: ", resp);
        await fetchData();
        setIsBackdropOpen(false);
    }

    const fetchData = async () => {
        setIsBackdropOpen(true);
        const result = await getAllEmployee();
        console.log("fetch result: ", result);
        setEmployees(result);
        setIsBackdropOpen(false);
    };

    React.useEffect(() => {
        fetchData();
    }, [])

    return (
        <Box sx={{ width: "100%" }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <TableContainer>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 }
                    }}
                >
                        <Typography
                            sx={{ flex: "1 1 100%" }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            員工資料
                        </Typography>
                    <FormDialog refresh={fetchData} />
                </Toolbar>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>員工編號</TableCell>
                            <TableCell align="left">員工名稱</TableCell>
                            <TableCell align="right">時薪</TableCell>
                            <TableCell align="right">工時</TableCell>
                            <TableCell align="right">本月總薪</TableCell>
                            <TableCell align="center">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.employeeId}>
                                <TableCell>{employee.employeeId}</TableCell>
                                <TableCell align="left">{employee.employeeName}</TableCell>
                                <TableCell align="right">{employee.employeeUnitSalary}</TableCell>
                                <TableCell align="right">{employee.employeeWorkingHours}</TableCell>
                                <TableCell align="right">{employee.employeeTotalSalary}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" startIcon={<FeedIcon />} onClick={ ()=>{setIsDialogOpen(true)} }>
                                        詳細資料
                                    </Button>
                                    <IconButton aria-label="delete" onClick={ () => {handleDelete(employee.id)} }>
                                        <DeleteIcon />
                                    </IconButton>
                                    <DetailDialog open={isDialogOpen} setIsDialogOpen={setIsDialogOpen} row={employee} refresh={fetchData}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )   
}