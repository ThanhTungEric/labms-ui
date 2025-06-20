import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Button } from "@mui/material";
import LabInformation from '../labInformation';
import InstructionManual from '../instructionManual/instructionManual';

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

export default function RoomUsageLog() {
  const router = useDemoRouter('/dashboard');

  // Handle routing logic
  switch (router.pathname) {
    case '/information/labInformation':
      return <LabInformation />;
    case '/information/labInformation/instructionManual':
      return <InstructionManual />;
    default:
      break;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.navigate('/information/labInformation')}
          sx={{
            borderRadius: '100px',
            backgroundColor: 'gray',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
            '&:hover': {
              backgroundColor: '#1565c0',
              color: 'white',
            },
          }}
        >
          Room Facilities
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '100px',
            backgroundColor: 'primary',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
          }}
        >
          Room Usage Log
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.navigate('/information/labInformation/instructionManual')}
          sx={{
            borderRadius: '100px',
            backgroundColor: 'gray',
            color: 'white',
            minWidth: '40px',
            padding: '6px 12px',
            '&:hover': {
              backgroundColor: '#1565c0',
              color: 'white',
            },
          }}
        >
          Instruction Manual
        </Button>
      </Box>

      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
      />
    </Box>
  );
}
