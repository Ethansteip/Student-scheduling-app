/*
*
* selectors.js - a group of helper functions to retrieve
* appointemnts, interviewers and interviews.
*
*/

export function getAppointmentsForDay(state, day) {
  
  if (state.days.length <= 0) {
    return [];
  }

  const daysArray = state.days.filter(days => days.name === day)
  
  if (daysArray.length === 0) {
    return [];
  }

  const daysArrayAppointmentsId = daysArray[0].appointments;

  //const array = [];

  const appointmentsArray = daysArrayAppointmentsId.map(id => {
    for (const x of Object.values(state.appointments)) {
      if (x.id === parseInt(id, 10)) {
        return x;
        //array.push(x);
      }
    }
    return id;
  })
  
  return appointmentsArray;
}

export function getInterviewersForDay(state, day) {
  
  const daysArray = state.days.filter(days => days.name === day)
  
  if (daysArray.length === 0) {
    return [];
  }

  const interviewersIds = daysArray[0].interviewers;

  const listOfInterviewers = [];

  interviewersIds.forEach(id => {
    for (const x of Object.values(state.interviewers)) {
      if (x.id === parseInt(id, 10)) {
        listOfInterviewers.push(x);
      }
    }
  })
  
  return listOfInterviewers;
}

export function getInterview(state, interview) {
  
  if (!interview) return null;

  const interviewerId = interview.interviewer;

  const interviewerObj = state.interviewers[interviewerId];

  const result = {
    student: interview.student,
    interviewer: interviewerObj,
  }

  return result;
}
