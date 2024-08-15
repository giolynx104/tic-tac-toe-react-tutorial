import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const checkWinner = (boardState: string[]) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let eachCombination of winningCombinations) {
    const [a, b, c] = eachCombination;
    if (
      boardState[a] !== "" &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return true;
    }
  }

  return false;
};

export function Board({
  player,
  setPlayer,
  setText,
  ended,
  setEnded,
}: {
  player: string;
  setPlayer: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  ended: boolean;
  setEnded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [boardState, setBoardState] = useState(new Array(9).fill(""));
  useEffect(() => {
    if (checkWinner(boardState)) {
      setText(`Winner: ${player}`);
      setEnded(true);
    }
    setPlayer(player === "X" ? "O" : "X");
  }, [boardState]);

  return (
    <Grid container>
      {boardState.map((value, index) => {
        return (
          <Grid
            item
            xs={4}
            key={index}
            className="aspect-square flex justify-center items-center"
          >
            <Button
              disabled={ended}
              variant="outlined"
              onClick={() => {
                if (value !== "") {
                  return;
                }
                let newBoardState = [...boardState];
                newBoardState[index] = player;
                setBoardState(newBoardState);
              }}
              className="w-full h-full text-4xl"
            >
              {value}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}
export default function App() {
  const [player, setPlayer] = useState("O");
  const [text, setText] = useState("Next Player: " + player);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!ended) {
      setText("Next Player: " + player);
    }
  }, [player]);

  return (
    <Box className="w-full flex justify-center items-center">
      <Stack spacing={2}>
        <Typography className="text-center" variant="body1">
          {text}
        </Typography>
        <Board
          player={player}
          setPlayer={setPlayer}
          setText={setText}
          ended={ended}
          setEnded={setEnded}
        />
        <Button
          variant="contained"
          disabled={!ended}
          onClick={() => {
            location.reload();
          }}
        >
          Restart
        </Button>
      </Stack>
    </Box>
  );
}
