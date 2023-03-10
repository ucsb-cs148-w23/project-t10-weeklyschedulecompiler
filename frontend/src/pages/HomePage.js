import { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventCalendar from '../components/calender/EventCalendar';
import { checkUser } from '../lib/fetchUser';
import CreateEventForm from '../components/forms/CreateEventForm';

const start = 'd-flex justify-content-start align-items-center';
const center = 'd-flex justify-content-center align-items-center';
const end = 'd-flex justify-content-end align-items-center';
const CLASSNAME = 'd-flex justify-content-center align-items-center';

export default function HomePage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    async function localCheckUser() {
      const user = await checkUser();
      if (user?.authenticated === false) navigate('/');
    }
    localCheckUser();
  });

  return (
    <Container>
      <Row>
        <Col className={start} xs={4}>
          <h5
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/groups');
            }}
          >
            Go back
          </h5>
        </Col>
        <Col className={center}>
          <h2 className="layout-header">{'Your Schedule'}</h2>
        </Col>        
        <Col className={end}>
          <CreateEventForm user={user}></CreateEventForm>
        </Col>
      </Row>
      <Row >
        <Col xs={12}>
          <EventCalendar groups={false} user={user} />
        </Col>
      </Row>


    </Container>
    
  );
}
