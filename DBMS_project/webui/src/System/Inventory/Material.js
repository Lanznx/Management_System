import { useState, useEffect } from 'react'

import { getAllMaterials, addNewMaterial, deleteMaterial } from "./APIs"

import MaterialTable from './Components/MaterialTable/MaterialTable'

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

export default function Material(){
  const [allMaterials, setAllMaterials] = useState([])

  const fetchData = async () => {
    let result = await getAllMaterials()
    console.log("[Material.js fetchData] getAllMaterial: ", result)
    setAllMaterials(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <MaterialTable rows={allMaterials} head={headCells} APIs={APIs} attribute={attribute} refresh={fetchData}/>
  )
}
