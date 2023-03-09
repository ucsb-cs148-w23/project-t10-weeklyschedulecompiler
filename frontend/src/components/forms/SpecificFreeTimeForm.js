import React, { useState } from 'react';
import { Form, Col, Button, Row, Modal } from 'react-bootstrap';
import { writeEvents } from '../../lib/fetchEvents';

export default function SpecificFreeTimeForm({
  time,
  userId,
  eventsUrl,
  hideId,
  eventName,
  eventDescription,
  selectedDuration,
}) {
  const [duration, setDuration] = useState(selectedDuration);
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  function handleDurationChange(event) {
    setDuration(event.target.value);
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShow();
          console.log(time);
        }}
      >
        Select
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Free Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <p>Event Name:</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p>{eventName}</p>
              </Col>
            </Row>
            <Row style={{ marginTop: '5px' }}>
              <Col style={{ width: '488px' }} md={6}>
                <p>Event Description:</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p>{eventDescription}</p>
              </Col>
            </Row>
            <Row style={{ marginTop: '1px' }}>
              <Col md={6}>
                <p>Start Time:</p>
              </Col>
              <Col md={6}>
                <p>End Time:</p>
              </Col>
            </Row>

            <Row style={{ marginTop: '1px' }}>
              <Col md={6}>
                <p>{time.start}</p>
              </Col>
              <Col md={6}>
                <p>{time.end}</p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="duration">
                  <Form.Label>Event Duration:</Form.Label>
                  <Form.Control
                    type="range"
                    min="0"
                    max={time.eventDuration}
                    step="15"
                    value={duration}
                    onChange={handleDurationChange}
                  />
                  <p className="text-center">
                    {Math.floor(duration / 60)} hour
                    {Math.floor(duration / 60) !== 1 ? 's' : ''} {duration % 60}{' '}
                    minute
                    {duration % 60 !== 1 ? 's' : ''}
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center align-items-center">
                <div className="d-grid gap-2">
                  <Button
                    className="justify-content-center"
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      // setEvents([
                      //   ...events,
                      //   {
                      //     id: events.length,
                      //     text: time.text,
                      //     start: time.start,
                      //     end: time.end,
                      //   },
                      // ]);
                      writeEvents(
                        eventsUrl,
                        time,
                        userId.user.id,
                        hideId,
                        eventName,
                        eventDescription
                      );
                      setTimeout(() => {
                        window.location.reload(false);
                      }, 1000);
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
