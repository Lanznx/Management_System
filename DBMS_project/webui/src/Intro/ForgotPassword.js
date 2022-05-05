import * as React from 'react';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';

export default function ForgotPassword(){
    return (
        <React.Fragment>
            <CssBaseline />
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <div> 問我？ </div>
            </Container>
        </React.Fragment>
    )
}