import * as React from 'react';
import { TableRow, TableCell } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";

import DetailDialog from "./DetailDialog";
import { deleteProduct } from "../../APIs";

export default function ProductRow(props){
    const { row, refresh, setIsBackdropOpen } = props;

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleDelete = async (id) => {
        console.log("[ProductRow.js handleDelete] delete product: ", id);
        setIsBackdropOpen(true);
        let resp = await deleteProduct(id);
        console.log("delete resp: ", resp);
        await refresh();
        setIsBackdropOpen(false);
        refresh();
    }

    return (
        <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right">
                <Button variant="outlined" startIcon={<FeedIcon />} onClick={ ()=>{setIsDialogOpen(true)} }>
                    詳細資料
                </Button>
                <IconButton aria-label="delete" onClick={ () => {handleDelete(row.id)} }>
                    <DeleteIcon />
                </IconButton>
                <DetailDialog open={isDialogOpen} setIsDialogOpen={setIsDialogOpen} row={row} refresh={refresh}/>
            </TableCell>
        </TableRow>
    );
}
