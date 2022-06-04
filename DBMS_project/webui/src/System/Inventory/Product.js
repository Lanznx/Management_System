import React, { useState, useEffect } from 'react'

import ProductTable from './Components/ProductTable/ProductTable'
import { getAllProducts } from "./APIs"

export default function Product() {
  const [allProducts, setAllProduct] = useState([
    {id: 'chou\'s butt', name: '邱德晏的屁股努力加載中....', price: 50, amount: 1}
  ])
  
  const fetchData = async () => {
    let result
    result = await getAllProducts()
    console.log("getAllProduct: ", result)
    setAllProduct(result)
  }

  useEffect(() => {
    

    fetchData()
  }, [])

  return (
    <ProductTable rows={allProducts} refresh={fetchData}/>
  );
}