import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

type StyledTextBoxProps = {
    label: string;
    value: string | number | undefined | null;
    isEditing?: boolean;
    onChange?: (value: string) => void;
    type?: string;
};

export default function StyledTextBox({
    label,
    value,
    isEditing = false,
    onChange,
    type = 'text',
}: StyledTextBoxProps) {
    const displayValue = String(value ?? '');

    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}
            >
                {label}:
            </Typography>

            {isEditing ? (
                <TextField
                    value={displayValue}
                    type={type}
                    placeholder=""
                    onChange={(e) => onChange?.(e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        '& .MuiOutlinedInput-root': {
                            minHeight: 32,
                            borderRadius: 2,
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'divider' },
                            '&.Mui-focused fieldset': { borderColor: 'divider' },
                        },
                        '& .MuiOutlinedInput-input': {
                            p: '4px 8px',
                            fontSize: 14,
                            color: 'text.primary',
                            height: 'unset',
                        },
                    }}
                />
            ) : (
                <Box
                    p="4px 8px"
                    border={1}
                    borderColor="divider"
                    borderRadius={1}
                    flex={1}
                    minHeight={32}
                    display="flex"
                    alignItems="center"
                    fontSize={14}
                    color="text.primary"
                >
                    {displayValue}
                </Box>
            )}
        </Box>
    );
}
