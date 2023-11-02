import React, { useCallback, useEffect } from "react";
import "./App.css";
import {
  Box,
  Grid,
  Paper,
} from "@mui/material";
import blank from "./assets/BLANK.png";

import Appbarc from "./Appbarc";
import ScoreBoard from "./ScoreBoard";
import GameOver from "./GameOver";


const width = 8;
const candyColors = [
  "https://github.com/kubowania/candy-crush-reactjs/blob/main/src/images/blue-candy.png?raw=true",
  "https://github.com/kubowania/candy-crush-reactjs/blob/main/src/images/red-candy.png?raw=true",
  "https://github.com/kubowania/candy-crush-reactjs/blob/main/src/images/green-candy.png?raw=true",
  "https://github.com/kubowania/candy-crush-reactjs/blob/main/src/images/orange-candy.png?raw=true",
  "https://github.com/kubowania/candy-crush-reactjs/blob/main/src/images/purple-candy.png?raw=true",
  "https://github.com/kubowania/candy-crush-reactjs/blob/main/src/images/yellow-candy.png?raw=true",
];

function App() {
  const [colorArrangement, setcolorArrangement] = React.useState([]);
  const [draggedSquare, setdraggedSquare] = React.useState();
  const [replacedSquare, setReplacedSquare] = React.useState();
  const [scoreValue, setscoreValue] = React.useState(0);
  const [moveCount, setmoveCount] = React.useState(0);

  const checkColumnofThree = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
      const columnofThree = [i, i + width, i + width * 2];
      const decidedColor = colorArrangement[i];
      const isblank = colorArrangement[i] === blank;

      if (
        columnofThree.every(
          (item) => colorArrangement[item] === decidedColor && !isblank
        )
      ) {
        columnofThree.forEach((item) => (colorArrangement[item] = blank));
        setscoreValue((score) => score + 3);
      }
    }
  }, [colorArrangement]);

  const checkRowofThree = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowofThree = [i, i + 1, i + 2];
      const decidedColor = colorArrangement[i];
      const isblank = colorArrangement[i] === blank;
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowofThree.every(
          (item) => colorArrangement[item] === decidedColor && !isblank
        )
      ) {
        rowofThree.forEach((item) => (colorArrangement[item] = blank));
        setscoreValue((score) => score + 3);
      }
    }
  }, [colorArrangement]);

  const checkColumnofFour = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
      const columnofFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = colorArrangement[i];
      const isblank = colorArrangement[i] === blank;

      if (
        columnofFour.every(
          (item) => colorArrangement[item] === decidedColor && !isblank
        )
      ) {
        columnofFour.forEach((item) => (colorArrangement[item] = blank));
        setscoreValue((score) => score + 4);
      }
    }
  }, [colorArrangement]);

  const checkRowofFour = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowofFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = colorArrangement[i];
      const isblank = colorArrangement[i] === blank;
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowofFour.every(
          (item) => colorArrangement[item] === decidedColor && !isblank
        )
      ) {
        rowofFour.forEach((item) => (colorArrangement[item] = blank));
        setscoreValue((score) => score + 4);
      }
    }
  }, [colorArrangement]);

  const moveToBottomSquare = useCallback(() => {
    for (let i = 0; i <= 55; i++) {
      const firstrow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstrow.includes(i);

      if (isFirstRow && colorArrangement[i] === blank) {
        let randomCandy = Math.floor(Math.random() * candyColors.length);
        colorArrangement[i] = candyColors[randomCandy];
      }

      if (colorArrangement[i + width] === blank) {
        colorArrangement[i + width] = colorArrangement[i];
        colorArrangement[i] = blank;
      }
    }
  }, [colorArrangement]);

  const dragStart = (e) => {
    console.log(e.target);
    // console.log("drag start");
    setdraggedSquare(e.target);
  };
  const dragDrop = (e) => {
    // console.log("drag drop");
    setReplacedSquare(e.target);
  };

  const dragEnd = () => {
    const draggedID = parseInt(draggedSquare.getAttribute("data-id"));
    const replacedID = parseInt(replacedSquare.getAttribute("data-id"));

    colorArrangement[replacedID] = draggedSquare.src;
    colorArrangement[draggedID] = replacedSquare.src;

    const validMoves = [
      draggedID + 1,
      draggedID - 1,
      draggedID + width,
      draggedID - width,
    ];
    // console.log(validMoves);
    const validmove = validMoves.includes(replacedID);

    if (replacedID && validmove) {
      setReplacedSquare(null);
      setdraggedSquare(null);
      setmoveCount((move) => move + 1);
    } else {
      colorArrangement[draggedID] = draggedSquare.src;
      colorArrangement[replacedID] = replacedSquare.src;
      setcolorArrangement([...colorArrangement]);
    }
    // console.log(draggedID);
    // console.log(replacedID);
  };

  const createBoard = () => {
    const randomColorArray = [];
    for (let i = 0; i < width * width; i++) {
      const randomcolor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArray.push(randomcolor);
    }
    setcolorArrangement(randomColorArray);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnofFour();
      checkRowofFour();
      checkColumnofThree();
      checkRowofThree();
      moveToBottomSquare();
      setcolorArrangement([...colorArrangement]);
    }, 100);

    return () => clearInterval(timer);
  }, [
    checkColumnofFour,
    checkRowofFour,
    checkColumnofThree,
    checkRowofThree,
    moveToBottomSquare,
    colorArrangement,
  ]);

  // console.log(colorArrangement);

  return (
    <div className="App">
      <Appbarc />
      
      <Box display="inline-block">
        <Paper elevation={5} sx={{ p: 3}}>
          <Grid
            container
            spacing={0}
            sx={{
              height: "560px",
              width: "560px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // ml: 60,
            }}
          >
            {colorArrangement.map((candyColors, index) => (
              <Grid
                item
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={candyColors}
                  alt="candies"
                  style={{
                    height: "70px",
                    width: "70px",
                  }}
                  data-id={index}
                  draggable={true}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragLeave={(e) => e.preventDefault()}
                  onDragStart={dragStart}
                  onDrop={dragDrop}
                  onDragEnd={dragEnd}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Grid container>
          <Grid item xs={12} p={2}>
            <ScoreBoard scoreValue={scoreValue} moveCount={moveCount} />
          </Grid>
        </Grid>

        <GameOver moveCount={moveCount} scoreValue={scoreValue} />
      </Box>
  
    </div>
  );
}

export default App;
