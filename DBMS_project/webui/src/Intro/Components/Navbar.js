import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

function Navbar(props) {
    return (
        <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Box
                    component="img"
                    sx={{
                    height: 24,
                    mr: 1,
                    ml: 2
                    }}
                    alt="Your logo."
                    src='/bee_vendor_christmas.svg'
                />
                <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 1,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    flexGrow: 1
                }}
                >
                    BeeVendor
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