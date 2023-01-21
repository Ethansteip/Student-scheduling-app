/*
*
* useApplicationData.js - Custom hook to manage state for the application.
*
*/

import { useState, useEffect } from "react";
import axios from 'axios';


// Initialize state
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {
      const [daysData, appointmentData, interviewersData] = all;
      setState({
        ...state,
        days: daysData.data,
        appointments: appointmentData.data,
        interviewers: interviewersData.data,
      })
    });
  }, []);

  const setDay = day => setState({...state, day});

  const setDays = (days) => {
    setState(prev => ({...prev, days}));
  }

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        const newState = {
          ...state,
          appointments
        }

        setState(newState);
        calculateSpotsPerDay(newState);
      })
   }

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, {interview})
      .then(() => {
        const newState = {
          ...state,
          appointments
        }
        setState(newState);
        calculateSpotsPerDay(newState);
      });
   }

   const calculateSpotsPerDay = (state) => {

    const updatedDays = state.days;

    const updatedDaysArray = updatedDays.map((day) => {

      let spotsForAday = 0;

      day.appointments.map((appointmentId) => {
        const appointment = state.appointments[appointmentId];

        if (appointment.interview === null) {
          spotsForAday++;
        }        
      })

      day.spots = spotsForAday;
      return day;

    })

    setState({
      ...state,
      days: updatedDaysArray,
    });
   }

   return { state, setDay, setDays, cancelInterview, bookInterview }

  }

  
   

