import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './Components/listItems';

import AvatarMenu from './Components/AvatarMenu';

import Inventory from './Inventory';
import CreateOrder from './Order/CreateOrder';
import OrderList from './Order/OrderList';
import Schedule from './Schedule';
import Statement from './Statement';
import Copyright from './Components/Copyright';
import { Route, Routes, useLocation, matchRoutes } from 'react-router';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const location = useLocation()
  const [navTitle, setNavTitle] = React.useState("");
  React.useEffect(() => {
    console.log("[index.js] location", location)
    const routes = [{ path: "/sys/:func" }]
    const matched = matchRoutes(routes, location.pathname)
    const routePage = matched !== null ? matched[0].params.func : ""
    console.log("[index.js] routePage", routePage)

    if(routePage === '' || routePage === 'product' || routePage === 'material') {
      setNavTitle("倉儲管理")
    }else if(routePage === 'createOrder'){
      setNavTitle("新增訂單")
    }else if(routePage === 'OrderList'){
      setNavTitle("訂單列表")
    }else if(routePage === 'schedule'){
      setNavTitle("排班表")
    }else if(routePage === 'statement'){
      setNavTitle("損益表")
    }
  }, [location])

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              backgroundImage: 'linear-gradient(to right, rgb(239 124 29), rgb(255 184 94))',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, color: 'white', fontWeight: 'bold' }}
            >
              {navTitle}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary" sx={{color: 'rgba(255,255,255,.7)'}}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <AvatarMenu src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU" />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}
          PaperProps={{
            sx: {
              backgroundImage: 'url(/asidebg.png)', 
              backgroundPosition: 'left 0 bottom 0', 
              backgroundRepeat: 'no-repeat', 
              backgroundSize: '256px 500px', 
              opacity: '0.9',
            }
          }}
          >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
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
              href="/sys"
              sx={{
                mr: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
                BeeVendor
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            backgroundImage: 'url(/bgimg2.jpg)',
            backgroundPosition: 'top right'
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Routes>
                <Route path="/*" element={<Inventory />} />
                <Route path="createOrder/*" element={<CreateOrder />} />
                <Route path="orderList/*" element={<OrderList />} />
                <Route path="schedule/*" element={<Schedule />} />
                <Route path="statement/*" element={<Statement />} />
            </Routes>
            <Copyright sx={{ pt: 4 }}/>
          </Container>
        </Box>
      </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}