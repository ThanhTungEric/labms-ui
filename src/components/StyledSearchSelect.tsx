import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export interface SearchSelectItem {
    key: number;
    label: string;
}

interface StyledSearchSelectProps {
    items: SearchSelectItem[];
    selectedKey: number | null;
    onSelectChange: (key: number | null) => void;
    label: string;
}

const StyledSearchSelect: React.FC<StyledSearchSelectProps> = ({ items, selectedKey, onSelectChange, label }) => {
    const selectedItem = items.find(item => item.key === selectedKey) || null;

    const handleChange = (event: any, newValue: SearchSelectItem | null) => {
        onSelectChange(newValue ? newValue.key : null);
    };

    return (
        <Autocomplete
            options={items}
            getOptionLabel={(option) => option.label}
            value={selectedItem}
            onChange={handleChange}
            fullWidth
            size="small"
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            minHeight: 32,
                            borderRadius: 1,
                            '& fieldset': { borderColor: 'divider' },
                        },
                        '& .MuiInputBase-input': { p: 0.5, fontSize: 14, color: 'text.primary' },
                    }}
                />
            )}
        />
    );
};

export default StyledSearchSelect;