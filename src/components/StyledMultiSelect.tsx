import React, { useState } from 'react';
import {
    Box,
    Button,
    Chip,
    Menu,
    MenuItem,
    styled,
    Select,
    OutlinedInput,
    FormControl,
    InputLabel,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface MoreActionItem {
    key: string;
    label: string;
}

interface StyledMultiSelectProps {
    items: MoreActionItem[];
    selectedKeys: string[];
    onSelectChange: (keys: string[]) => void;
    label: string;
}

const StyledSelectButton = styled(Button)(({ theme }) => ({
    height: '30px',
    minWidth: '120px',
    borderRadius: '5px',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.secondary,
    borderColor: theme.palette.grey[400],
    padding: '8px 8px',
    justifyContent: 'space-between',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        borderColor: theme.palette.grey[500],
    },
}));

const StyledMultiSelect: React.FC<StyledMultiSelectProps> = ({ items, selectedKeys, onSelectChange, label }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (key: string) => {
        const newKeys = selectedKeys.includes(key)
            ? selectedKeys.filter((k) => k !== key)
            : [...selectedKeys, key];
        onSelectChange(newKeys);
    };

    const displayLabel = selectedKeys
        .map((key) => items.find((item) => item.key === key)?.label)
        .filter(Boolean)
        .join(', ');

    return (
        <Box>
            <StyledSelectButton
                variant="outlined"
                onClick={handleOpenMenu}
                endIcon={<ArrowDropDownIcon />}
            >
                {displayLabel || label}
            </StyledSelectButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{ 'aria-labelledby': 'multi-select-button' }}
            >
                {items.map((item) => (
                    <MenuItem
                        key={item.key}
                        onClick={() => handleMenuItemClick(item.key)}
                        selected={selectedKeys.includes(item.key)}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default StyledMultiSelect;