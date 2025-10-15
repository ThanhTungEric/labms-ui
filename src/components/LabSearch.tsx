import React from 'react';
import { TextField, InputAdornment, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface LabSearchProps {
    searchValue: string;
    onSearchChange: (v: string) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        height: '32px',
        padding: '0 8px',
        borderRadius: '8px',
        '& fieldset': {
            borderColor: theme.palette.grey[400],
        },
        '&:hover fieldset': {
            borderColor: theme.palette.grey[500],
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '& .MuiInputBase-input': {
            padding: '0',
        },
    },
}));

const LabSearch: React.FC<LabSearchProps> = ({ searchValue, onSearchChange }) => {
    return (
        <StyledTextField
            size="small"
            placeholder="Search by code/name…"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                ),
                endAdornment: searchValue ? (
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={() => onSearchChange('')}>
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ) : undefined,
            }}
            sx={{ ml: 'auto', minWidth: 280 }}
        />
    );
};

export default LabSearch;

function onSearchChange(arg0: { search: any; }) {
    throw new Error('Function not implemented.');
}
function useState(arg0: { applicationType: string; idOrName: string; owner: string; status: string; notSubmitted: boolean; department: string; dateFrom: string; dateTo: string; }): [any, any] {
    throw new Error('Function not implemented.');
}

