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
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
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
      { segment: 'master-equipment', title: 'Master equipment', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'equipment-item', title: 'Equipment item', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  {
    segment: 'participant',
    title: 'Participant',
    icon: <GroupsIcon />,
    children: [
      { segment: 'group-guest', title: 'Group', icon: <ChevronRightOutlinedIcon /> },
      { segment: 'individual-guest', title: 'Individual', icon: <ChevronRightOutlinedIcon /> },
    ],
  },
  {
    segment: 'staff',
    title: 'Staff',
    icon: <AccountCircleOutlinedIcon />,
  },
  {
    segment: 'calendar',
    title: 'Calendar',
    icon: <CalendarMonthIcon />,
  },
  {
    segment: 'manage-flow',
    title: 'Manage Flow',
    icon: <AccountTreeOutlinedIcon />,
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
