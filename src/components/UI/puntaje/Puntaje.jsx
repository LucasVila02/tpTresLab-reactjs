/* eslint-disable react/prop-types */

import './puntaje.css';

export const TablaPuntuaciones = ({ puntuacion, mejorPuntuacion }) => {
  return (
    <div className="tabla-puntuaciones">
      <p>Puntuación Actual: {puntuacion}</p>
      <p>Mejor Puntuación: {mejorPuntuacion}</p>
    </div>
  );
};







