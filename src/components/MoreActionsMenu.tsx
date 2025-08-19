import React, { useState } from 'react';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface MoreActionItem {
  key: string;
  label: string;
}

interface MoreActionsMenuProps {
  items: MoreActionItem[];
  onActionClick: (key: string) => void;
  label?: string;
}

const StyledMoreActionsButton = styled(Button)(({ theme }) => ({
  height: '30px',
  minWidth: '120px',
  borderRadius: '5px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.secondary,
  borderColor: theme.palette.grey[400],
  padding: '8px 8px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.grey[500],
  },
}));

export default function MoreActionsMenu({ items, onActionClick }: MoreActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (key: string) => {
    onActionClick(key);
    handleCloseMenu();
  };

  return (
    <>
      <StyledMoreActionsButton
        variant="outlined"
        onClick={handleOpenMenu}
        endIcon={<ArrowDropDownIcon />}
      >
        More Actions
      </StyledMoreActionsButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{ 'aria-labelledby': 'more-actions-button' }}
      >
        {items.map((item) => (
          <MenuItem key={item.key} onClick={() => handleMenuItemClick(item.key)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}