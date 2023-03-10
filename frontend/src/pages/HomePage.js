import { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventCalendar from '../components/calender/EventCalendar';
import { checkUser } from '../lib/fetchUser';
<<<<<<< HEAD
import CreateEventForm from '../components/forms/CreateEventForm';

const start = 'd-flex justify-content-start align-items-center';
const center = 'd-flex justify-content-center align-items-center';
const end = 'd-flex justify-content-end align-items-center';
const CLASSNAME = 'd-flex justify-content-center align-items-center';
=======
import DefaultLayout from "../layouts/DefaultLayout"
>>>>>>> main

export default function HomePage({ user }) {
  const navigate = useNavigate();
  const welcomeMessage = "Welcome, " + user?.user?.displayName+"!";
  useEffect(() => {
    async function localCheckUser() {
      const user = await checkUser();
      if (user?.authenticated === false) navigate('/');
    }
    localCheckUser();
  });

  return (
    <><DefaultLayout header={welcomeMessage}>
      <EventCalendar groups={false} user={user} style={{ marginLeft: '1px' }} />
    </DefaultLayout><div className='background_padding'></div></>
  );
}