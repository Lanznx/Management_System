import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Navbar(props) {
    return (
        <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Company name
                </Typography>
                <nav>
                <Link
                    variant="button"
                    color="text.primary"
                    href="/"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Features
                </Link>
                <Link
                    variant="button"
                    color="text.primary"
                    href="/price"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Pricing
                </Link>
                </nav>
                <Button href="signin" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar