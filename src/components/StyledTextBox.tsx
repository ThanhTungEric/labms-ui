import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

type StyledTextBoxProps = {
    label: string;
    value: string | number | undefined | null;
    isEditing?: boolean;
    onChange?: (value: string) => void;
};

export default function StyledTextBox({ label, value, isEditing = false, onChange }: StyledTextBoxProps) {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                {label}:
            </Typography>

            {isEditing ? (
                <TextField
                    value={String(value ?? '')}
                    placeholder="—"
                    onChange={(e) => onChange?.(e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                            minHeight: 32,
                            borderRadius: 1,
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'divider' },
                            '&.Mui-focused fieldset': { borderColor: 'divider' },
                        },
                        '& .MuiOutlinedInput-input': { p: 0.5, fontSize: 14, color: 'text.primary' },
                    }}
                />
            ) : (
                <Box
                    p={0.5}
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
                    {value ?? '—'}
                </Box>
            )}
        </Box>
    );
}
