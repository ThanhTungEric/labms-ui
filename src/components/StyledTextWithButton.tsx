import React from "react";
import { Box, Typography, TextField, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type StyledTextWithButtonProps = {
  label: string;
  value: string | number | undefined | null;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;   
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonTooltip?: string;
  type?: string;
};

const StyledTextWithButton: React.FC<StyledTextWithButtonProps> = ({
  label,
  value,
  placeholder = "",
  onChange,
  onSubmit,
  disabled = false,
  buttonAriaLabel = "submit",
  buttonTooltip = "Submit",
  type = "text",
}) => {
  const displayValue = String(value ?? "");

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}
      >
        {label}:
      </Typography>

      <TextField
        value={displayValue}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        size="small"
        fullWidth
        variant="outlined"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          "& .MuiOutlinedInput-root": {
            minHeight: 32,
            borderRadius: 2,
            "& fieldset": { borderColor: "divider" },
            "&:hover fieldset": { borderColor: "divider" },
            "&.Mui-focused fieldset": { borderColor: "divider" },
          },
          "& .MuiOutlinedInput-input": {
            p: "4px 8px",
            fontSize: 14,
            color: "text.primary",
            height: "unset",
          },
        }}
        disabled={disabled}
      />

      <Tooltip title={buttonTooltip}>
        <span>
          <IconButton
            aria-label={buttonAriaLabel}
            onClick={onSubmit}
            disabled={disabled}
            size="small"
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1.5,
              width: 32,
              height: 32,
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default StyledTextWithButton;
