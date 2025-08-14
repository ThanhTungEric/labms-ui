import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { LoadingPopupProps } from "../services/types/loadingPopup";


export default function LoadingPopup({ open }: LoadingPopupProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
