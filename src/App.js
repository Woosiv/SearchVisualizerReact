import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import reportWebVitals from './reportWebVitals';

function Grid(props) {
  const [value, changeValue] = useState(5);
  const [start, changeStart] = useState(null);
  const [end, changeEnd] = useState(null);
  const [grid, changeGrid] = useState([]);

  function handleChange(event) {
    changeValue(event.target.value);    // console.log('value is', value)    // generateSquares(event.target.value, start, changeStart, end, changeEnd);
  }

  useEffect(() => {
    /* Handles the onClick for the square,
    allowing its state to be toggled through
    different states */
    function squareClick(x, y, state) {
      console.log(x,y,state);
      if(state !== 'inactive') {
        if(state === 'start') {
          changeStart(null);
        }
        else if (state === 'end') {
          changeEnd(null);
        }
        return 'inactive';
      }
      else if (!start) {
        changeStart([x,y]);
        return 'start';
      }
      else if (!end) {
        changeEnd([x,y]);
        return 'end';
      }
      return 'wall';
    }
    
    let gridSquares = new Array(value);
    for (let i = 0; i < value; i++) {
      gridSquares[i] = new Array(value);
      for (let j = 0; j < value; j++) {
        gridSquares[i][j] = <Square 
                              key = {`${i},${j}`}
                              x={i}
                              y={j}
                              test='pepelaff'
                              onClick={squareClick} />;
      }
    }
    changeGrid(gridSquares);
  }, [value, start, end]);

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
      changeState(props.onClick(props.x, props.y, state))
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
*/
export default App;
