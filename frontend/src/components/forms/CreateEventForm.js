import React from 'react';
import { Button } from 'react-bootstrap';

export default function CreateEventForm() {
  return (
    <form>
      <label className="me-1" style={{paddingLeft: '15%'}}>Event Name:   
      <input className="me-1" type="text"/>
      </label>

      <p></p>

      <label className="me-1"  style={{paddingLeft: '15%'}}>Event Start Time:   
      <input className="me-1" type="text"/>
      </label>

      <p></p>

      <label className="me-1" style={{paddingLeft: '15%'}}>Event End Time:   
      <input className="me-1"  type="text"/>
      </label>

    </form>
  );
}

