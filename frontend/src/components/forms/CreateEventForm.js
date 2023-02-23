import React from 'react';
import { Button } from 'react-bootstrap';

export default function CreateEventForm() {
  return (
    <form>
      <label style={{}}>Event Name:   
      <input style={{marginLeft: '1%'}} type="text"/>
      </label>

      <p></p>

      <label style={{marginLeft: '1%'}}>Event Start Time:   
      <input type="text"/>
      </label>

      <p></p>

      <label style={{}}>Event End Time:   
      <input style={{marginLeft: '1%'}} type="text"/>
      </label>

    </form>
  );
}

