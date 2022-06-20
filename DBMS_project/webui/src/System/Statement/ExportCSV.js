import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = () => {

  const { fileData, setFileData } = useState();

  // json key should match the header's key

  const [fileHeaders] = useState([
    {label: 'ID', key: 'id'},
    {label: 'First Name', key: 'userDetails.firstName'},
    {label: 'Last Name', key: 'userDetails.lastName'},
    {label: 'Last Name', key: 'userDetails.lastName'},
    {label: 'Location', key: 'userDetails.location'},
    {label: 'Status', key: 'status'},
  ]);

  const handleDataFetch = async() => {
    const response = await fetch('https://localhost:5000/results');
    const respJSON = await response.json();
    setFileData(respJSON)
  };

  useEffect(()=>{
    handleDataFetch();
  }, [])

  return (
    <div>
      <h3>Export to CSV</h3>
      {fileData?.length &&
        <CSVLink
          headers={fileHeaders}
          data={fileData}
          filename="results.csv"
          target="_blank"
        >
          Export
        </CSVLink>
      }
    </div>
  )
}

export default ExportCSV;