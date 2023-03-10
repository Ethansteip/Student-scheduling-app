import React from "react";
import "components/Application.scss";
import DayList from './DayList.jsx';
import Appointment from 'components/Appointment/index.jsx';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers.js/selectors";
import useApplicationData from "hooks/useApplicationData.js"

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);


  // Create Appointment components array.
  const appointmentArray = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

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
