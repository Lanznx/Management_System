import { TableContainer, Paper } from "@mui/material";

const attribute = [
    {id: "materialName", label: "原料名稱", type: "text"},
    {id: "materialPrice", label: "價錢", type: "number"},
    {id: "materialAmount", label: "數量", type: "number"}
  ]

export default function MaterialTable(){
    return (
        <TableContainer element={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell> 原料名稱 </TableCell>
                        <TableCell> 價錢 </TableCell>
                        <TableCell> 數量 </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
        </TableContainer>
    )
}