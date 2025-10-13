import React from 'react';
import { Stack, Chip } from '@mui/material';

interface NameWithIdChipProps {
    name?: string;
    id?: number | string | null;
    chipPrefix?: string;
}

const NameWithIdChip: React.FC<NameWithIdChipProps> = ({
    id,
    chipPrefix = 'ID',
}) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.25 }}>
            {!!id && (
                <Chip
                    label={`${id}`}
                    size="small"
                    sx={{ fontSize: '0.75rem', height: 22 }}
                />
            )}
        </Stack>
    );
};

export default NameWithIdChip;
