import { useState, useEffect } from 'react'
import OriginalTable from "./Components/Table"

const axios = require("axios")

export default function MaterialTable(){
  const [allMaterial, setAllMaterial] = useState([])
  useEffect(() => {
    setAllMaterial({})
  })

  return (
    <OriginalTable label="Material" rows={allMaterial}/>
  )
}
