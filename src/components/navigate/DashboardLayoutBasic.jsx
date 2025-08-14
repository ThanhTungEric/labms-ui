import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import { List } from '@mui/material';

// Icons
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import InventoryIcon from '@mui/icons-material/Inventory';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

// Pages
import FacilitiesMaster from '../../pages/setup/facilitiesmaster';
import CommonStandardMaster from '../../pages/setup/commonStandardMaster/commonStandardMaster';
import EquipInfo from '../../pages/equipment/equipInfo/equipInfo';
import LabAssets from '../../pages/equipment/labAssets/labAssets';
import MaintenanceAndStocking from '../../pages/equipment/maintenanceAndStocking/maintenanceAndStocking';
import UpgradeAndInvestment from '../../pages/equipment/upgradeAndInvestment/upgradeAndInvestment';
import LabBudget from '../../pages/financial/labBudget/labBudget';
import LabIncomeExpense from '../../pages/financial/labIncomeExpense/labIncomeExpense';
import LabResourceDemand from '../../pages/operation/labResourceDemand/labResourceDemand';
import LabUsageLog from '../../pages/operation/labUsageLog/labUsageLog';
import LabBooking from '../../pages/process/labBooking/labBooking';
import LabSecurity from '../../pages/process/labSecurity/labSecurity';
import LabInventoryPlanning from '../../pages/inventory/labInventoryPlanning/labInventoryPlanning';
import InventoryResultEvaluation from '../../pages/inventory/inventoryResultEvaluation/inventoryResultEvaluation';
import ReportList from '../../pages/report/reportList/reportList';
import LabInformation from '../../pages/Information/labInformation/labInformation';
import BuildingTable from '../../pages/site/building';

const NAVIGATION = [
  {
    segment: 'site',
    title: 'Site',
    icon: <BusinessIcon />,
    children: [
      { segment: 'building', title: 'Building', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'floor', title: 'Floor', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'room', title: 'Room', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'lab', title: 'Lab', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  {
    segment: 'equipment',
    title: 'Equipment',
    icon: <DevicesOtherIcon />,
    children: [
      { segment: 'equipInfo', title: 'Information', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'labAssets', title: 'Lab Assets', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'maintenanceAndStocking', title: 'Maintenance & Stocking', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'upgradeAndInvestment', title: 'Upgrade & Investment', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  {
    segment: 'operation',
    title: 'Operation',
    icon: <EngineeringIcon />,
    children: [
      { segment: 'labUsageLog', title: 'Lab Usage Log', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'labResourceDemand', title: 'Lab Resource Demand', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  {
    segment: 'process',
    title: 'Process',
    icon: <PublishedWithChangesIcon />,
    children: [
      { segment: 'labBooking', title: 'Lab Booking', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'labSecurity', title: 'Lab Security', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  {
    segment: 'inventory',
    title: 'Inventory',
    icon: <InventoryIcon />,
    children: [
      { segment: 'labInventoryPlanning', title: 'Lab Inventory Planning', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'inventoryResultEvaluation', title: 'Inventory Result Evaluation', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  {
    segment: 'report',
    title: 'Report',
    icon: <SummarizeIcon />,
    children: [
      { segment: 'reportList', title: 'Report List', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  {
    segment: 'setup',
    title: 'Setup',
    icon: <SettingsSuggestIcon />,
    children: [
      { segment: 'facilitiesMaster', title: 'Facilities Master', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'commonStandardMaster', title: 'Common Standard Master', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  { kind: 'divider' },
  { kind: 'header', title: 'System Actions' },
  { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '& ::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '& ::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.2)',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,.3)',
          },
        },
        '& ::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '.MuiDrawer-paper': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.2)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,.3)',
            },
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        },
      },
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

export default function DashboardLayoutBasic({ window, onLogout }) {
  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{ title: 'VGU LABMS' }}
    >
      <DashboardLayout>
        <PageContainer title={false}>
          {(() => {
            switch (router.pathname) {
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
              case '/site/building':
                return <BuildingTable />;
              case '/site/lab':
                return <LabInformation />;
              case '/setup/facilitiesMaster':
                return <FacilitiesMaster />;
              case '/setup/commonStandardMaster':
                return <CommonStandardMaster />;
              case '/logout':
                if (onLogout) onLogout();
                router.navigate('/login');
                return null;
              case '/dashboard':
              default:
                return (
                  <Grid container spacing={1}>
                    <Grid item xs={12}><Skeleton height={14} /></Grid>
                    <Grid item xs={12}><Skeleton height={14} /></Grid>
                    <Grid item xs={4}><Skeleton height={100} /></Grid>
                    <Grid item xs={8}><Skeleton height={100} /></Grid>
                    <Grid item xs={12}><Skeleton height={150} /></Grid>
                    <Grid item xs={12}><Skeleton height={14} /></Grid>
                    <Grid item xs={3}><Skeleton height={100} /></Grid>
                    <Grid item xs={3}><Skeleton height={100} /></Grid>
                    <Grid item xs={3}><Skeleton height={100} /></Grid>
                    <Grid item xs={3}><Skeleton height={100} /></Grid>
                  </Grid>
                );
            }
          })()}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
