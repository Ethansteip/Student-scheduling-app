import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from './DayList';
import Appointment from 'components/Appointment/index.jsx';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers.js/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const setDay = day => setState({...state, day});

   const setDays = (days) => {
     setState(prev => ({...prev, days}));
   }

   const cancelInterview = (id) => {
    console.log(id);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Update the api with a put request
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        console.log("DELETE request made");
        setState({
          ...state,
          appointments
        });
      });
   }

   const bookInterview = (id, interview) => {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Update the api with a put request
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        console.log("PUT request made");
        setState({
          ...state,
          appointments
        });
      });

    

   }

  

   console.log("Interviewers: ", state.interviewers);

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


  // Create Appointment components array.
  const appointmentArray = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("Interview: ", interview);
    return <Appointment
        key={appointment.id}
        {...appointment}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interviewers={dailyInterviewers}
        />;
});

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment time="5pm" key="last"/>
      </section>
    </main>
  );
}
