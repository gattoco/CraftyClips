import { Show, createSignal, onMount } from "solid-js";
import { useState } from "../store";
import Teams from "./Teams";

const App = () => {
  const { state, setState } = useState();

  return (
  <div>
    Home dashboard something soemthing<br />
    <Teams />
    </div>
  );
};

export default App;
