import React from "react";
import { Box } from "@mui/material";
import StyledMultiSelect from "../StyledMultiSelect";

interface Props {
  value: string;
  onChange: (key: string, value: string | number) => void;
}

const SchedulePriority: React.FC<Props> = ({ value, onChange }) => {
  const priorityOptions = [
    { key: "High", label: "High" },
    { key: "Medium", label: "Medium" },
    { key: "Low", label: "Low" },
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
      <StyledMultiSelect
        label="Priority"
        items={priorityOptions}
        selectedKeys={[value]}
        onSelectChange={(keys) => onChange("priority", keys[0])}
        multiple={false}
        labelPosition="top"
        fullWidth={false}
      />
    </Box>
  );
};

export default SchedulePriority;
