import React from 'react';
import { Typography, Box } from '@mui/material';

type StyledLabelProps = {
    label: string;
    labelPosition?: 'side' | 'top';
};

const StyledLabel: React.FC<StyledLabelProps> = ({ label, labelPosition = 'side' }) => {
    if (labelPosition === 'top') {
        return (
            <Box display="flex" flexDirection="column" gap={0.5} width="100%">
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14 }}>
                    {label}
                </Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" alignItems="center" gap={1} width="100%" marginBottom={0.5}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                {label}
            </Typography>
        </Box>
    );
};

export default StyledLabel;
