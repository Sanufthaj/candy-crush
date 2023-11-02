import React, { useEffect } from "react";
import { Backdrop, Button, Card, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import Confetti from "react-confetti";

function GameOver({ moveCount, scoreValue }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const displayGameOver = () => {
      if (moveCount >= 10) {
        handleOpen();
      }
    };

    displayGameOver();
  }, [moveCount]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Card sx={{ pt: 3, px: 5, pb: 1, borderRadius: 3 }}>
          <Typography variant="h1" fontWeight={700}>
            GAME OVER
          </Typography>

          <Button
            color="secondary"
            variant="contained"
            startIcon={<ReplayIcon />}
            sx={{m:5}}
            onClick={() => window.location.reload(false)}
          >
            RESTART
          </Button>

          {scoreValue > 50 ? (
            <>
              <Typography variant="h1"> You Win!!!!</Typography>
              <Confetti numberOfPieces={300} />
            </>
          ) : (
            <Typography variant="h4">You Lose ...☹</Typography>
          )}
        </Card>
      </Backdrop>
    </div>
  );
}

export default GameOver;
