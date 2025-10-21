import React from 'react';
import { Stack, Chip } from '@mui/material';

interface NameWithIdChipProps {
    name?: string;
    id?: number | string | null; 
    chipPrefix?: string;
}

const NameWithIdChip: React.FC<NameWithIdChipProps> = ({
    name,
    id,
    chipPrefix = 'ID',
}) => {

    if (name === undefined && id !== undefined && id !== null && id !== 0) {
        return (
            <Chip
                label={`${id}`}
                size="small"
                variant="outlined" 
                sx={{ fontSize: '0.75rem', height: 22, px: 0.5 }}
            />
        );
    }
    
    if (name) {
        return (
            <Chip
                label={name} 
                size="small"
                color="primary" 
                sx={{ fontSize: '0.75rem', height: 22 }}
            />
        );
    }
    
    return null;
};

export default NameWithIdChip;