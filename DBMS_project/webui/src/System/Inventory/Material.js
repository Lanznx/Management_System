import { useState, useEffect } from 'react'
import OriginalTable from "./Components/Table"

import { getAllMaterials } from "./APIs"

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
  },
]

export default function MaterialTable(){
  const [allMaterials, setAllMaterials] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      let result = await getAllMaterials("6cc4a5be-08ba-41de-946d-a2e5c6ed43c2")
      setAllMaterials(result)
    }

    fetchData()
  }, [])

  return (
    <OriginalTable label="Material" rows={allMaterials} head={headCells} />
  )
}
