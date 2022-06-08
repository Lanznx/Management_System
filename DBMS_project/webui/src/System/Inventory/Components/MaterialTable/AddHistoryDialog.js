import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

import { updateMaterialAmount } from '../../APIs';


export default function AddHistoryDialog(props) {
    const { open, setIsDialogOpen, refresh } = props

    // const [materialName, setMaterialName] = React.useState(props.row.name)
    const [materialPrice, setMaterialPrice] = React.useState(0)
    const [materialAmount, setMaterialAmount] = React.useState(0)

    const handleSubmit = async (materialId, amountChange) => {
        console.log("[FormDialog.js handleSubmit] update product: ", materialId);
        const resp = await updateMaterialAmount(materialId, amountChange, materialPrice);
        console.log("update resp: ", resp);
        await refresh();
        setIsDialogOpen(false);
    }

    return (
        <Box>
            <Dialog open={open} onClose={()=>{setIsDialogOpen(false)}}>
                <DialogTitle> 產品詳細資料 </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="品名"
                        value={props.row.name}
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
                        label="售價"
                        value={`${materialPrice}`}
                        type="text"
                        variant='standard'
                        onChange={(e)=>{setMaterialPrice(e.target.value)}}
                        InputProps={{
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="數量"
                        value={materialAmount}
                        type="number"
                        variant='standard'
                        onChange={(e)=>{setMaterialAmount(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setIsDialogOpen(false)}} color="primary">
                        取消
                    </Button>
                    <Button onClick={()=>{handleSubmit(props.row.id, materialAmount)}} color="primary">
                        更新
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
