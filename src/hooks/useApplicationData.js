// Use application data
import { useState, useEffect } from "react";
import axios from 'axios';

// Initial State

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //state.days.spots[]

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

  // Cancel Interview
  const cancelInterview = (id) => {
    //console.log(id);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Update the api with a put request
    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        const newState = {
          ...state,
          appointments
        }
        //console.log("DELETE request made");
        setState(newState);
        calculateSpotsPerDay(newState);
      })
   }

   // Book Interview
  const bookInterview = (id, interview) => {
    //console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Update the api with a put request
    return axios.put(`api/appointments/${id}`, {interview})
      .then(() => {
        const newState = {
          ...state,
          appointments
        }
        //console.log("PUT request made");
        setState(newState);
        calculateSpotsPerDay(newState);
      });
   }

   const calculateSpotsPerDay = (state) => {
    //console.log("State: ", state);
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







      // // You can find the spots in /api/days in each day object

      // // Get the number of spots remaining in each day.
      // const spotsRemaining = state.days;
      // const spotsRemainingPerDayArray = [];
      // // [3, 3, 2, 3...]

      // for (const x in spotsRemaining) {
      //   spotsRemainingPerDayArray.push(x.spots);
      // }

      // // Get the number of interviews that are null
      // const nullInterviews = state.appointments;
      // const nullInterviewsArray = [];
      // // [true, false, true, false...]

      // for (const x in nullInterviews) {
      //   if (x.id.interview === null) {
      //     nullInterviewsArray.push(true);
      //   } else {
      //     nullInterviewsArray.push(false);
      //   }
      // }
      // // initialize array to hold number of spots available per day
      // const 

      // // Knowing that fact that each day has 5 appointment slots, calculate the
      // // number of spots using null interviews.
      // for (let weekDay = 0; weekDay < spotsRemainingPerDayArray.length; weekDay++) {
      //   // [2, 3, 4, ...]
      //   // [true, false, false, true, false, true, true]
      //   //   0     1      2       3      4     5     6

      //   // for loop where we loop through the [true, false, true..]
      //   for (let index = 0; index < 5; index++) {

      //   }
      // }



      // You can calculate the spots for days by referenceing the number of appointments
      // that don't have an interview booked.

      // Spots values 
   }

   return { state, setDay, setDays, cancelInterview, bookInterview }

  }

  
   

