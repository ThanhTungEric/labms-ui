import React, { useState } from 'react';
import StyledSearchableSelect from '../CustomSearchableSelect';
import { Box } from '@mui/material';
import { useGgpData, useIgpData } from '@/services/hooks';
import ParticipantDialog from '@/module/participant/master/ParticipantDialog';
import IndividualDialog from '@/module/participant/individual/IndividualDialog';
import CustomButton from '@/components/CustomButton';

interface ParticipantProps {
    selectedGroupValues: (string | number)[];
    selectedIndividualValues: (string | number)[];
    onGroupChange: (newValues: (string | number)[]) => void;
    onIndividualChange: (newValues: (string | number)[]) => void;
}

const Participant: React.FC<ParticipantProps> = ({
    selectedGroupValues,
    selectedIndividualValues,
    onGroupChange,
    onIndividualChange,
}) => {
    const { data: groupData, setSearchName: setGroupSearchName, reload: reloadGroupData } = useGgpData();
    const { data: individualData, setSearchInput: setIndividualSearchInput, reload: reloadIndividualData } = useIgpData();

    const [openGroupDialog, setOpenGroupDialog] = useState(false);
    const [openIndividualDialog, setOpenIndividualDialog] = useState(false);

    const handleOpenGroupDialog = () => setOpenGroupDialog(true);
    const handleCloseGroupDialog = () => {
        setOpenGroupDialog(false);
        reloadGroupData();
    };

    const handleOpenIndividualDialog = () => setOpenIndividualDialog(true);
    const handleCloseIndividualDialog = () => {
        setOpenIndividualDialog(false);
        reloadIndividualData();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <StyledSearchableSelect
                    label="Group Participants"
                    options={groupData.map((group) => ({
                        value: group.id,
                        label: group.name,
                    }))}
                    value={selectedGroupValues}
                    onChange={onGroupChange}
                    multiple={true}
                    placeholder="Select Group Participants"
                    width={250}
                />
                <CustomButton onClick={handleOpenGroupDialog} marginLeft={5} marginRight={5}>Add</CustomButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <StyledSearchableSelect
                    label="Individual Participants"
                    options={individualData.map((individual) => ({
                        value: individual.id,
                        label: `${individual.lastName} ${individual.middleName} ${individual.firstName}`,
                    }))}
                    value={selectedIndividualValues}
                    onChange={onIndividualChange}
                    multiple={true}
                    placeholder="Select Individual Participants"
                    width={250}
                />
                <CustomButton onClick={handleOpenIndividualDialog} marginLeft={5} marginRight={5}>Add</CustomButton>
            </Box>
            <ParticipantDialog
                open={openGroupDialog}
                onClose={handleCloseGroupDialog}
                onSuccess={handleCloseGroupDialog}
            />
            <IndividualDialog
                open={openIndividualDialog}
                onClose={handleCloseIndividualDialog}
                onSuccess={handleCloseIndividualDialog}
            />
        </Box>
    );
};

export default Participant;
