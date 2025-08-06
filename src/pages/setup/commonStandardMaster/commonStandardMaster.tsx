import  React , { useEffect, useState } from 'react';
import {
  Box,
  Autocomplete,
  TextField
} from '@mui/material';
import Notification from '../../../components/Notification';
import { useMasterData } from '../../../services/hooks/masterData/masterData';
import { useNotification } from '../../../services/hooks/notification/notification';

export default function CommonStandardMaster() {
    const { masterData, loading, error } = useMasterData();
    const [selected, setSelected] = React.useState('');
    const {notify, showSuccess, showError, showInfo,showWarning, close} = useNotification();
  return (
    
    <Box sx={{ p: 2 }}>
      
      <Autocomplete
        disabled={loading || !!error}
        options={
          masterData?.flatMap((group) =>
            group.items.map((item) => ({
              label: item.name,
              value: item.code,
              group: group.name,
            }))
          ) || []
        }
        groupBy={(option) => option.group}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          setSelected(newValue?.value || '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter char to auto search"
            error={!!error}
            helperText={error ? 'Cannot download list' : ''}
          />
        )}
      />
      <Notification
        open = {true}
        message={'Test'}
        severity={'error'}
        onClose={close}

      />
    </Box>
    
  );
}
