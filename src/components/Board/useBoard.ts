import { useEffect, useState } from "react";
import { useTimer } from "../../hooks/useTimer";

type Direction = "right" | "left" | "top" | "bottom";
type FoodPosition = number[];
type Snake = number[][];

export const useBoard = () => {
  const [direction, setDirection] = useState<Direction>("bottom");
  const [foodPosition, setFoodPosition] = useState<FoodPosition>([1, 2]);
  const [snake, setSnake] = useState<Snake>([
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
  ]);

  const { time } = useTimer({ defaultInterval: 100 });

  const squares = 20;
  const matrix = Array.from({ length: squares }, () => Array(squares).fill(0));

  const drawSnake = (value: any) => {
    return snake.some((item) => item.toString() === value.toString());
  };

  const moveSnake = () => {
    const lastRow = snake[snake.length - 1][0];
    const lastColumn = snake[snake.length - 1][1];

    let newSnake = snake;

    if ([lastRow, lastColumn].toString() === foodPosition.toString()) {
      const newFoodPosition = generateRandomPosition(matrix, snake);
      setFoodPosition(newFoodPosition);
    } else {
      newSnake = newSnake.slice(1);
    }

    const move = {
      right: [lastRow, lastColumn + 1],
      left: [lastRow, lastColumn - 1],
      top: [lastRow - 1, lastColumn],
      bottom: [lastRow + 1, lastColumn],
    };

    newSnake.push(move[direction]);
    return setSnake(newSnake);
  };

  function generateRandomPosition(matrix: Snake, ignoredPositions: Snake) {
    // Get the number of rows and columns in the matrix
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Create an array of all positions in the matrix
    const allPositions = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        allPositions.push([i, j]);
      }
    }

    // Filter out any ignored positions
    const availablePositions = allPositions.filter((pos) => {
      for (const ignoredPos of ignoredPositions) {
        if (pos[0] === ignoredPos[0] && pos[1] === ignoredPos[1]) {
          return false;
        }
      }
      return true;
    });

    // Choose a random position from the available positions
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomIndex];
  }

  useEffect(() => {
    function handleKeyDown(event: any) {
      const remember = {
        ArrowUp: "top",
        KeyW: "top",
        ArrowRight: "right",
        KeyD: "right",
        ArrowDown: "bottom",
        KeyS: "bottom",
        ArrowLeft: "left",
        KeyA: "left",
      };

      const deny = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      };

      const newDirection = remember[event.code];
      if (newDirection && deny[newDirection] !== direction) {
        setDirection(remember[event.code]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    moveSnake();
  }, [time]);

  return { drawSnake, foodPosition, matrix };
};
