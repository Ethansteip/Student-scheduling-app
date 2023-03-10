import React from 'react';
import DayListItem from './DayListItem.jsx';

export default function DayLiist(props) {

  const dayListItems = props.days.map((day) => {
        return <DayListItem
            key={day.id}
            name={day.name} 
            spots={day.spots} 
            selected={day.name === props.value}
            setDay={props.onChange}
        />;
  });

  return (
    <ul>
      {dayListItems}
    </ul>
  );
}