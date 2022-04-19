import React from 'react'

function Gameover(props) {

  let message = '';
  if (props.score <= 5){
    message = 'Maybe percussion is not your thing';
  }else if (props.score <= 10){
    message = 'No bad... but you need more practice';
  }else{
    message = "Yeah, Rock and Roll, let's doit again!";
  }


  return (
    <div className="overlay">
        <div className="gameover_box">
        <h1>Game Over</h1>
        <p> Archievement: {props.score} hits!</p>
        <button onClick={props.close}>X</button>
        <p>{message}</p>
        </div>    
    </div>
  )
}

export default Gameover