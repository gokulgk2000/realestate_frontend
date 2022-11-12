import React, { useState } from "react";

const Example=()=> {
  const [name, setName] = useState(" ");

  const handleInput = event => {
    setName(event.target.value);
  };

  const logValue = () => {
    console.log(name);
  };

  return (
    <div>
      <input onChange={handleInput} placeholder="Enter "/>
      <button onClick={logValue}>Submit</button>
    </div>
  );
}
export default Example