
import { useState, useEffect } from 'react';

import './Juego.css';

import {TablaPuntuaciones} from '../puntaje/Puntaje';
import { Boton } from '../boton/Boton';


export const Juego = () => {
  const [numeroAleatorio, setNumeroAleatorio] = useState(generarNumeroAleatorio());
  const [puntuacion, setPuntuacion] = useState(10);
  const [mejorPuntuacion, setMejorPuntuacion] = useState(0);
  const [mensaje, setMensaje] = useState('Elige un numero del 1 al 20...');
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  useEffect(() => {
   
    if (puntuacion === 0) {
      setMensaje(`¡Perdiste 💀! El número era ${numeroAleatorio}`);
      document.body.classList.add('bodyRed'); 
    }
   
    if (juegoTerminado) {
      document.body.classList.add('bodyGreen');
    }
  
    return () => {
      document.body.classList.remove('bodyGreen', 'bodyRed');
    };
  }, [puntuacion, juegoTerminado, numeroAleatorio]);

  function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 20) + 1;
  }

  const handlerAdivinanza = (adivinanza) => {
    if (puntuacion === 0 || juegoTerminado) return;

    if (adivinanza === numeroAleatorio) {
      setMensaje(`¡Correcto! El número era ${numeroAleatorio}`);
      if (puntuacion > mejorPuntuacion) {
        setMejorPuntuacion(puntuacion);
      }
      setJuegoTerminado(true);
    } else {
      setMensaje(adivinanza > numeroAleatorio ? '¡Más abajo!' : '¡Más arriba!');
      setPuntuacion(puntuacion - 1);
    }
  };

  const [valorEntrada, setValorEntrada] = useState('');

  const handlerCambio = (e) => {
    setValorEntrada(e.target.value);
  };

  function handlerEnvio(e) {
    e.preventDefault();
    const adivinanza = parseInt(valorEntrada);
    if (isNaN(adivinanza) || adivinanza < 1 || adivinanza > 20) {
      alert('Por favor ingresa un número entre 1 y 20');
    } else {
      handlerAdivinanza(adivinanza);
    }
    setValorEntrada('');
  }

  const reiniciarJuego = () => {
    setNumeroAleatorio(generarNumeroAleatorio());
    setPuntuacion(10);
    setMensaje('Elige un numero del 1 al 20...');
    setJuegoTerminado(false);
    document.body.classList.remove('bodyGreen', 'bodyRed'); 
  }

  const handlerKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlerEnvio(e);
    }
  };

  return (
    <div className="juego">
      <TablaPuntuaciones puntuacion={puntuacion} mejorPuntuacion={mejorPuntuacion} />
      <p className="mensaje">{mensaje}</p>

      <form onSubmit={handlerEnvio} className="input-campo" id='form-juego'>
        <input
          type="number"
          value={valorEntrada}
          onChange={handlerCambio}
          onKeyDown={handlerKeyPress}
          placeholder="Ingresa un número"
          min="1"
          max="20"
        />
      </form>

      <div className="botones">
        <button className="botonPrimario" form="form-juego" type="submit">ADIVINAR</button>
        <Boton texto="REINICIAR" onClick={reiniciarJuego} />
      </div>
    </div>
  );
}
