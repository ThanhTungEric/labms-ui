
import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import FacilitiesMaster from '../../pages/operator/general/FacilitiesMaster';
import CommonStandardMaster from '../../pages/operator/general/CommonStandardMaster';
import InfoIcon from '@mui/icons-material/Info';
import { List } from '@mui/material';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import PaidIcon from '@mui/icons-material/Paid';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import InventoryIcon from '@mui/icons-material/Inventory';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ListOfLab from '../../pages/Information/listOfLabs/Information';
import EquipInfo from '../../pages/equipment/equipInfo/equipInfo';
import LabAssets from '../../pages/equipment/labAssets/labAssets';
import MaintenanceAndStocking from '../../pages/equipment/maintenanceAndStocking/maintenanceAndStocking';
import UpgradeAndInvestment from '../../pages/equipment/upgradeAndInvestment/upgradeAndInvestment';
import LabBudget from'../../pages/financial/labBudget/labBudget';
import LabIncomeExpense from '../../pages/financial/labIncomeExpense/labIncomeExpense';
import LabResourceDemand from '../../pages/operation/labResourceDemand/labResourceDemand';
import LabUsageLog from '../../pages/operation/labUsageLog/labUsageLog';
import LabBooking from '../../pages/process/labBooking/labBooking';
import LabSecurity from '../../pages/process/labSecurity/labSecurity';
import LabInventoryPlanning from '../../pages/inventory/labInventoryPlanning/labInventoryPlanning';
import InventoryResultEvaluation from '../../pages/inventory/inventoryResultEvaluation/inventoryResultEvaluation';
import ReportList from '../../pages/report/reportList/reportList';
import GeneralMaster from '../../pages/system/generalMaster/generalMaster';
import UserInformation from '../../pages/system/userInformation/userInformation';

const NAVIGATION = [
    {
        segment: 'information',
        title: 'Information',
        icon: <InfoIcon />,
        children: [
            {
                segment: 'listOfLabs',
                title: 'List of labs',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'labInformation',
                title: 'Lab information',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'equipment',
        title: 'Equipment',
        icon: <DevicesOtherIcon />,
        children: [
            {
                segment: 'equipInfo',
                title: 'Information',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'labAssets',
                title: 'Lab Assets',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'usageHistory',
                title: 'Usage History',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'maintenanceAndStocking',
                title: 'Maintenance & Stocking',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'upgradeAndInvestment',
                title: 'Upgrade & Investment',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'financial',
        title: 'Financial',
        icon: <PaidIcon />,
        children: [
            {
                segment: 'labBudget',
                title: 'Lab Budget',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'labIncomeExpense',
                title: 'Lab Income & Expense',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'operation',
        title: 'Operation',
        icon: <EngineeringIcon />,
        children: [
            {
                segment: 'labUsageLog',
                title: 'Lab Usage Log',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'labResourceDemand',
                title: 'Lab Resource Demand',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'process',
        title: 'Process',
        icon: <PublishedWithChangesIcon />,
        children: [
            {
                segment: 'labBooking',
                title: 'Lab Booking',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'labSecurity',
                title: 'Lab Security',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'inventory',
        title: 'Inventory',
        icon: <InventoryIcon />,
        children: [
            {
                segment: 'labInventoryPlanning',
                title: 'Lab Inventory Planning',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'inventoryResultEvaluation',
                title: 'Inventory Result Evaluation',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'report',
        title: 'Report',
        icon: <SummarizeIcon />,
        children: [
            {
                segment: 'reportList',
                title: 'Report List',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'system',
        title: 'System',
        icon: <SettingsSuggestIcon />,
        children: [
            {
                segment: 'userInformation',
                title: 'User Information',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'generalMaster',
                title: 'General Master',
                icon: <DescriptionIcon />,
            },
        ],
    },

    // {
    //     kind: 'header',
    //     title: 'Main items',
    // },
    // {
    //     kind: 'divider',
    // },
];

const demoTheme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

export default function DashboardLayoutBasic(props) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
            branding={{
                title: 'VGU LABMS',
            }}
        >
            <DashboardLayout>
                <PageContainer>
                    {(() => {
                        switch (router.pathname) {
                            case '/operator/facilities':
                                return <FacilitiesMaster />;
                            case '/operator/commons':
                                return <CommonStandardMaster />;
                            case '/information/listOfLabs':
                                return <ListOfLab />;
                            case '/equipment/equipInfo':
                                return <EquipInfo />;
                            case '/equipment/labAssets':
                                return <LabAssets />;
                            case '/equipment/maintenanceAndStocking':
                                return <MaintenanceAndStocking />;
                            case '/equipment/upgradeAndInvestment':
                                return <UpgradeAndInvestment />;
                            case '/financial/labBudget':
                                return <LabBudget />;
                            case '/financial/labIncomeExpense':
                                return <LabIncomeExpense />;
                            case '/operation/labUsageLog':
                                return <LabUsageLog />;
                            case '/operation/labResourceDemand':
                                return <LabResourceDemand />;
                            case '/process/labBooking':
                                return <LabBooking />;
                            case '/process/labSecurity':
                                return <LabSecurity />;
                            case '/inventory/labInventoryPlanning':
                                return <LabInventoryPlanning />;
                            case '/inventory/inventoryResultEvaluation':
                                return <InventoryResultEvaluation />;
                            case '/report/reportList':
                                return <ReportList />;
                            case '/system/generalMaster':
                                return <GeneralMaster />;
                            case '/system/userInformation':
                                return <UserInformation />;
                            
                            case '/dashboard':
                            default:
                                return (
                                    <Grid container spacing={1}>
                                        <Grid size={5} />
                                        <Grid size={12}><Skeleton height={14} /></Grid>
                                        <Grid size={12}><Skeleton height={14} /></Grid>
                                        <Grid size={4}><Skeleton height={100} /></Grid>
                                        <Grid size={8}><Skeleton height={100} /></Grid>
                                        <Grid size={12}><Skeleton height={150} /></Grid>
                                        <Grid size={12}><Skeleton height={14} /></Grid>
                                        <Grid size={3}><Skeleton height={100} /></Grid>
                                        <Grid size={3}><Skeleton height={100} /></Grid>
                                        <Grid size={3}><Skeleton height={100} /></Grid>
                                        <Grid size={3}><Skeleton height={100} /></Grid>
                                    </Grid>
                                );
                        }
                    })()}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
