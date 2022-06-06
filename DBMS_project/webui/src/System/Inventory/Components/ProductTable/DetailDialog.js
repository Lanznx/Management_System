import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

import { updateProductAmount } from '../../APIs';


export default function FormDialog(props) {
    const { open, setIsDialogOpen, refresh } = props

    const [productName, setProductName] = React.useState(props.row.name)
    const [productPrice, setProductPrice] = React.useState(props.row.price)
    const [productAmount, setProductAmount] = React.useState(props.row.amount)

    const handleSubmit = async (productId, amountChange) => {
        console.log("[FormDialog.js handleSubmit] update product: ", productId);
        const resp = await updateProductAmount(productId, amountChange);
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
                        value={productName}
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
                        value={`$${productPrice}`}
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
                        label="數量"
                        value={productAmount}
                        type="number"
                        variant='standard'
                        onChange={(e)=>{setProductAmount(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setIsDialogOpen(false)}} color="primary">
                        取消
                    </Button>
                    <Button onClick={()=>{handleSubmit(props.row.id, productAmount - props.row.amount)}} color="primary">
                        更新
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
