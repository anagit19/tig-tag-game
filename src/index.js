import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Square from './Square'

ReactDOM.render(<App />, document.getElementById('root'));


  
  
  class Board extends React.Component {
     
    
    

    
    renderSquare(i) {
      return (<Square 
      value={this.props.squares[i]}  
      onClick = {()=>this.props.onClick(i)}
      />
      )
    }
  
    render() {


      return (
        <div>
          
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props)
      this.state={
        history:[{
        squares:Array(9).fill(null)
      }],
      stepHistoy: [],
      index: 9,
        xIsNext: true,
        stepNumber:0,
      }
      
    }

    handleClick(i){
      //TODO:  review thiscode  , it shold be not here
      const history=this.state.history.slice(0,this.state.stepNumber+1)
      const current=history[history.length-1]
      const squares1=current.squares.slice()
      const index=i
     
      if(calculateWinner(squares1)||squares1[i]){
        return
      }
      squares1[i]=this.state.xIsNext?'X':'O'
      
   
     
      this.setState({     
        history: history.concat([{squares:squares1}]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        index:index,
        stepHistoy: [...this.state.stepHistoy, index]
     })
  }

  jumpTo(step){
    this.setState({
      stepNumber:step,
      xIsNext:(step%2)===0,

    })
  }
    render() {
      const history=this.state.history
      const current=history[this.state.stepNumber]
      const winner=calculateWinner(current.squares)
    let location=calculateIndex(this.state.index)
      console.log('the location is '+ location)
      console.log('this state index is '+this.state.index)
      const moves =history.map((step,move)=>{
        //const index1=location
        let location=calculateIndex(this.state.stepHistoy[move -1])
        const desc=move?
        'Go to move #'+move +': and the location is '+location:
        'Go to game start'
        return(
          <li key={move}>
            <button onClick={()=>this.jumpTo(move)}>{desc}</button>
          </li>
        )
      })
      
      let status
      if(winner){
        status='Winner:'+winner
      } else{
        status = 'Next player: ' +(this.state.xIsNext?'X':'O')
      }

      
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          </div>
          <div className="game-info">
            <div>{status}</div>
           
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares){
    const lines=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]

    ]
    for(let i=0;i<lines.length;i++){
      const[a,b,c]=lines[i]
      if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c])
      return squares[a];
    }
return null
  }

  function calculateIndex(index){
    const indexes=[[0,0],[0,1],[0,2],[1,0], [1,1],[1,2],[2,0],[2,1],[2,2]]
    if (index<9){
      console.log(indexes[index])
      return indexes[index]
    }
    return
  }