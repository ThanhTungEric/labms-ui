import * as React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import tất cả các trang
import FacilitiesMaster from '../../pages/setup/facilitiesmaster';
import CommonStandardMaster from '../../pages/setup/commonStandardMaster/commonStandardMaster';
import LabBudget from '../../pages/financial/labBudget/labBudget';
import LabIncomeExpense from '../../pages/financial/labIncomeExpense/labIncomeExpense';
import LabResourceDemand from '../../pages/operation/labResourceDemand/labResourceDemand';
import LabUsageLog from '../../pages/operation/labUsageLog/labUsageLog';
import LabBooking from '../../pages/process/labBooking/labBooking';
import LabSecurity from '../../pages/process/labSecurity/labSecurity';
import LabInventoryPlanning from '../../pages/inventory/labInventoryPlanning/labInventoryPlanning';
import InventoryResultEvaluation from '../../pages/inventory/inventoryResultEvaluation/inventoryResultEvaluation';
import ReportList from '../../pages/report/reportList/reportList';
import LabManagement from '../../pages/site/lab';
import FloorManagement from '../../pages/site/floor';
import RoomManagement from '../../pages/site/room';
import BuildingTable from '../../pages/site/building';
import DashboardContent from './DashboardContent';

import EquipmentManagement from '../../pages/equipment/master';

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

            <Route path="financial/labBudget" element={<LabBudget />} />
            <Route path="financial/labIncomeExpense" element={<LabIncomeExpense />} />

            <Route path="operation/labUsageLog" element={<LabUsageLog />} />
            <Route path="operation/labResourceDemand" element={<LabResourceDemand />} />

            <Route path="process/labBooking" element={<LabBooking />} />
            <Route path="process/labSecurity" element={<LabSecurity />} />

            <Route path="inventory/labInventoryPlanning" element={<LabInventoryPlanning />} />
            <Route path="inventory/inventoryResultEvaluation" element={<InventoryResultEvaluation />} />

            <Route path="report/reportList" element={<ReportList />} />

            <Route path="setup/facilities-master" element={<FacilitiesMaster />} />
            <Route path="setup/commonStandardMaster" element={<CommonStandardMaster />} />
            <Route path="logout" element={<Logout onLogout={onLogout} />} />

            <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
    );
};

export default DashboardRoutes;
