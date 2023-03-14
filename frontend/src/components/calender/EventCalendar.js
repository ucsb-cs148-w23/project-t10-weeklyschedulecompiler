/* istanbul ignore file */

import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from '@daypilot/daypilot-lite-react';
import { fetchUserEvents } from '../../lib/fetchEvents';
import '../../style/Cal.css';
import { deleteEvents } from '../../lib/fetchEvents';
const styles = {
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
      show: false,
      eventId: '',
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    setTimeout(async () => {
      if (this.props.user?.authenticated) {
        const events = await fetchUserEvents(this.props.user.user);
        this.calendar.update({ events });
      }
      if (this.props.groups) {
        const events = this.props.events;
        this.calendar.update({ events });
      }
    }, 500);
  }

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
    window.location.reload(false);
  };

  handleDelete = () => {
    console.log(this.props.user);
    deleteEvents(this.props.user, this.state.eventId, this.props.eventsUrl);
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginTop: this.props.groups ? null : '2vh',
          marginLeft: !this.props.groups ? null : '2vw',
          marginLeft: '2vw',
          marginRight: '2vw',
        }}
      >
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={'week'}
            showMonths={2}
            skipMonths={2}
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
            eventResizeHandling="Disabled"
            eventDeleteHandling="Update"
            onEventDelete={(args) => {
              this.setState({ eventId: args.e.id() });
              this.handleShow();
            }}
            durationBarVisible={true}
            viewType="Week"
            ref={this.calendarRef}
          />
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Are you sure you want to delete this event?
              </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="danger" onClick={this.handleDelete}>
                Delete
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          ;
        </div>
      </div>
    );
  }
}

export default EventCalendar;
