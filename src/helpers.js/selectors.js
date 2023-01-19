

export function getAppointmentsForDay(state, day) {
  
  // console.log("State: ", state);
  // console.log("Day: ", day);
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

export function getInterviewersForDay(state, day) {
  

  const daysArray = state.days.filter(days => days.name === day)
  
  if (daysArray.length === 0) {
    return [];
  }
  //console.log(daysArray[0].appointments.length);
  const interviewersIds = daysArray[0].interviewers;

  // const appointments = Object.values(state.appointments);
  const listOfInterviewers = [];

  interviewersIds.forEach(id => {
    for (const x of Object.values(state.interviewers)) {
      if (x.id == id) {
        listOfInterviewers.push(x);
      }
    }
  })
  
  return listOfInterviewers;

}

export function getInterview(state, interview) {
  
  // If there is no interview, return null
  if (!interview) return null;

  // Get interviewer ID from appointment
  const interviewerId = interview.interviewer;

  // Grab the interviewer that matches the appointments interviewer

  const interviewerObj = state.interviewers[interviewerId];

  const result = {
    student: interview.student,
    interviewer: interviewerObj,
  }
  console.log("getInterview results: ", result);
  return result;
}
