import * as React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import FacilitiesMaster from '../../pages/setup/facilitiesmaster';
import CommonStandardMaster from '../../pages/setup/commonStandardMaster/commonStandardMaster';
import LabManagement from '../../pages/site/lab';
import FloorManagement from '../../pages/site/floor';
import RoomManagement from '../../pages/site/room';
import BuildingTable from '../../pages/site/building';
import DashboardContent from './DashboardContent';

import EquipmentManagement from '../../pages/equipment/master';
import EquipmentItemManagement from '@/pages/equipment/item';
import ParticipantManagement from '@/pages/participant/group';
import IndividualManagement from '@/pages/participant/individual/PersonManagement';
import CalendarPage from '@/pages/calendar';

interface LogoutProps {
    onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        onLogout?.();
        navigate('/login', { replace: true });
    }, [onLogout, navigate]);

    return null;
};

interface DashboardRoutesProps {
    onLogout: () => void;
}

const DashboardRoutes: React.FC<DashboardRoutesProps> = ({ onLogout }) => {
    return (
        <Routes>
            <Route path="/" element={<DashboardContent />} />

            <Route path="site/building" element={<BuildingTable />} />
            <Route path="site/floor" element={<FloorManagement />} />
            <Route path="site/room" element={<RoomManagement />} />
            <Route path="site/lab" element={<LabManagement />} />

            <Route path="equipment/master-equipment" element={<EquipmentManagement />} />
            <Route path="equipment/equipment-item" element={<EquipmentItemManagement />} />

            <Route path="participant/group-guest" element={<ParticipantManagement />} />
            <Route path="participant/individual-guest" element={<IndividualManagement />} />

             <Route path="/calendar" element={<CalendarPage />} />

            <Route path="setup/facilities-master" element={<FacilitiesMaster />} />
            <Route path="setup/commonStandardMaster" element={<CommonStandardMaster />} />
            <Route path="logout" element={<Logout onLogout={onLogout} />} />

            <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
    );
};

export default DashboardRoutes;
