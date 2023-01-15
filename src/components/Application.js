import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from './DayList';
import Appointment from 'components/Appointment/index.jsx';

export default function Application(props) {

  const [days, setDays] = useState([]);

  useEffect(() => {
    const dayUrl = `http://localhost:8001/api/days`;
    axios.get(dayUrl).then(response => {
      console.log(response.data);
      //setDays([...response.data.results]);
    }, [])
  });

  const appointmentArray = Object.values(days).map((day) => {
    return <Appointment
        key={day.id}
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
          days={days}
          value={days}
          onChange={setDays}
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
