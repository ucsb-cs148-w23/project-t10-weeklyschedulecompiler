import React from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { config } from '../../Constants';


export default function CreateEventForm({user}) {
  const navigate = useNavigate();
  const [event, setEvent] = useState('')
  const [startTime, setStartTime] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createEvent = (e) => {
    e.preventDefault()
    const body = { eventName: event, startTime: startTime, endTime: endTime }
    let url = config.url + '/api/user' + user.user.googleId 

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('failed to create event');
    }).then((responseJson) => {
      console.log(responseJson)
      window.location.reload(false);
    })
  }

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Select Free Time
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Free Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createEvent}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="start-date">
                  <Form.Label>Start Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="end-date">
                  <Form.Label>End Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row style={{ marginTop: '10px' }}>
              <Col md={6}>
                <Form.Group controlId="startTime">
                  <Form.Label>Start Time:</Form.Label>
                  <div className="d-flex">
                    <div className="flex-fill">
                      <Form.Control
                        type="time"
                        step="900"
                        value={startTime}
                        onChange={handleStartTimeChange}
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="endTime">
                  <Form.Label>End Time:</Form.Label>
                  <div className="d-flex">
                    <div className="flex-fill">
                      <Form.Control
                        type="time"
                        value={endTime}
                        onChange={handleEndTimeChange}
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="duration">
                  <Form.Label>Duration:</Form.Label>
                  <Form.Control
                    type="range"
                    min="15"
                    max="600"
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
    // <Form onSubmit={createEvent}>
    //   <div>
    //     <label className="me-1" style={{paddingLeft: '17%'}}>Event Name:   
    //       <input 
    //         className="me-1" 
    //         type="text"
    //         onChange={(e) => setEvent(e.target.value)}
    //         value={event}
    //         required
    //       />
    //     </label>

    //     <p></p>

    //     <label className="me-1"  style={{paddingLeft: '17%'}}>Event Start Time:   
    //       <input 
    //         className="me-1" 
    //         type="text"
    //         onChange={(e) => setStartTime(e.target.value)}
    //         value={startTime}
    //         required
    //       />
    //     </label>

    //     <p></p>

    //     <label className="me-1" style={{paddingLeft: '17%'}}>Event End Time:   
    //       <input 
    //         className="me-1"  
    //         type="text"
    //         onChange={(e) => setEndTime(e.target.value)}
    //         value={endTime}
    //         required
    //       />
    //     </label>
    //   </div>

    //   <Button className="d-flex justify-content-center align-items-center mx-auto" style={{marginTop: '10%'}} type="submit">Submit</Button>

    // </Form>
  );
}

