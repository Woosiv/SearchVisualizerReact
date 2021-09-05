import {useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import reportWebVitals from './reportWebVitals';


function Grid() {
  let startArray = new Array(5);
  for(let i =0; i< 5; i++) {
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
    updateGrid(newGrid);
  }

  function squareClick(x, y) {
    const temp = grid.slice();
    console.table(temp);
    let state = temp[x][y];
    if (state !== 'inactive') {
      if (state === 'start') {
        changeStart(null);
      }
      else if (state === 'end') {
        changeEnd(null);
      }
      temp[x][y] = 'inactive';
    }
    else if (!start) {
      changeStart([x,y]);
      temp[x][y] = 'start';
    } 
    else if (!end) {
      changeEnd([x,y]);
      temp[x][y] = 'end';
    }
    else {
      temp[x][y] = 'wall';
    }
    updateGrid(temp);
  }

  return (
    <>
      <div id = 'grid' style={{ gridTemplateColumns: `repeat(${value}, 1fr)`, gridTemplateRows: `repeat(${value}, 1fr)` }}>
        {grid.map((row, x) => {
          // console.log(row);
          return row.map((col, y) => {
            return <Square 
                    key = {`${x},${y}`}
                    x = {x}
                    y = {y}
                    state = {col}
                    onClick = {squareClick}/>
          })
        })}
      </div>
      <p>{value}</p>
      <input type='range' min={3} max={25} value={value} onChange={sliderChange}></input> 
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
      <Grid/>

    </>
  );
}

export default App;
