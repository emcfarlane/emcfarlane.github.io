import React from "react";

function Hide({ children }) {
  const style = {
    display: "none",
  };
  return <span style={style}>{children}</span>;
}

export default Hide;
