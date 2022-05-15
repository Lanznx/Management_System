import React, { useState, useEffect } from 'react'

import OriginalTable from "./Components/Table"
import getAllProduct from "./APIs"

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
  // {
  //   id: "expDate",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "剩幾天到期",
  // },
];

export default function Product() {
  var [allProduct, setAllProduct] = useState([
    { id: 'testproductid', name: '可牛奶', price: 30, amount: 5 }
  ])
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllProduct("6cc4a5be-08ba-41de-946d-a2e5c6ed43c2")
      setAllProduct(result)
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <div> "asdasd" { allProduct[0].name }</div>
      <OriginalTable label="Product" rows={allProduct} head={headCells}/>
    </React.Fragment>
  );
}