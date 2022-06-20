import * as React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { Box } from "@mui/material";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from "@mui/material";
import FeedIcon from '@mui/icons-material/Feed';

import AddHistoryDialog from "./AddHistoryDialog";

import { getMaterialHistory, deleteMaterial } from '../../APIs'

function descendingComparator(a, b) {
    const orderBy = 'date';
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export default function Row(props){
    console.log("props: ", props);

    // row 原料資料
    // history 原料更動紀錄
    // refresh 刷新原料資料 API
    const { row, refresh } = props;
    const [history, setHistory] = React.useState([]);

    const [expandOpen, setExpandOpen] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleDelete = async (id) => {
        console.log("[CollapsibleRow.js handleDelete] delete material: ", id);
        props.setIsBackdropOpen(true);
        let resp = await deleteMaterial(id);
        console.log("delete resp: ", resp);
        await props.refresh();
        props.setIsBackdropOpen(false);
        refresh();
    }

    const updateHistory = async (materialId) => {
        console.log("[CollapsibleRow.js updateHistory] materialId: ", materialId);
        props.setIsBackdropOpen(true);
        let resp = await getMaterialHistory(materialId);
        console.log("[CollapsibleRow.js updateHistory] resp: ", resp);
        await setHistory(resp);
        props.setIsBackdropOpen(false);
    }

    React.useEffect(() => {
        updateHistory(row.id);
    }, [expandOpen]);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            setExpandOpen(!expandOpen);
                        }}
                    >
                        {expandOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell> {row.name} </TableCell>
                <TableCell align="right"> {row.amount} </TableCell>
                <TableCell align="right">
                    <Button variant="outlined" startIcon={<FeedIcon />} onClick={ ()=>{setIsDialogOpen(true)} }>
                        更動庫存
                    </Button>
                    <IconButton aria-label="delete" onClick={ () => {handleDelete(row.id)} }>
                        <DeleteIcon />
                    </IconButton>
                    <AddHistoryDialog open={isDialogOpen} setIsDialogOpen={setIsDialogOpen} row={row} refresh={updateHistory}/>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandOpen} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {/* <Typography variant="h6" gutterBottom component="div">
                                更動紀錄
                            </Typography> */}
                            <Table size="small" aria-label="history">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> 更動日期 </TableCell>
                                        <TableCell> 名稱 </TableCell>
                                        <TableCell> 價錢 </TableCell>
                                        <TableCell> 數量 </TableCell>
                                        <TableCell> 更動量 </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history
                                    .slice()
                                    .sort((a, b) => descendingComparator(a, b))
                                    .slice(0,5)
                                    .map((record, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell> {record.date} </TableCell>
                                                <TableCell> {row.name} </TableCell>
                                                <TableCell> ${record.price} </TableCell>
                                                <TableCell> {record.amount} </TableCell>
                                                <TableCell> ${record.price * record.amount} </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}