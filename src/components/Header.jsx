import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import VGUWhiteLogo from '../assets/VGULogo_horizontal-white.png';
import LanguageToggleButton from './LanguageToggleButton';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar
        position="fixed"
        sx = {{
            width: '100%',
            top: 0,
            backgroundColor: '#F28130'
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            mr: 2,
                            '&:focus': {
                                outline: 'none',
                            },
                        }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <img
                    src={VGUWhiteLogo}
                    alt="VGU Logo"
                    style={{ width: '280px', height: 'auto', alignItems: 'center' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LanguageToggleButton/>
                    <AccountCircleIcon fontSize="medium" />
                </Box>
            </Toolbar>
        </AppBar>
        </Box>
    );
}
