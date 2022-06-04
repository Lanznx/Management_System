import React, { useState, useEffect } from 'react'

import OriginalTable from "./Components/Table"
import { getAllProducts, addNewProduct, getMaterialDict, deleteProduct } from "./APIs"

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

const APIs = {
  addApi: addNewProduct, 
  delApi: deleteProduct,
}

const attribute = [
    {id: "productName", label: "產品名稱", type: "text"},
    {id: "productPrice", label: "價錢", type: "number"},
    {id: "productAmount", label: "數量", type: "number"},
    {id: "materialIds", label: "原料", type: "chip", options: []}
  ]

export default function Product() {
  const [allProducts, setAllProduct] = useState([
    {id: 'chou\'s butt', name: '邱德晏的屁股努力加載中....', price: 50, amount: 1}
  ])
  const [productAttribute, setProductAttribute] = useState(attribute)
  
  const fetchData = async () => {
    let result
    result = await getAllProducts()
    console.log("getAllProduct: ", result)
    setAllProduct(result)

    result = await getMaterialDict()
    console.log("getMaterialDict: ", result)
    attribute[3].options = result
    setProductAttribute(attribute)
  }

  useEffect(() => {
    

    fetchData()
  }, [])

  return (
    <React.Fragment>
      {/* <OriginalTable label="Product" rows={allProducts} head={headCells} attribute={productAttribute} APIs={APIs} refresh={fetchData}/> */}
    </React.Fragment>
  );
}