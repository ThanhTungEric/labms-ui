import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  styled,
  Typography,
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
  placeholder?: string;
  multiple?: boolean;
  fullWidth?: boolean;
  /** 👇 NEW: kiểm soát vị trí label */
  labelPosition?: 'side' | 'top';
}

const StyledSelectButton = styled(Button)(({ theme }) => ({
  height: 32,
  minWidth: 160,
  borderRadius: 8,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.primary,
  borderColor: theme.palette.divider,
  padding: '4px 10px',
  justifyContent: 'space-between',
  textTransform: 'none',
  fontSize: 14,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.divider,
  },
}));

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

const LabelText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  color: theme.palette.text.secondary,
  flexShrink: 0,
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
}));

const StyledMultiSelect: React.FC<StyledMultiSelectProps> = ({
  items,
  selectedKeys,
  onSelectChange,
  label,
  placeholder = 'Select',
  multiple = true,
  fullWidth = true,
  labelPosition = 'side', // 👈 default
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  const handleMenuItemClick = (key: string) => {
    if (multiple) {
      const newKeys = selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key];
      onSelectChange(newKeys);
    } else {
      onSelectChange([key]);
      handleCloseMenu();
    }
  };

  const displayLabel =
    selectedKeys
      .map((key) => items.find((item) => item.key === key)?.label)
      .filter(Boolean)
      .join(', ') || placeholder;

  const renderHorizontal = (
    <FieldContainer>
      <LabelText variant="body2">{label}:</LabelText>
      <ButtonWrapper sx={{ width: fullWidth ? '100%' : 'auto' }}>
        <StyledSelectButton
          variant="outlined"
          onClick={handleOpenMenu}
          endIcon={<ArrowDropDownIcon />}
          fullWidth={fullWidth}
        >
          <Box
            sx={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {displayLabel}
          </Box>
        </StyledSelectButton>
      </ButtonWrapper>
    </FieldContainer>
  );

  const renderVertical = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: fullWidth ? '100%' : 'auto' }}>
      <LabelText variant="body2">{label}</LabelText>
      <StyledSelectButton
        variant="outlined"
        onClick={handleOpenMenu}
        endIcon={<ArrowDropDownIcon />}
        fullWidth={fullWidth}
      >
        <Box
          sx={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {displayLabel}
        </Box>
      </StyledSelectButton>
    </Box>
  );

  return (
    <>
      {labelPosition === 'side' ? renderHorizontal : renderVertical}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{ 'aria-labelledby': 'multi-select-button' }}
      >
        {items.map((item) => {
          const selected = selectedKeys.includes(item.key);
          return (
            <MenuItem
              key={item.key}
              onClick={() => handleMenuItemClick(item.key)}
              selected={selected}
              dense
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default StyledMultiSelect;
