/*
*
* useVisualMode.js - Custom hook to manage the state of the appointment component.
*
*/


import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);

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
      } else {
        history.pop();
        setMode(history[history.length - 1]);
      }
      
    }

   return { mode, transition, back };
}