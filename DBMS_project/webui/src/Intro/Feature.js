import * as React from 'react';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';

function Feature(){
    return (
        <React.Fragment>
            <CssBaseline />
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <div> Feature </div>
            </Container>
        </React.Fragment>
    )
}

export default Feature