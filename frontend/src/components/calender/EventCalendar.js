import React, { Component } from 'react';
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from '@daypilot/daypilot-lite-react';

const styles = {
  wrap: {
    display: 'flex',
  },
  left: {
    marginRight: '10px',
  },
  main: {
    flexGrow: '1',
  },
};

class EventCalendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: 'Week',
      durationBarVisible: false,
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.user.authenticated) {
        fetch(`http://localhost:8000/api/user/${this.props.user.user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error('failed to fetch events');
          })
          .then((responseJson) => {
            const events = responseJson.map((event, idx) => {
              return {
                id: idx,
                text: event[0],
                start: event[1],
                end: event[2],
              };
            });
            this.calendar.update({ events });
          });
      }
    }, 500);
  }

  render() {
    const { ...config } = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={'week'}
            showMonths={2}
            skipMonths={3}
            onTimeRangeSelected={(args) => {
              this.calendar.update({
                startDate: args.day,
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            eventMoveHandling="Disabled"
            {...config}
            ref={this.calendarRef}
          />
        </div>
      </div>
    );
  }
}

export default EventCalendar;
