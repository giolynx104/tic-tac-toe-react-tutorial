import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
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

export function Square({
  position,
  player,
  setPlayer,
  boardState,
  setBoardState,
}: {
  position: number;
  player: string;
  setPlayer: React.Dispatch<React.SetStateAction<string>>;
  boardState: string[];
  setBoardState: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (boardState[position] !== "") {
          return;
        }
        let newBoardState = [...boardState];
        newBoardState[position] = player;
        setBoardState(newBoardState);
        setPlayer(player === "X" ? "O" : "X");
      }}
      className="aspect-square"
    >
      {boardState[position]}
    </Button>
  );
}

export function BoardRow({
  startPosition,
  player,
  setPlayer,
  boardState,
  setBoardState,
}: {
  startPosition: number;
  player: string;
  setPlayer: React.Dispatch<React.SetStateAction<string>>;
  boardState: string[];
  setBoardState: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  let boardRow: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    boardRow.push(
      <Square
        key={startPosition + i}
        position={startPosition + i}
        player={player}
        setPlayer={setPlayer}
        boardState={boardState}
        setBoardState={setBoardState}
      />
    );
  }
  return <Stack direction="row">{boardRow}</Stack>;
}
export function Board({
  player,
  setPlayer,
  setText,
}: {
  player: string;
  setPlayer: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [boardState, setBoardState] = useState(new Array(9).fill(""));
  useEffect(() => {
    if (checkWinner(boardState)) {
      setText(`Winner: ${player === "X" ? "O" : "X"}`);
    }
  });
  let board: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    board.push(
      <BoardRow
        key={i}
        startPosition={3 * i}
        player={player}
        setPlayer={setPlayer}
        boardState={boardState}
        setBoardState={setBoardState}
      />
    );
  }
  return <Stack>{board}</Stack>;
}
export default function App() {
  const [player, setPlayer] = useState("X");
  const [text, setText] = useState("Next Player: " + player);
  const [won, setWon] = useState(false);

  return (
    <Box className="w-full flex justify-center items-center">
      <Stack spacing={2}>
        <Typography className="text-center" variant="body1">
          {text}
        </Typography>
        <Board player={player} setPlayer={setPlayer} setText={setText} />
        <Button
          variant="contained"
          disabled={!won}
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
