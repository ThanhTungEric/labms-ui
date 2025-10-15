import * as React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { BuildingTable, CalendarPage, CommonStandardMaster, EquipmentItemManagement, EquipmentManagement, FacilitiesMaster, FloorManagement, IndividualManagement, LabManagement, ManageFLPage, ParticipantManagement, RoomManagement, StaffManagement } from '@/pages';
import DashboardContent from './DashboardContent';

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

            <Route path="/staff" element={<StaffManagement/>} />

            <Route path="/calendar" element={<CalendarPage />} />

            <Route path="/manage-flow" element={<ManageFLPage />} />

            <Route path="setup/facilities-master" element={<FacilitiesMaster />} />
            <Route path="setup/commonStandardMaster" element={<CommonStandardMaster />} />
            <Route path="logout" element={<Logout onLogout={onLogout} />} />

            <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
    );
};

export default DashboardRoutes;
