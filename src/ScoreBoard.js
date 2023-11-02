import { Backdrop, Card, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import Instructions from "./Instructions";

function ScoreBoard({ scoreValue, moveCount }) {
  const [open, setopen] = React.useState(false);

  return (
    <div>
      <Card  elevation={6} sx={{ p: 1 }} >
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h3" fontWeight={700}>
              Score : {scoreValue}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h3">{moveCount}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="large" onClick={() => setopen(true)}>
              <InfoIcon fontSize="inherit" />
            </IconButton>
            <Backdrop
              sx={{ color: "#", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={() => setopen(false)}
            >
              <Instructions/>
            </Backdrop>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default ScoreBoard;
