import React, { useState, useEffect } from 'react'

import OriginalTable from "./Components/Table"
import { getAllProducts } from "./APIs"

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
  },
];

export default function Product() {
  const [allProducts, setAllProduct] = useState([
    {id: 'chou\'s butt', name: '邱德晏的屁股努力加載中....', price: 50, amount: 1}
  ])

  useEffect(() => {
    const fetchData = async () => {
      let result = await getAllProducts("6cc4a5be-08ba-41de-946d-a2e5c6ed43c2")
      setAllProduct(result)
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <OriginalTable label="Product" rows={allProducts} head={headCells}/>
    </React.Fragment>
  );
}