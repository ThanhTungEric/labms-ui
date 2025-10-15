import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import SchedulePriority from "./SchedulePriority";
import StyledTextBox from "../StyledTextBox";
import StyledDateTimeBox from "./StyledDateTimeBox";
import CustomRecurrence from "./CustomRecurrence";
import SaveButton from "../SaveButton";
import CancelButton from "../CancelButton";
import StyledMultiSelect from "../StyledMultiSelect";
import Participant from "./Participant";

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
  selectedGroups: (string | number)[];
  selectedIndividuals: (string | number)[];
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
    selectedGroups: [],
    selectedIndividuals: [],
  });

  const [repeatOption, setRepeatOption] = useState<string[]>([]);

  const handleChange = (key: keyof ScheduleData, value: string | number | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleMultiSelectChange = (selectedValues: string[]) => {
    setRepeatOption(selectedValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };


  const handleGroupChange = (newValues: (string | number)[]) => {
    setForm((prev) => ({ ...prev, selectedGroups: newValues }));
  };

  const handleIndividualChange = (newValues: (string | number)[]) => {
    setForm((prev) => ({ ...prev, selectedIndividuals: newValues }));
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
        fullWidth={true}
      />

      <StyledDateTimeBox
        date={form.date}
        startTime={form.startTime}
        endTime={form.endTime}
        onChange={(k, v) => handleChange(k as any, v)}
      />

      <StyledMultiSelect
        label="Repeat Options"
        items={[
          { key: "no_repeat", label: "Does not repeat" },
          { key: "daily", label: "Daily" },
          { key: "weekly_on_tuesday", label: "Weekly on Tuesday" },
          { key: "monthly_on_second_tuesday", label: "Monthly on the second Tuesday" },
          { key: "annually_on_october_14", label: "Annually on October 14" },
          { key: "every_weekday", label: "Every weekday (Monday to Friday)" },
          { key: "custom", label: "Custom..." },
        ]}
        selectedKeys={repeatOption}
        onSelectChange={handleMultiSelectChange}
        multiple={false}
        labelPosition="top"
      />

      {repeatOption.includes("custom") && (
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

      <Participant
        selectedGroupValues={form.selectedGroups}
        selectedIndividualValues={form.selectedIndividuals}
        onGroupChange={handleGroupChange}
        onIndividualChange={handleIndividualChange}
      />

      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
        <CancelButton type="button" />
        <SaveButton type="submit">Continue</SaveButton>
      </Stack>
    </Box>
  );
};

export default ScheduleForm;
