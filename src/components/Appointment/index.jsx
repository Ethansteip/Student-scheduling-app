import React from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
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
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function deleteInterview() {

    transition(DELETING, true);

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(function (error) {
      if (error.response) {
        transition(ERROR_DELETE, true);
      }
    });
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(function (error) {
      if (error.response) {
        transition(ERROR_SAVE, true);
      }
    });
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
      {mode === ERROR_DELETE && <Error onClose={() => transition(SHOW)} message={"Error while trying to delete appointment."}/>}
      {mode === ERROR_SAVE && <Error onClose={() => transition(EDIT)} message={"Error while trying to save appointment."}/>}
    </article>
  );
}