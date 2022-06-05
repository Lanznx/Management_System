import * as React from 'react';
import { 
  Routes, 
  Route, 
  //Link 
} from "react-router-dom"
import Container from '@mui/material/Container';

import Navbar from "./Components/Navbar"
import Copyright from './Components/Copyright';

import Feature from './Feature'
import Pricing from './Pricing'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'

export default function Intro(){

    return(
        <React.Fragment>
            <Navbar />
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 4, pb: 3 }}>
            <Routes>
                <Route index element={<Feature />} />
                <Route path="price" element={<Pricing />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgotpassword" element={<ForgotPassword />} />
            </Routes>
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6],
                }}
            >
                <Copyright sx={{ mt: 2 }} />
            </Container>
            {/* End footer */}
        </React.Fragment>
    )
}