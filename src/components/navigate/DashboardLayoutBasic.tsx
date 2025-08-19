import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import {
  AppProvider,
  type Navigation,
  type Router as ToolpadRouter,
} from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import InventoryIcon from '@mui/icons-material/Inventory';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import DashboardRoutes from './DashboardRoutes';

const NAVIGATION: Navigation = [
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
    children: [{ segment: 'reportList', title: 'Report List', icon: <ChevronRightOutlinedIcon /> }],
  },
  {
    segment: 'setup',
    title: 'Setup',
    icon: <SettingsSuggestIcon />,
    children: [
      { segment: 'facilities-master', title: 'Facilities Master', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'commonStandardMaster', title: 'Common Standard Master', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  { kind: 'divider' },
  { kind: 'header', title: 'System Actions' },
  { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: { colorSchemeSelector: 'class' },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '& ::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
          backgroundColor: 'transparent',
        },
        '& ::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          borderRadius: '10px',
        },
        '& ::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0,0,0,.3)',
        },
        '.MuiDrawer-paper': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(0,0,0,.3)',
          },
        },
      },
    },
  },
});

interface DashboardLayoutBasicProps {
  onLogout: () => void;
}

export default function DashboardLayoutBasic({ onLogout }: DashboardLayoutBasicProps) {
  const rrNavigate = useNavigate();
  const location = useLocation();

  const router = React.useMemo<ToolpadRouter>(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (url: string | URL) => {
        const to = typeof url === 'string' ? url : url.toString();
        rrNavigate(to);
      },
    }),
    [location.pathname, location.search, rrNavigate],
  );

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{ title: 'VGU LABMS' }}
    >
      <DashboardLayout>
        <PageContainer title="">
          <DashboardRoutes onLogout={onLogout} />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
