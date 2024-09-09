/* eslint-disable react/prop-types */

import './Boton.css';

export const Boton = ({ texto, onClick }) => {
  return (
    <button className="boton" onClick={onClick}>
      {texto}
    </button>
  );
};


