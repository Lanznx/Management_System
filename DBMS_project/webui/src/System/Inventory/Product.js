import React, { useState, useEffect } from 'react'

import OriginalTable from "./Components/Table"
import { getAllProducts, addNewProduct } from "./APIs"

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "名稱",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "售價",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "數量",
  }
];

const newProductInfo = {
  api: addNewProduct, 
  attribute: [
    {id: "materialName", label: "產品名稱", type: "text"},
    {id: "materialPrice", label: "價錢", type: "number"},
    {id: "materialAmount", label: "數量", type: "number"}
  ]
}
export default function Product() {
  const [allProducts, setAllProduct] = useState([
    {id: 'chou\'s butt', name: '邱德晏的屁股努力加載中....', price: 50, amount: 1}
  ])

  useEffect(() => {
    const fetchData = async () => {
      let result = await getAllProducts("6cc4a5be-08ba-41de-946d-a2e5c6ed43c2")
      console.log("getAllProduct: ", result)
      setAllProduct(result)
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <OriginalTable label="Product" rows={allProducts} head={headCells} new={newProductInfo}/>
    </React.Fragment>
  );
}