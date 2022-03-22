import React from "react";
import { CELL_SIZE, HEIGHT, WIDTH } from "../app.config";
import { GameOfLife } from "../services/game-of-life";
import Cell from "./Cell";

export const Game = (props: any): JSX.Element => {
  const rows = HEIGHT / CELL_SIZE;
  const columns = WIDTH / CELL_SIZE;
  const gameOfLife = new GameOfLife();
  const [cells, setCells] = React.useState<any[]>([]);
  const [board, setBoard] = React.useState(
    gameOfLife.makeEmptyBoard(rows, columns)
  );

  React.useEffect(() => {
    setInterval(() => {
      runIteration();
    }, 400);
  }, []);

  const runIteration = () => {
    const updatedBoard = gameOfLife.runIteration(rows, columns, board);
    setBoard(updatedBoard);
    setCells(gameOfLife.makeCells(rows, columns, updatedBoard));
  };
  return (
    <div>
      <div
        className="Board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      >
        {cells.map((cell) => (
          <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
        ))}
      </div>
    </div>
  );
};
