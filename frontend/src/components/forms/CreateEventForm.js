import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { config } from '../../Constants';


export default function CreateEventForm({user}) {
  const navigate = useNavigate();
  const [event, setEvent] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

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
    <Form onSubmit={createEvent}>
      <div>
        <label className="me-1" style={{paddingLeft: '17%'}}>Event Name:   
          <input 
            className="me-1" 
            type="text"
            onChange={(e) => setEvent(e.target.value)}
            value={event}
            required
          />
        </label>

        <p></p>

        <label className="me-1"  style={{paddingLeft: '17%'}}>Event Start Time:   
          <input 
            className="me-1" 
            type="text"
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
            required
          />
        </label>

        <p></p>

        <label className="me-1" style={{paddingLeft: '17%'}}>Event End Time:   
          <input 
            className="me-1"  
            type="text"
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
            required
          />
        </label>
      </div>

      <Button className="d-flex justify-content-center align-items-center mx-auto" style={{marginTop: '10%'}} type="submit">Submit</Button>

    </Form>
  );
}

