import { useState, useEffect } from 'react'

import { getAllMaterials } from "./APIs"

import MaterialTable from './Components/MaterialTable/MaterialTable'

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
    <MaterialTable rows={allMaterials} refresh={fetchData}/>
  )
}
