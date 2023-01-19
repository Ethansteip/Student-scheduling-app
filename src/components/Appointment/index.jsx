import React from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import axios from 'axios';

const EMPTY = "Empty";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function deleteInterview() {

    transition(DELETING);

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => console.log(err));
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log(err));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === SAVING && <Status message={"Saving Appointment"}/>}
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleteInterview}/>}
      {mode === EDIT && <Form onSave={save} student={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onCancel={() => back()} />}
    </article>
  );
}