import React, { useState } from "react";
import { Box, Stack, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import SchedulePriority from "./SchedulePriority";
import StyledTextBox from "../StyledTextBox";
import StyledDateTimeBox from "./StyledDateTimeBox";
import CustomRecurrence from "./CustomRecurrence";
import SaveButton from "../SaveButton";
import CancelButton from "../CancelButton";

export interface ScheduleData {
  mark: string;
  color: string;
  opacity: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  repeatType: string;
  repeatUntil: string;
  repeatEvery: number;
  repeatUnit: string;
  repeatDays: string[];
  repeatEndType: "on" | "after";
  repeatCount: number;
}

interface Props {
  onSubmit: (data: ScheduleData) => void;
}

const ScheduleForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<ScheduleData>({
    mark: "Audience",
    color: "#2C87F2",
    opacity: 100,
    title: "",
    date: "2024-04-17",
    startTime: "08:00",
    endTime: "09:00",
    repeatType: "None",
    repeatUntil: "",
    repeatEvery: 1,
    repeatUnit: "week",
    repeatDays: [],
    repeatEndType: "on",
    repeatCount: 0,
  });

  const [repeatOption, setRepeatOption] = useState<string>("noRepeat");

  const handleChange = (key: keyof ScheduleData, value: string | number | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatOption(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <SchedulePriority
        value={form.mark}
        onChange={(k, v) => handleChange(k as any, v)}
      />

      <StyledTextBox
        label="Title Schedule"
        value={form.title}
        isEditing
        onChange={(v) => handleChange("title", v)}
        labelPosition="top"
      />

      <StyledDateTimeBox
        date={form.date}
        startTime={form.startTime}
        endTime={form.endTime}
        onChange={(k, v) => handleChange(k as any, v)}
      />

      <RadioGroup
        value={repeatOption}
        onChange={handleRadioChange}
        sx={{ display: "flex", flexDirection: "row", gap: 2 }}
      >
        <FormControlLabel
          control={<Radio />}
          label="No repeat"
          value="noRepeat"
        />
        <FormControlLabel
          control={<Radio />}
          label="Repeat"
          value="repeat"
        />
      </RadioGroup>

      {repeatOption === "repeat" && (
        <CustomRecurrence
          repeatEvery={form.repeatEvery}
          repeatUnit={form.repeatUnit}
          repeatDays={form.repeatDays}
          repeatEndType={form.repeatEndType}
          repeatUntil={form.repeatUntil}
          repeatCount={form.repeatCount}
          onChange={handleChange}
        />
      )}

      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
        <CancelButton type="button" />
        <SaveButton type="submit">Continue</SaveButton>
      </Stack>
    </Box>
  );
};

export default ScheduleForm;
