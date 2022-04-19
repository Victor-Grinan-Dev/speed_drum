import React from 'react'

 function Circle(props) {
  return (
    <div 
        style={{pointerEvents:props.disable ? "auto" : "none"}}
        className={`circle ${props.active ? 'active': ''}`} 
        onClick={props.click}>
        {props.id}
    </div>
  )
}

export default Circle;