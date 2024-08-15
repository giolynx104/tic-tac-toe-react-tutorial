import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

type GameState = "Won" | "Even" | "Playing";

const checkWinning = (boardState: string[]) => {
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
      return eachCombination;
    }
  }

  return null;
};

export function Board({
  player,
  setPlayer,
  setText,
  gameState,
  setGameState,
}: {
  player: string;
  setPlayer: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  const [boardState, setBoardState] = useState(new Array(9).fill(""));
  const [winningCombination, setWinningCombination] = useState<
    number[] | null
  >();
  useEffect(() => {
    let winningCombination = checkWinning(boardState);
    if (winningCombination !== null) {
      setText(`Winner: ${player}`);
      setGameState("Won");
      setWinningCombination(winningCombination);
    }
    if (!boardState.includes("")) {
      setGameState("Even");
      setText(`Even`);
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
              disabled={gameState !== "Playing"}
              variant="outlined"
              onClick={() => {
                if (value !== "") {
                  return;
                }
                let newBoardState = [...boardState];
                newBoardState[index] = player;
                setBoardState(newBoardState);
              }}
              className={`${
                winningCombination?.includes(index)
                  ? "disabled:border-green-400 disabled:border-2 disabled:text-green-400"
                  : ""
              }   w-full h-full text-4xl`}
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
  const [gameState, setGameState] = useState<GameState>("Playing");

  useEffect(() => {
    if (gameState === "Playing") {
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
          gameState={gameState}
          setGameState={setGameState}
        />
        <Button
          variant="contained"
          disabled={gameState === "Playing"}
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
