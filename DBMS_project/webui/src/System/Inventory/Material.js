import { useState, useEffect } from 'react'
import OriginalTable from "./Components/Table"

import { getAllMaterials, addNewMaterial, deleteMaterial } from "./APIs"

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "名稱",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "數量",
  }
]

const APIs = {
  addApi: addNewMaterial,
  delApi: deleteMaterial,
}

const attribute = [
    {id: "materialName", label: "原料名稱", type: "text"},
    {id: "materialPrice", label: "價錢", type: "number"},
    {id: "materialAmount", label: "數量", type: "number"}
  ]

export default function MaterialTable(){
  const [allMaterials, setAllMaterials] = useState([])

  const fetchData = async () => {
    let result = await getAllMaterials("6cc4a5be-08ba-41de-946d-a2e5c6ed43c2")
    console.log("getAllMaterial: ", result)
    setAllMaterials(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <OriginalTable label="Material" rows={allMaterials} head={headCells} APIs={APIs} attribute={attribute} refresh={fetchData}/>
  )
}
