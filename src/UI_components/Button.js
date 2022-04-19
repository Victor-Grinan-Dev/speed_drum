import React from 'react'

 function Button(props) {
  return (
    <Button type={props.type || "button"} onClick={props.click}>
        {props.children}
    </Button>
  );
}

export default Button;