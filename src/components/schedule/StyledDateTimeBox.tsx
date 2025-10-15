import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface Props {
  date: string;
  startTime: string;
  endTime: string;
  onChange: (key: string, value: string) => void;
}

const StyledDateTimeBox: React.FC<Props> = ({
  date,
  startTime,
  endTime,
  onChange,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 700, fontSize: 14 }}
      >
        Date & Time
      </Typography>

      {/* Date */}
      <TextField
        type="date"
        value={date}
        onChange={(e) => onChange("date", e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon
                sx={{ fontSize: 18, color: "text.secondary", ml: 0.5 }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            minHeight: 40,
            "& fieldset": { borderColor: "divider" },
            "&:hover fieldset": { borderColor: "divider" },
            "&.Mui-focused fieldset": { borderColor: "divider" },
          },
          "& input": {
            fontSize: 14,
            color: "text.primary",
            p: "8px 10px",
          },
        }}
      />

      {/* Time range */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          type="time"
          value={startTime}
          onChange={(e) => onChange("startTime", e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeIcon
                  sx={{ fontSize: 18, color: "text.secondary", ml: 0.5 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              minHeight: 40,
              "& fieldset": { borderColor: "divider" },
              "&:hover fieldset": { borderColor: "divider" },
              "&.Mui-focused fieldset": { borderColor: "divider" },
            },
            "& input": {
              fontSize: 14,
              color: "text.primary",
              p: "8px 10px",
            },
          }}
        />

        <Typography sx={{ fontSize: 16, color: "text.secondary" }}>–</Typography>

        <TextField
          type="time"
          value={endTime}
          onChange={(e) => onChange("endTime", e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeIcon
                  sx={{ fontSize: 18, color: "text.secondary", ml: 0.5 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              minHeight: 40,
              "& fieldset": { borderColor: "divider" },
              "&:hover fieldset": { borderColor: "divider" },
              "&.Mui-focused fieldset": { borderColor: "divider" },
            },
            "& input": {
              fontSize: 14,
              color: "text.primary",
              p: "8px 10px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default StyledDateTimeBox;
