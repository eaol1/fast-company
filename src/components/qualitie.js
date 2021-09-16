import React from 'react';

const Qualitie = ({quality}) => {
  return (
    <span 
      key={quality._id}
      className={`badge bg-${quality.color} me-2`}
    >
      {quality.name}
    </span>
  );
}

export default Qualitie;
