import { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Queue, PriorityQueue } from './DataStructures';
// import reportWebVitals from './reportWebVitals';


function Grid() {
  let startArray = new Array(5);
  for (let i = 0; i < 5; i++) {
    startArray[i] = new Array(5).fill('inactive')
  }

  const [value, changeValue] = useState(5);
  const [grid, updateGrid] = useState(startArray);
  const [start, changeStart] = useState(null);
  const [end, changeEnd] = useState(null);

  function sliderChange(e) {
    let val = parseInt(e.target.value)
    changeValue(val);
    let newGrid = new Array(val);
    for (let i = 0; i < val; i++) {
      newGrid[i] = new Array(val).fill('inactive');
    }
    changeStart(null);
    changeEnd(null);
    updateGrid(newGrid);
  }

  function squareClick(x, y) {
    const temp = grid.slice();
    // console.table(temp);
    let state = temp[x][y];
    if (state === 'start') {
      changeStart(null);
      temp[x][y] = 'inactive';
    }
    else if (state === 'end') {
      changeEnd(null);
      temp[x][y] = 'inactive';
    }
    else if (state === 'wall') {
      temp[x][y] = 'inactive';
    }
    else if (!start) {
      changeStart([x, y]);
      temp[x][y] = 'start';
    }
    else if (!end) {
      changeEnd([x, y]);
      temp[x][y] = 'end';
    }
    else {
      temp[x][y] = 'wall';
    }
    updateGrid(temp);
  }

  // Does DFS search on the grid
  function dfsSearch() {
    if (!start || !end) {
      console.error
      ('The current grid does not have a start or end and cannot path find.')
      return;
    }
    let queue = new Queue();
    let visited = [`${start[0]},${start[1]}`];
    // Push into queue with format [coordinate, parents]
    queue.push([start, []]);
    while(!queue.isEmpty()) {
      let [curr, parents] = queue.dequeue();
      let nearby = nearbyCoords(curr);
      for (let x = 0; x < nearby.length; x++) {
        let coords = nearby[x];
        
        // If element reached is the end
        if (coords[0] === end[0] && coords[1] === end[1]) {
          // Make a copy of the path
          let path = parents.map((x) => x);
          path.push(curr);
          
          const tempGrid = grid.slice();

          // Resetting the previous path and explored
          for(let x = 0; x < tempGrid.length; x++) {
            for(let y = 0; y < tempGrid.length; y++) {
              if (tempGrid[x][y] === 'path' || tempGrid[x][y] === 'explored') {
                tempGrid[x][y] = 'inactive';
              }
            }
          }

          for (let i = 1; i < path.length; i++) {
            tempGrid[path[i][0]][path[i][1]] = 'path';
          }

          visited.forEach(coords => {
            coords = coords.split(',');
            coords.forEach((coord, index) => coords[index] = parseInt(coord));
            console.log(coords);
            if (grid[coords[0]][coords[1]] === 'inactive') {
              tempGrid[coords[0]][coords[1]] = 'explored';
            }
          })
          updateGrid(tempGrid);
          return;
        }
        // Else add into queue
        else {
          let eleString = `${coords[0]},${coords[1]}`;
          if (!visited.includes(eleString)) {
            visited.push(eleString);
            let parentsCopy = parents.map((x) => x);
            parentsCopy.push(curr);
            
            queue.push([coords, parentsCopy]);
          }
        }
      }
    }
  }

  // Does A* search with the grid
  function aSearch() {
    if (!start || !end) {
      console.log('failed')
      return;
    }

    console.log('We in it')
    let pq = new PriorityQueue();
    pq.push([start, 0]);
    let cameFrom = grid.map(x => x.map(y => null));

    let gScore = grid.map(x => x.map(y => Infinity));
    gScore[start[0]][start[1]] = 0;

    let fScore = grid.map(x => x.map(y => Infinity));
    fScore[start[0]][start[1]] = heuristic(start);

    let visited = [`${start[0]},${start[1]}`];

    while (!pq.isEmpty()) {
      let [curr, ,] = pq.pop();
      let nearby = nearbyCoords(curr);
      let tempScore = gScore[curr[0]][curr[1]] + 1;
      for (let x = 0; x < nearby.length; x++) {
        let coords = nearby[x];
        if (coords[0] === end[0] && coords[1] === end[1]) {
          // Make a copy of the path
          let path = [curr];
          while (cameFrom[path[0][0]][path[0][1]]) {
            path.unshift(cameFrom[path[0][0]][path[0][1]]);
          }
          const tempGrid = grid.slice();

          // Resetting the previous path and explored
          for(let x = 0; x < tempGrid.length; x++) {
            for(let y = 0; y < tempGrid.length; y++) {
              if (tempGrid[x][y] === 'path' || tempGrid[x][y] === 'explored') {
                tempGrid[x][y] = 'inactive';
              }
            }
          }

          for (let i = 1; i < path.length; i++) {
            tempGrid[path[i][0]][path[i][1]] = 'path';
          }

          visited.forEach(coords => {
            coords = coords.split(',');
            coords.forEach((coord, index) => coords[index] = parseInt(coord));
            console.log(coords);
            if (grid[coords[0]][coords[1]] === 'inactive') {
              tempGrid[coords[0]][coords[1]] = 'explored';
            }
          })
          updateGrid(tempGrid);
          return;
        }

        if (tempScore < gScore[coords[0]][coords[1]]) {
          cameFrom[coords[0]][coords[1]] = curr;
          gScore[coords[0]][coords[1]] = tempScore;
          fScore[coords[0]][coords[1]] = gScore[coords[0]][coords[1]] + heuristic(coords);
          pq.push([coords, fScore[coords[0]][coords[1]]])
        }

        if (!visited.includes(`${coords[0]},${coords[1]}`)) {
          visited.push(`${coords[0]},${coords[1]}`)
        }
      }
    }
    console.log('ended')
  }

  // Helper function to find nearby grid coordinates
  function nearbyCoords(coords) {
    let result = [];
    // Up
    if (coords[0] - 1 >= 0) {
      if (grid[coords[0] - 1][coords[1]] !== 'wall') {
        result.push([coords[0] - 1, coords[1]]);
      }
    }
    // Right
    if (coords[1] + 1 < grid[0].length) {
      if (grid[coords[0]][coords[1] + 1] !== 'wall') {
        result.push([coords[0], coords[1] + 1]);
      }
    }
    // Down
    if (coords[0] + 1 < grid.length) {
      if (grid[coords[0] + 1][coords[1]] !== 'wall') {
        result.push([coords[0] + 1, coords[1]]);
      }
    }
    // Left
    if (coords[1] - 1 >= 0) {
      if (grid[coords[0]][coords[1] - 1] !== 'wall') {
        result.push([coords[0], coords[1] - 1]);
      }
    }
    return result;
  }

  function heuristic(pos) {
    return Math.abs(pos[0] - end[0]) + Math.abs(pos[1] - end[1]);
  }
  
  return (
    <>
      <div id='grid' style={{ gridTemplateColumns: `repeat(${value}, 1fr)`, gridTemplateRows: `repeat(${value}, 1fr)` }}>
        {grid.map((row, x) => {
          // console.log(row);
          return row.map((col, y) => {
            return <Square
              key={`${x},${y}`}
              x={x}
              y={y}
              state={col}
              onClick={squareClick} />
          })
        })}
      </div>
      <div id='menu'>
        <p>Width of grid: {value}</p>
        <input type='range' min={3} max={25} value={value} onChange={sliderChange}></input>
        <button class = 'astar' onClick={aSearch}>A*</button>
        <button class = 'dfs' onClick={dfsSearch}>DFS</button>
      </div>
    </>
  )
}

function Square(props) {

  return (
    <div className={props.state} onClick={() => {
      props.onClick(props.x, props.y);
    }}>
    </div>
  )
}

function App() {
  return (
    <>
      <Grid />

    </>
  );
}

export default App;
