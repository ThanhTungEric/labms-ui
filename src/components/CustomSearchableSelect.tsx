import React, { useMemo } from 'react';
import {
    FormControl,
    Typography,
    Box,
    styled,
    Autocomplete,
    TextField,
    CircularProgress,
} from '@mui/material';
import StyledLabel from './StyledLabel';

const StyledAutocompleteInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        minHeight: 30,
        borderRadius: 7,
        padding: '4px 8px !important',

        '& fieldset': { borderColor: theme.palette.divider },
        '&:hover fieldset': { borderColor: theme.palette.divider },
        '&.Mui-focused fieldset': { borderColor: theme.palette.divider },

        '& .MuiAutocomplete-input': {
            padding: '0 !important',
            fontSize: 12,
            color: theme.palette.text.primary,
            height: 'auto',
        },
    },
}));

type OptionType = { value: string | number; label: string };

interface StyledSearchableSelectProps {
    label: string;
    options: OptionType[];
    placeholder?: string;
    value: (OptionType['value'] | '')[];
    onChange: (newValue: (OptionType['value'] | '')[]) => void;
    fullWidth?: boolean;
    loading?: boolean;
    multiple?: boolean;
    onInputChange?: (event: React.SyntheticEvent, value: string, reason: string) => void;
    width?: string | number;
}

const StyledSearchableSelect: React.FC<StyledSearchableSelectProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder = `Select ${label}`,
    fullWidth = true,
    loading = false,
    multiple = false,
    width = '100%',
    ...props
}) => {
    const inputId = `searchable-select-${label.toLowerCase().replace(/\s/g, '-')}`;

    const handleChange = (event: any, newValue: OptionType | OptionType[] | null) => {
        const newSelectedValues = Array.isArray(newValue) ? newValue.map(item => item.value) : [];
        onChange(newSelectedValues);
    };

    const selectedOptions = useMemo(() => {
        return options.filter(option => value.includes(option.value));
    }, [value, options]);

    const getOptionLabel = (option: OptionType | string | null | undefined) => {
        if (!option) return '';
        if (typeof option === 'string') {
            return option;
        }
        return option.label;
    };

    const isOptionEqualToValue = (option: OptionType, val: OptionType) => {
        return option.value === val.value;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2, minWidth: 150, width }}>
            <StyledLabel
                label={label}
            />
            <FormControl fullWidth size="small" variant="outlined">
                <Autocomplete
                    id={inputId}
                    multiple={multiple}
                    disableClearable={false}
                    options={options}
                    value={selectedOptions}
                    onChange={handleChange}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderInput={(params) => (
                        <StyledAutocompleteInput
                            {...params}
                            placeholder={placeholder}
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                    slotProps={{
                        paper: {
                            sx: {
                                borderRadius: 1,
                                '& .MuiAutocomplete-option': {
                                    fontSize: 12,
                                    minHeight: 25,
                                    padding: '6px 16px'
                                },
                            },
                        },
                    }}
                    size="small"
                    {...props}
                />
            </FormControl>
        </Box>
    );
};

export default StyledSearchableSelect;
