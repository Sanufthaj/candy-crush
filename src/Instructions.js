import { Card, Typography } from "@mui/material";
import React from "react";

function Instructions() {
  return (
    <div>
      <Card sx={{ px: 5,py:4 }}>
        <Typography variant="h5" fontWeight={500} gutterBottom>
          INSTRUCTIONS
        </Typography>
        <Typography>
          The Game is very simple. All u have to do is get 50 points in 10 moves.
        </Typography>
        <Typography>
          If score is less than 50 after 10 moves u LOSE!!!
        </Typography>
      </Card>
    </div>
  );
}

export default Instructions;
