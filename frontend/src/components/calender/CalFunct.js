import React, { useState, useRef, useEffect } from 'react';
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from '@daypilot/daypilot-lite-react';

const styles = {
  wrap: {
    marginTop: '2vh',
    display: 'flex',
  },
  left: {
    marginRight: '10px',
  },
  main: {
    flexGrow: '1',
  },
};

const CalFunct = (props) => {
  const [viewType, setViewType] = useState('Week');
  const [durationBarVisible, setDurationBarVisible] = useState(false);
  const calendarRef = useRef(null);

  const getUpdatedEvents = () => {
    fetch('http://localhost:8000/api/user', {
      method: 'PATCH',
      body: JSON.stringify(props.user.user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('failed to fetch events');
      })
      .then((responseJson) => {
        console.log(responseJson);
        const events = responseJson?.events.map((event, idx) => {
          return {
            id: idx,
            text: event[0],
            start: event[1],
            end: event[2],
          };
        });
        calendarRef.current.control.update({ events });
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (props.user.authenticated) {
        getUpdatedEvents();
      }
    }, 500);
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={'week'}
          showMonths={2}
          skipMonths={3}
          onTimeRangeSelected={(args) => {
            calendarRef.current.control.update({
              startDate: args.day,
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          eventMoveHandling="Disabled"
          viewType={viewType}
          durationBarVisible={durationBarVisible}
          ref={calendarRef}
        />
      </div>
    </div>
  );
};

export default CalFunct;
