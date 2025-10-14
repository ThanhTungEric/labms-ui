import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Button, Typography } from "@mui/material";
import { CreateScheduleDialog, CustomButton } from "@/components";
import listPlugin from "@fullcalendar/list";

const CalendarPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Test Final Present",
      start: "2025-10-13T09:00:00",
      end: "2025-10-13T10:30:00",
      backgroundColor: "#4CAF50",
      borderColor: "#4CAF50",
    },
    {
      id: "2",
      title: "Finishing Web AI",
      start: "2025-10-14T08:30:00",
      end: "2025-10-14T10:00:00",
      backgroundColor: "#2C87F2",
      borderColor: "#2C87F2",
    },
    {
      id: "3",
      title: "Session Photoshoot",
      start: "2025-10-14T10:30:00",
      end: "2025-10-14T12:30:00",
      backgroundColor: "#F5A623",
      borderColor: "#F5A623",
    },
    {
      id: "4",
      title: "Meeting With Marc",
      start: "2025-10-13T11:35:00",
      end: "2025-10-13T13:00:00",
      backgroundColor: "#E57373",
      borderColor: "#E57373",
    },
    {
      id: "5",
      title: "Wireframe Apps",
      start: "2025-10-14T12:30:00",
      end: "2025-10-14T13:30:00",
      backgroundColor: "#26A69A",
      borderColor: "#26A69A",
    },
    {
      id: "6",
      title: "Feedback Website",
      start: "2025-10-15T00:15:00",
      end: "2025-10-15T02:00:00",
      backgroundColor: "#9C27B0",
      borderColor: "#9C27B0",
    },
    {
      id: "7",
      title: "Start New Project",
      start: "2025-10-15T13:30:00",
      end: "2025-10-15T15:00:00",
      backgroundColor: "#007AFF",
      borderColor: "#007AFF",
    },
    {
      id: "8",
      title: "UX Review Meeting",
      start: "2025-10-16T09:00:00",
      end: "2025-10-16T10:30:00",
      backgroundColor: "#03A9F4",
      borderColor: "#03A9F4",
    },
    {
      id: "9",
      title: "Team Retrospective",
      start: "2025-10-16T15:00:00",
      end: "2025-10-16T16:00:00",
      backgroundColor: "#FF7043",
      borderColor: "#FF7043",
    },
    {
      id: "10",
      title: "Design Sync Meeting",
      start: "2025-10-17T10:00:00",
      end: "2025-10-17T11:30:00",
      backgroundColor: "#8BC34A",
      borderColor: "#8BC34A",
    },
  ]);

  const handleAddSchedule = (data: any) => {
    const newEvent = {
      id: String(events.length + 1),
      title: data.title,
      start: `${data.date}T${data.startTime}`,
      end: `${data.date}T${data.endTime}`,
      backgroundColor: data.color || "#2C87F2",
      borderColor: data.color || "#2C87F2",
    };
    setEvents((prev) => [...prev, newEvent]);
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1}}>
        <CustomButton onClick={() => setOpen(true)}>Create Schedule</CustomButton>
      </Box>

      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        initialDate="2025-10-13"
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        allDaySlot={false}
        height="80vh"
        nowIndicator={true}
        events={events}
        editable={false}
        selectable={true}
        dayHeaderFormat={{ weekday: "long", day: "numeric" }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth,listWeek",
        }}
        views={{
          timeGridDay: { buttonText: "Day" },
          timeGridWeek: { buttonText: "Week" },
          dayGridMonth: { buttonText: "Month" },
          listWeek: { buttonText: "List" },
        }}
      />


      <CreateScheduleDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default CalendarPage;
