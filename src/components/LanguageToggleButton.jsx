import LanguageIcon from '@mui/icons-material/Language';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function LanguageToggleButton () {
    const [language, setLanguage] = useState('EN');

    // change
    const handleLanguageChange = () => {
        setLanguage(prev => (prev === 'EN' ? 'VN' : 'EN'))
    }

    return (
        <>
            <Button
            variant='contained'
            size="small"
            sx={{
            mr: 5,
            backgroundColor: 'white',
            color: '#F28130',
            '&:focus': {
                outline: 'none',
            },
            fontWeight: 'bold',
            }}
            onClick={() => handleLanguageChange('VN')}
        >
            <LanguageIcon sx={{ mr: 1 }} />
            {language}
        </Button>
        </>
    )
}