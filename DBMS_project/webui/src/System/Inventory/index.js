import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';

import { Route, Routes, Link } from 'react-router-dom';

import ProductTable from './ProductTable'
import MaterialTable from './MaterialTable'

function LinkTab(props) {
  return (
    <Tab
      component={Link}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box>
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="產品" to="product" />
        <LinkTab label="原料" to="material" />
      </Tabs>
      
    </Box>
    <Box>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
                <Route index element={<div>index</div>} />
                <Route label="產品" path="product" element={<ProductTable />} />
                <Route label="原料" path="material" element={<MaterialTable />} />
            </Routes>
        </Container>
    </Box>
    </Box>
  );
}
