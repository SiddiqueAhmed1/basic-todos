import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  // increment
  const increament = () => {
    setCounter((prevState) => prevState + 1);
  };
  // decrement
  const decrement = () => {
    setCounter((prevState) => prevState - 1);
  };
  // reset
  const reset = () => {
    setCounter(0);
  };

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={increament}>Increament</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default Counter;
