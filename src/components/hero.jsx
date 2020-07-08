import React from 'react';

function Hero() {
  let src = "/img/edward.png"

	return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "4em",
      }}
    >
      <img 
      style={{
        width: "12rem",
        height: "12rem",
      }}
      src={src} />
    </div>
  );
}

export default Hero;
