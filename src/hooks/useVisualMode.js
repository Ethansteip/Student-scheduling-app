import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

    function transition(newMode, replace = false) {
      if (replace) {
        setMode(newMode);
      } else {
        history.push(newMode);
        setMode(history[history.length - 1]);
      }
    }

    function back() {

      if (history.length <= 1) {
        console.log('sorry, you cant transition that far');
      } else {
        history.pop();
        setMode(history[history.length - 1]);
      }
      
    }

   return { mode, transition, back };
}