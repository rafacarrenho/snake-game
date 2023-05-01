import { useBoard } from "./useBoard";

export const Board = () => {
  const { drawSnake, foodPosition, matrix } = useBoard();

  return (
    <div className="border-black border-2 flex flex-row flex-wrap w-80 m-auto">
      {matrix.map((columns, rowIndex) => {
        return (
          <div
            key={`row-${rowIndex}`}
            className="row w-full flex flex-row flex-wrap"
          >
            {columns.map((_, columnIndex) => (
              <div
                key={`column-${rowIndex}-${columnIndex}`}
                className={`w-1/20 aspect-square ${
                  drawSnake([rowIndex, columnIndex]) && "bg-slate-500"
                } ${
                  foodPosition.toString() ===
                    [rowIndex, columnIndex].toString() && "bg-slate-500"
                }`}
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
