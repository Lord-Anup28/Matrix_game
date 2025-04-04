import React, { useState, useEffect } from "react";

const MatrixGame = () => {
  const gridSize = 3;
  const [grid, setGrid] = useState(Array(gridSize).fill(null).map(() => Array(gridSize).fill("white")));
  const [clickedOrder, setClickedOrder] = useState([]);

  const handleClick = (row, col) => {
    if (grid[row][col] !== "white") return;
    
    const newGrid = grid.map((r, rIdx) =>
      r.map((cell, cIdx) => (rIdx === row && cIdx === col ? "green" : cell))
    );
    setGrid(newGrid);
    setClickedOrder([...clickedOrder, [row, col]]);
  };

  useEffect(() => {
    if (clickedOrder.length === gridSize * gridSize) {
      clickedOrder.forEach(([r, c], index) => {
        setTimeout(() => {
          setGrid((prevGrid) =>
            prevGrid.map((row, rIdx) =>
              row.map((cell, cIdx) => (rIdx === r && cIdx === c ? "orange" : cell))
            )
          );
        }, index * 500);
      });
    }
  }, [clickedOrder]);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, 50px)`, gap: "5px" }}>
        {grid.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: color,
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MatrixGame;
