import React, { useRef } from "react";
import { Box, TextField, InputAdornment, Typography } from "@mui/material";

interface Props {
  color: string;
  opacity: number;
  onChange: (key: "color" | "opacity", value: string | number) => void;
}

const ColorOpacityField: React.FC<Props> = ({ color, opacity, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const normalizedColor = color.toUpperCase();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        height: 38,
      }}
    >
      <Box
        onClick={() => inputRef.current?.click()}
        sx={{
          width: 28,
          height: 28,
          borderRadius: "6px",
          backgroundColor: color,
          border: "1px solid #ccc",
          cursor: "pointer",
          mx: 0.5,
          flexShrink: 0,
        }}
      />
      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={(e) => onChange("color", e.target.value)}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderLeft: "1px solid #e0e0e0",
          px: 1.5,
          minWidth: 85,
          flexGrow: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, fontSize: 14, color: "text.primary" }}
        >
          {normalizedColor}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderLeft: "1px solid #e0e0e0",
          width: 65,
          flexShrink: 0,
        }}
      >
        <TextField
          value={opacity}
          onChange={(e) => onChange("opacity", Number(e.target.value))}
          type="number"
          variant="standard"
          inputProps={{
            min: 0,
            max: 100,
            style: { textAlign: "right", paddingRight: 0 },
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  fontSize: 13,
                  color: "text.primary",
                  fontWeight: 500,
                  ml: 0.3,
                }}
              >
                %
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiInputBase-root": { height: "100%" },
            "& input[type=number]::-webkit-inner-spin-button": { display: "none" },
            "& input[type=number]::-webkit-outer-spin-button": { display: "none" },
          }}
        />
      </Box>
    </Box>
  );
};

export default ColorOpacityField;
