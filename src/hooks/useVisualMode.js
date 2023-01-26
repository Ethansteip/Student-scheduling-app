/*
*
* useVisualMode.js - Custom hook to manage the state of the appointment component.
*
*/


import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

    function transition(newMode, replace = false) {
      if (replace) {
        setHistory(prev => {
          return [...prev.slice(0, -1), newMode]
        });
      } else {
        setHistory(prev => {
          return [...prev, newMode]
        });
      }
    }

    function back() {

      if (history.length > 1) {
        setHistory( prev => {
          return [...prev.slice(0, -1)];
        });
      } 
      
    }

   return { mode: history[history.length - 1], transition, back };
}