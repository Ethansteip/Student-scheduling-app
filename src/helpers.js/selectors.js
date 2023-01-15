const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

export function getAppointmentsForDay(state, day) {

  if (state.days.length <= 0) {
    return [];
  }

  const daysArray = state.days.filter(days => days.name === day)
  
  if (daysArray.length === 0) {
    return [];
  }
  //console.log(daysArray[0].appointments.length);
  const daysArrayAppointmentsId = daysArray[0].appointments;

  // const appointments = Object.values(state.appointments);
  const array = [];

  const appointmentsArray = daysArrayAppointmentsId.map(id => {
    for (const x of Object.values(state.appointments)) {
      if (x.id == id) {
        array.push(x);
      }
    }
  })
  
  return array;

}

getAppointmentsForDay(state, "Monday");
