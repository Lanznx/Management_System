import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';

import { Route, Routes, Link } from 'react-router-dom';

import ProductTable from './Product'
import MaterialTable from './Material'

function LinkTab(props) {
  return (
    <Tab
      component={Link}
      {...props}
    />
  );
}


export default function NavTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <Box>
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="存貨管理" to="product" />
        <LinkTab label="原料管理" to="material" />
      </Tabs>
      
    </Box>
    <Box>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
                <Route index element={<ProductTable />} />
                <Route label="存貨管理" path="product" element={<ProductTable />} />
                <Route label="原料管理" path="material" element={<MaterialTable />} />
            </Routes>
        </Container>
    </Box>
    </Box>
  );
}
