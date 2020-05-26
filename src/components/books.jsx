import React from 'react';

function Books(props) {
  return (
    <div
        style={{
          display: 'grid',
          margin: '0 auto',
          maxWidth: '100%',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          columnGap: '1em',
          rowGap: '1em',
        }}>
      {props.children}
    </div>
  );
}

export default Books
