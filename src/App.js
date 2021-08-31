import { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import reportWebVitals from './reportWebVitals';

// let dimension = 5;
// let start;
// let end;

function Grid(props) {
  const [value, changeValue] = useState(5);
  const [start, changeStart] = useState(null);
  const [end, changeEnd] = useState(null);

  /* Handles the onClick for the square,
  allowing its state to be toggled through
   different states */
  function squareClick(x, y, state) {
    console.log(x, y, state)
    console.log(this.start, !start)
    if (state !== "inactive") {
      if (state === "start") {
        changeStart(null);
        return "inactive";
      }
      else if (state === "end") {
        changeEnd(null);
        return "inactive";
      }
      return "inactive";
    }
    else if (!start) {
      if(state === "inactive") {
        // console.log('Time to update starting')
        changeStart([x,y]);
        return "start";
      }
      return state;
    }
    else if (!end) {
      if (state === "inactive") {
        changeEnd([x,y]);
        return "end";
      }
      return state; 
    }
    console.log('reached here???') 
  }

  const [grid, changeGrid] = useState(
    [ [<Square key = '0,0' x={0} y={0} onClick={squareClick} />, <Square key = '0,1' x={0} y={1} onClick={squareClick}/>, <Square key = '0,2' x={0} y={2} onClick={squareClick}/>],
      [<Square key = '1,0' x={1} y={0} onClick={squareClick}/>, <Square key = '1,1' x={1} y={1} onClick={squareClick}/>, <Square key = '1,2' x={1} y={2} onClick={squareClick}/>],
      [<Square key = '2,0' x={2} y={0} onClick={squareClick}/>, <Square key = '2,1' x={2} y={1} onClick={squareClick}/>, <Square key = '2,2' x={2} y={2} onClick={squareClick}/>]]
  );
  
  function handleChange(event) {
    changeValue(event.target.value);
    generateSquares(event.target.value);
  }

  function generateSquares(x) {
    let gridSquares = new Array(x);
    for (let i = 0; i < x; i++) {
      gridSquares[i] = new Array(x);
      for (let j = 0; j < x; j++) {
        gridSquares[i][j] = <Square key = {`${i},${j}`} x={i} y={j} onClick={squareClick}/>;
      }
    }
    changeGrid(gridSquares);
  }

  return (
    <>
      <div id='grid' style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)`, gridTemplateRows: `repeat(${grid.length}, 1fr)` }}>
        {grid}
      </div>
      <input type='range' min={3} max={25} value={value} onChange={handleChange} />
    </>
  );
}

function Square(props) {
  const [state, changeState] = useState("inactive");
  return (
    <div className={state} onClick={() => {
      changeState(props.onClick(props.x, props.y, state));
      // if (state !== 'inactive') {
      //   changeState("inactive")
      //   if (state === "start") {
      //     // props.changeEnds([null, props.ends[1]]);
      //   }
      //   else if (state === "end") {
      //     // props.changeEnds([props.ends[0], null]);
      //   }
      //   // props.grid[props.x][props.y] = 0;
      // }
      // else if (!props.ends[0]) {
      //   changeState("start")
      //   // props.changeEnds([[props.x, props.y], props.ends[1]]);
      //   // props.grid[props.x][props.y] = 1;
      // }
      // else if (!props.ends[1] && state !== 'start') {
      //   changeState("end")
      //   // props.changeEnds([props.ends[0], [props.x, props.y]]);
      //   // props.grid[props.x][props.y] = 2;
      // }
      // else {
      //   changeState("wall")
      //   // props.grid[props.x][props.y] = -1;
      // }
      // console.log('Grid')
      // console.table(props.grid)
    }}>
    </div>
  )
}
function App() {
  return (
    <>
      <Grid/>

    </>
  );
}

/* Code Graveyard 
// function generateGrid(x) {
  //   x = parseInt(x);
  //   let grid = new Array(x);
  //   for (let i = 0; i < x; i++) {
  //     grid[i] = new Array(x).fill(0);
  //   }
  //   return grid;
  // }
*/
export default App;
