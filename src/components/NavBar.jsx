import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { withRouter } from 'react-router-dom';
import { AppConsumer } from '../context/AppContext';

const pages = ['Create a new Form', 'Your Forms', 'History', 'Billing'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const routes = [
    {
        name: 'Create a new Form',
        path: 'create-form'
    },
    {
        name: 'My Forms',
        path: 'my-forms'
    },
    // {
    //     name: 'History',
    //     path: 'history'
    // },
    // {
    //     name: 'Billing',
    //     path: 'billing'
    // },
    {
        name: 'Profile',
        path: 'profile'
    },
];

class NavBar extends React.Component {
    static contextType = AppConsumer;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            anchorElNav: null,
            anchorElUser: null,
        }//end state
    }//end constructor

    componentDidMount() {
        // console.log('from NAV  -> ', this.props.history.location);
    }

    handleCloseNavMenu = () => this.setState({ anchorElNav: null });
    handleOpenNavMenu = (event) => this.setState({ anchorElNav: event.currentTarget });

    handleCloseUserMenu = () => this.setState({ anchorElUser: null });
    handleOpenNavMenu = (event) => this.setState({ anchorElUser: event.currentTarget });

    render() {
        //const { user } = this.context;
        const { anchorElNav, anchorElUser } = this.state;

        if (this.props.history.location.pathname === '/' 
        || this.props.history.location.pathname === '/signup' 
        || this.props.history.location.pathname === '/form'
        ) return null;

        return (
            <AppBar position="static" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TypeForm
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={this.handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {routes.map((route) => (
                                    <MenuItem key={route.name} onClick={() => this.props.history.push(route.path)}>
                                        <Typography textAlign="center">{route.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TypeForm
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {routes.map((route) => (
                                <Button
                                    key={route.name}
                                    onClick={() => this.props.history.push(route.path)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {route.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Profile">
                                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }} style={{ marginRight: 16 }}>
                                    <PersonIcon style={{ color: '#fff' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Open settings">
                                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                                    <SettingsIcon style={{ color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }//end render
}//end class
export default withRouter(NavBar);