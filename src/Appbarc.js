import { AppBar, Typography } from "@mui/material";
import React from "react";

function Appbarc() {
  return (
    <div>
      <AppBar position="static" sx={{ mb: 1 }} color="secondary">
        <Typography variant="h1" mb={1} fontFamily={"sans-serif"}>
          CANDY CRUSH
        </Typography>
      </AppBar>
    </div>
  );
}

export default Appbarc;
