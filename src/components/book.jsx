import React from 'react';

// {props.name}
// <img src={props.src}/>
function Book(props) {
  const { imgURL } = props;

	return (
    <img 
      style={{
      }}
      src={imgURL} />
  );
}

export default Book;
