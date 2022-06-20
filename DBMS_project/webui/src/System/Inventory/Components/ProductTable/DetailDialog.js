import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

export default function FormDialog(props) {
    const { open, setIsDialogOpen } = props

    const [productName, setProductName] = React.useState(props.row.name)
    const [productPrice, setProductPrice] = React.useState(props.row.price)
    const [productAmount, setProductAmount] = React.useState(props.row.amount)

    const handleSubmit = () => {
        setIsDialogOpen(false)
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
                        onChange={(e) => {}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="售價"
                        value={productPrice}
                        type="text"
                        onChange={(e) => {}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="數量"
                        value={productAmount}
                        type="text"
                        onChange={(e) => {}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setIsDialogOpen(false)}} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        確定
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
