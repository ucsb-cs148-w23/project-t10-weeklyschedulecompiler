import React from 'react';
import { Button } from 'react-bootstrap';

export default function HideEvents(props) {
  return <Button onClick={console.log(props.events)}>Hide</Button>;
}
