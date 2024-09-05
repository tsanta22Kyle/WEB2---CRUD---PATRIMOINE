import { useEffect, useRef, useState } from "react";

function AutoIncrementer({ maxValue, incrementBy, delay }) {
    const [count, setCount] = useState(0);

    const countRef = useRef(count);
  
    useEffect(() => {
      countRef.current = count;
    }, [count]);
  
    useEffect(() => {
      const increment = () => {
        setCount((prevCount) => {
          if (prevCount + incrementBy <= maxValue) {
            return prevCount + incrementBy;
          } else {
            return maxValue; // Arrêter l'incrémentation à maxValue
          }
        });
      };
  
      const intervalId = setInterval(increment, delay);
  
      // Nettoyage de l'intervalle pour éviter les fuites de mémoire
      return () => clearInterval(intervalId);
    }, [incrementBy, delay, maxValue]);
  
    return (
      <div>
        <h1> {countRef.current}</h1>
      </div>
    );
  }

  export default AutoIncrementer;