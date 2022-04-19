import React, { Component } from 'react'
import './App.css';

import Button from './UI_components/Button';
import Circle from './UI_components/Button';
import { circles } from './circles';
import Gameover from './UI_components/Gameover';

//random
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default class App extends Component {
  state = {
    score: 0,
    current: -1,
    showGameOver: false,
    pace: 1500,
    rounds: 0,
    gameOn: false,
  }

  timer = null;

  clickHandler = (i) => {
    if (this.state.current !== i){
      this.stopHandler();
      return;
    }
    console.log(i)
    this.state({
      score: this.state.score + 1,
      rounds: this.state.rounds - 1,
    })
  }

  nextCircle = () =>{
    if (this.state.rounds >= 3){
      this.stopHandler();
      return;
    }

    let nextActive;
    do {
      this.nextActive = getRndInteger(0,3);
    }while(nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    console.log('active circle', this.current)
    console.log('rounds', this.state.rounds)

    this.timer = setTimeout(this.nextCircle, this.state.pace);
  }
  startHandler = () => {
    this.nextCircle();
    this.setState({
      gameOn: true,
    })
  }

  stopHandler = () => {
    clearTimeout(this.timer)
    this.setState({
      showGameOver: true,
      gameOn:false
    })
  }

  closeHandler = () => {
    window.location.reload();
    this.setState({
      showGameOver:false,
      score: 0,
      current: -1,
    });
  };

  render() {
    return (
      <div>
        <h1>Speed game</h1>
        <p>your Score: {this.state.score}</p>
        <div className="circles">
          {
            circles.map((_, i) => {
              <Circle 
              key={i} 
              id={i} 
              click={() => this.clickHandler(i)}
              active={this.state.current}
              disable={this.state.gameOn}
              />
            })
          }
        </div>
        <div>
          
          {!this.state.gameOn && (
            <Button click={this.startHandler}>Start</Button>
          )}

          {this.state.gameOn && (
            <Button clck={this.stopHandler}>Stop</Button>
          )}
          
        </div>
        
        {this.state.showGameOver && <Gameover close={this.closeHandler} score={this.state.score}/>}
      </div>
    )
  }
}

