import * as React from 'react';
import { TableRow, TableCell, IconButton } from "@mui/material";
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '@mui/icons-material/';
import Backdrop from "@mui/material/Backdrop";

async function handleDelete(id) {
    console.log("[CollapsibleRow.js handleDelete] delete material: ", id);
    setIsBackdropOpen(true);
    let resp = await props.APIs.delApi(id);
    console.log("delete resp: ", resp);
    await props.refresh();
    setIsBackdropOpen(false);
}

export default function Row(props){
    // row 原料資料
    // history 原料更動紀錄
    // refresh 刷新原料資料 API
    const { row, history, refresh } = props;

    const [expandOpen, setExpandOpen] = React.useState(false);
    const [isBackdropOpen, setIsBackdropOpen] = React.useState(false);

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
                <TableCell> {row.materialName} </TableCell>
                <TableCell> {row.materialPrice} </TableCell>
                <TableCell> {row.materialAmount} </TableCell>
                <TableCell align="right">
                    <Button variant="outlined" startIcon={<FeedIcon />}>
                        詳細資料
                    </Button>
                    <IconButton aria-label="delete" onClick={ () => {handleDelete(row.id)} }>
                        <DeleteIcon />
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                            onClick={handleClose}
                        />
                        <CircularProgress color="inherit" />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandOpen} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                更動紀錄
                            </Typography>
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
                                    {row.history.map((history, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell> {history.date} </TableCell>
                                                <TableCell> {row.materialName} </TableCell>
                                                <TableCell> {history.price} </TableCell>
                                                <TableCell> {history.amount} </TableCell>
                                                <TableCell> {history.price * history.amount} </TableCell>
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