import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { LoadingPopupProps } from "../services/types/loadingPopup";

export default function LoadingInline({ open }: LoadingPopupProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => setShow(true), 200); // delay 200ms
    } else {
      setShow(false); // tắt loader ngay khi open=false
    }
    return () => clearTimeout(timer);
  }, [open]);

  if (!show) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255,255,255,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
