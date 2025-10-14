import React, { useState } from "react";
import { Box, Typography, FormControlLabel, RadioGroup, Radio, Checkbox } from "@mui/material";
import StyledTextBox from "../StyledTextBox";
import StyledMultiSelect from "../StyledMultiSelect";
import { ScheduleData } from "./ScheduleForm";
import { RRule, RRuleSet, rrulestr } from "rrule";

interface Props {
  repeatEvery: number;
  repeatUnit: string;
  repeatDays: string[];
  repeatEndType: "on" | "after";
  repeatUntil: string;
  repeatCount: number;
  onChange: (key: keyof ScheduleData, value: any) => void;
}

const CustomRecurrence: React.FC<Props> = ({
  repeatEvery,
  repeatUnit,
  repeatDays,
  repeatEndType,
  repeatUntil,
  repeatCount,
  onChange,
}) => {
  const [frequency, setFrequency] = useState("daily"); // Default to daily

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Handle the change for frequency selection
  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(event.target.value);
    onChange("repeatUnit", event.target.value);
  };

  const handleDayChange = (day: string, checked: boolean) => {
    onChange(
      "repeatDays",
      checked ? [...repeatDays, day] : repeatDays.filter((d) => d !== day)
    );
  };

  // Create RRule based on user selection
  const createRRule = () => {
    let freq;
    switch (frequency) {
      case "daily":
        freq = RRule.DAILY;
        break;
      case "weekly":
        freq = RRule.WEEKLY;
        break;
      case "monthly":
        freq = RRule.MONTHLY;
        break;
      case "yearly":
        freq = RRule.YEARLY;
        break;
      default:
        freq = RRule.DAILY;
    }

    const rule = new RRule({
      freq: freq,
      interval: repeatEvery,
      byweekday: frequency === "weekly" ? repeatDays.map((d) => RRule[d.toUpperCase() as keyof typeof RRule]) : [],
      dtstart: new Date(repeatUntil),
      until: repeatEndType === "on" ? new Date(repeatUntil) : undefined, // If "on", set end date
    });

    return rule.toString();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Frequency selector */}
      <Typography variant="body2" fontWeight={600} sx={{ marginTop: 2 }} color="text.secondary">
        Repeat Frequency
      </Typography>
      <RadioGroup
        value={frequency}
        onChange={handleFrequencyChange}
        sx={{ display: "flex", flexDirection: "row", gap: 2 }}
      >
        <FormControlLabel control={<Radio />} label="Every Day" value="daily" />
        <FormControlLabel control={<Radio />} label="Every Week" value="weekly" />
        <FormControlLabel control={<Radio />} label="Every Month" value="monthly" />
        <FormControlLabel control={<Radio />} label="Every Year" value="yearly" />
      </RadioGroup>

      {/* Repeat on (only for weekly) */}
      {frequency === "weekly" && (
        <>
          <Typography variant="body2" fontWeight={600} sx={{ marginTop: 2 }} color="text.secondary">
            Repeat on
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {daysOfWeek.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={repeatDays.includes(day)}
                    onChange={(e) => handleDayChange(day, e.target.checked)}
                    value={day}
                  />
                }
                label={day}
              />
            ))}
          </Box>
        </>
      )}

      {/* Ends options */}
      <Typography variant="body2" fontWeight={600} sx={{ marginTop: 2 }} color="text.secondary">
        Ends
      </Typography>
      <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
        <FormControlLabel
          control={
            <Radio
              checked={repeatEndType === "on"}
              onChange={() => onChange("repeatEndType", "on")}
            />
          }
          label="On"
          value="on"
        />
        {repeatEndType === "on" && (
          <StyledTextBox
            label="On Date"
            value={repeatUntil}
            isEditing
            type="date"
            onChange={(v) => onChange("repeatUntil", v)}
            labelPosition="top"
          />
        )}
        <FormControlLabel
          control={
            <Radio
              checked={repeatEndType === "after"}
              onChange={() => onChange("repeatEndType", "after")}
            />
          }
          label="After"
          value="after"
        />
        {repeatEndType === "after" && (
          <StyledTextBox
            label="Occurrences"
            value={repeatCount}
            isEditing
            type="number"
            onChange={(v) => onChange("repeatCount", v)}
            labelPosition="top"
          />
        )}
      </Box>

      {/* Display RRULE as string */}
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Generated RRULE: <pre>{createRRule()}</pre>
      </Typography>
    </Box>
  );
};

export default CustomRecurrence;
