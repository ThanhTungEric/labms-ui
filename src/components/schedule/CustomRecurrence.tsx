import React, { useState } from "react";
import { Box, Typography, FormControlLabel, RadioGroup, Radio, Button } from "@mui/material";
import StyledTextBox from "../StyledTextBox";
import StyledMultiSelect from "../StyledMultiSelect";
import { ScheduleData } from "./ScheduleForm";
import { RRule, Weekday } from "rrule";
import StyledLabel from "../StyledLabel";

interface Props {
  repeatEvery: number;
  repeatUnit: string;
  repeatDays: string[];
  repeatEndType: "never" | "on" | "after";
  repeatUntil: string;
  repeatCount: number;
  onChange: (key: keyof ScheduleData, value: any) => void;
}

const REPEAT_UNIT_OPTIONS = [
  { key: "day", label: "day" },
  { key: "week", label: "week" },
  { key: "month", label: "month" },
  { key: "year", label: "year" },
];

const weekdayMap: { [key: string]: Weekday } = {
  S: RRule.SU,
  M: RRule.MO,
  T: RRule.TU,
  W: RRule.WE,
  H: RRule.TH,
  F: RRule.FR,
  A: RRule.SA,
};

const CustomRecurrence: React.FC<Props> = ({
  repeatEvery,
  repeatUnit,
  repeatDays,
  repeatEndType,
  repeatUntil,
  repeatCount,
  onChange,
}) => {
  const currentUnitKey = repeatUnit.toLowerCase().endsWith('ly')
    ? repeatUnit.toLowerCase().replace('ly', '')
    : repeatUnit;

  const [unitKeys, setUnitKeys] = useState<string[]>([currentUnitKey]);

  const currentUnit = unitKeys[0] || 'week';

  const daysOfWeek = ["S", "M", "T", "W", "H", "F", "A"];

  const handleUnitChange = (keys: string[]) => {
    const newUnitKey = keys[0] || 'week';
    setUnitKeys([newUnitKey]);

    const newRepeatUnit = newUnitKey.endsWith('ly') ? newUnitKey : newUnitKey + 'ly';
    onChange("repeatUnit", newRepeatUnit);

    if (newUnitKey !== 'week') {
      onChange("repeatDays", []);
    }
  };

  const handleEndTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange("repeatEndType", event.target.value as "never" | "on" | "after");
  };

  const handleDayChange = (day: string, checked: boolean) => {
    onChange(
      "repeatDays",
      checked ? [...repeatDays, day] : repeatDays.filter((d) => d !== day)
    );
  };

  const createRRule = () => {
    let freq;
    switch (currentUnit) {
      case "day":
        freq = RRule.DAILY;
        break;
      case "week":
        freq = RRule.WEEKLY;
        break;
      case "month":
        freq = RRule.MONTHLY;
        break;
      case "year":
        freq = RRule.YEARLY;
        break;
      default:
        freq = RRule.WEEKLY;
    }

    const byweekday = currentUnit === "week"
      ? repeatDays.map((day) => weekdayMap[day]).filter(Boolean)
      : [];

    const startDate = new Date();

    let untilDate: Date | null = null;
    let count: number | undefined = undefined;

    if (repeatEndType === "on" && repeatUntil) {
      untilDate = new Date(repeatUntil);
      if (isNaN(untilDate.getTime())) untilDate = null;
    } else if (repeatEndType === "after" && repeatCount > 0) {
      count = repeatCount;
    }

    const rule = new RRule({
      freq: freq,
      interval: repeatEvery,
      byweekday: byweekday as Weekday[],
      dtstart: startDate,
      until: untilDate,
      count: count,
    });

    return rule.toString();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <StyledTextBox
          label="Repeat every"
          value={repeatEvery}
          isEditing
          type="number"
          onChange={(v) => onChange("repeatEvery", parseInt(v) || 1)}
          labelPosition="side"
          width={150}
        />
        <StyledMultiSelect
          label=""
          placeholder="unit"
          items={REPEAT_UNIT_OPTIONS}
          selectedKeys={unitKeys}
          onSelectChange={handleUnitChange}
          multiple={false}
          labelPosition="top"
          fullWidth={false}
          width={200}

        />
      </Box>

      {currentUnit === "week" && (
        <Box>
          <StyledLabel
            label="Repeat on"
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            {daysOfWeek.map((day) => (
              <Button
                key={day}
                variant={repeatDays.includes(day) ? "contained" : "outlined"}
                onClick={() => handleDayChange(day, !repeatDays.includes(day))}
                sx={{
                  minWidth: 32,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  fontSize: 12,
                }}
              >
                {day}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      <Box>
        <StyledLabel
          label="Ends"
        />
        <RadioGroup
          value={repeatEndType}
          onChange={handleEndTypeChange}
        >
          <FormControlLabel
            control={<Radio size="small" />}
            label="Never"
            value="never"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={<Radio size="small" />}
              label="On"
              value="on"
            />
            {repeatEndType === "on" && (
              <StyledTextBox
                label=""
                value={repeatUntil}
                isEditing
                type="date"
                onChange={(v) => onChange("repeatUntil", v)}
                labelPosition="top"
                width={200}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={<Radio size="small" />}
              label="After"
              value="after"
            />
            {repeatEndType === "after" && (
              <StyledTextBox
                label=""
                value={repeatCount}
                isEditing
                type="number"
                onChange={(v) => onChange("repeatCount", parseInt(v) || 1)}
                labelPosition="top"
                width={200}
              />
            )}
            {repeatEndType === "after" && (
              <Typography variant="body2">
                occurrences
              </Typography>
            )}
          </Box>
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default CustomRecurrence;
