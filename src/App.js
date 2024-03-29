import React, { Component } from 'react';

import Button from './components/Button';
import Circle from './components/Circle';
import GameOver from './components/GameOver';
import { circles } from './circles';

import startMusic from './assets/sounds/bg.mp3';
import stopMusic from './assets/sounds/gameover.wav';

import snare from './assets/sounds/snare.mp3';
/*
import kick from './assets/sounds/kick.mp3';
import crash from './assets/sounds/crash.mp3';
import tom1 from './assets/sounds/tom-1.mp3';
import tom2 from './assets/sounds/tom-2.mp3';
import tom3 from './assets/sounds/tom-3.mp3';
import tom4 from './assets/sounds/tom-4.mp3';
*/

const startSound = new Audio(startMusic);
const stopSound = new Audio(stopMusic);

const snare_sound = new Audio(snare);
/*
const kick_sound = new Audio(kick);
const crash_sound = new Audio(crash);
const tom1_sound = new Audio(tom1);
const tom2_sound = new Audio(tom2);
const tom3_sound = new Audio(tom3);
const tom4_sound = new Audio(tom4);
*/


const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    showGameOver: false,
    pace: 1500,
    rounds: 0,
    gameOn: false,
  };

  timer = undefined;

  clickPlay = () => {
    if (snare_sound.paused) {
      snare_sound.play();
    } else {
      snare_sound.currentTime = 0;
    }
  };

  clickHandler = (i) => {
    this.clickPlay();
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }
    this.setState({
      score: this.state.score + 10,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 1) {
      this.stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getRndInteger(0, 3);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    console.log('rounds', this.state.rounds);

    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    startSound.play();
    startSound.loop = true;
    this.nextCircle();
    this.setState({ gameOn: true });
  };

  stopHandler = () => {
    startSound.pause();
    stopSound.play();
    clearTimeout(this.timer);
    this.setState({ showGameOver: true, gameOn: false });
  };

  closeHandler = () => {
    window.location.reload();
  };

  render() {
    let message = '';

    if (this.state.score <= 50) {
      message = 'You can do better';
    } else if (this.state.score >= 51 && this.state.score <= 100) {
      message = 'Pretty good';
    } else {
      message = 'wow!';
    }

    return (
      <div>
        <h1>Speedgame</h1>
        <p>Your score: {this.state.score}</p>
        <div className="circles">
          {circles.map((_, i) => (
            <Circle
              key={i}
              id={i}
              click={() => this.clickHandler(i)}
              active={this.state.current === i}
              disabled={this.state.gameOn}
            />
          ))}
        </div>
        <div>
          {!this.state.gameOn && (
            <Button click={this.startHandler}>START</Button>
          )}
          {this.state.gameOn && <Button click={this.stopHandler}>STOP</Button>}
        </div>
        {this.state.showGameOver && (
          <GameOver
            click={this.closeHandler}
            score={this.state.score}
            message={message}
          />
        )}
      </div>
    );
  }
}

export default App;
