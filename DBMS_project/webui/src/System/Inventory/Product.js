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
  // state
  const [allProducts, setAllProduct] = useState([
    {id: 'chou\'s butt', name: '邱德晏的屁股努力加載中....', price: 50, amount: 1}
  ])
  const [productAttribute, setProductAttribute] = useState(attribute)
  
  const fetchData = async () => {
    let result

    // get product data from API
    result = await getAllProducts("6cc4a5be-08ba-41de-946d-a2e5c6ed43c2")
    console.log("getAllProduct: ", result)
    // set product data to state
    setAllProduct(result)

    // get material dictionary from API
    result = await getMaterialDict("6cc4a5be-08ba-41de-946d-a2e5c6ed43c2")
    console.log("getMaterialDict: ", result)
    // set productInfo.attribute.options to state
    attribute[3].options = result
    // set productInfo to state
    setProductAttribute(attribute)
  }

  useEffect(() => {
    

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <OriginalTable label="Product" rows={allProducts} head={headCells} attribute={productAttribute} APIs={APIs} refresh={fetchData}/>
    </React.Fragment>
  );
}