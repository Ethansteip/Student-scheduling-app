import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from './DayList';
import Appointment from 'components/Appointment/index.jsx';
import { getAppointmentsForDay, getInterview } from "helpers.js/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({...state, day});

   const setDays = (days) => {
     setState(prev => ({...prev, days}));
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


  //console.log("State: ", state);

  const appointmentArray = dailyAppointments.map((day) => {
    const interview = getInterview(state, day.interview);

    return <Appointment
        key={day.id}
        id={day.id}
        time={day.time}
        interview={interview}

        {...day}
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
