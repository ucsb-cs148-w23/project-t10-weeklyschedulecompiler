import DefaultLayout from '../layouts/DefaultLayout';
import {
  Button,
  Container,
  CloseButton,
  Modal,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap';
import AddGroupMembersForm from '../components/forms/AddGroupMembersForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../Constants';
import EventCalendar from '../components/calender/EventCalendar';
import { fetchGroupEvents } from '../lib/fetchEvents';

const CLASSNAME = 'd-flex justify-content-center align-items-center';
let nextId = 0;

export default function GroupDetails({ user }) {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [del_email, setDelete] = useState('');
  const [events, setEvents] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const path = window.location.pathname;
  let groupId = path.substring(path.lastIndexOf('/'));
  let url = config.url + '/api/group' + groupId;

  useEffect(() => {
    async function fetchData() {
      const check = await fetch(config.url + '/check', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
      const checkUser = await check.json();
      if (!checkUser.authenticated) navigate('/');
      const groupResponse = await fetch(url, {
        method: 'GET',
      });
      const groupResponseJson = await groupResponse.json();
      let exists = false;
      for (const member of groupResponseJson.groupMembers) {
        if (member[0] === checkUser.user.id) {
          exists = true;
          break;
        }
      }
      if (!exists) navigate('/groups');
      setMembers(groupResponseJson.groupMembers);
    }
    async function fetchEvents() {
      const groupEvents = await fetchGroupEvents(groupId);
      setEvents(groupEvents);
    }
    fetchData();
    fetchEvents();
  }, [events]);

  return (
    <DefaultLayout
      className={CLASSNAME}
      header={'Group Details'}
      component={
        <Button
          onClick={() => {
            setEdit((prevEdit) => !prevEdit);
          }}
        >
          Edit
        </Button>
      }
    >
      <Row>
        <Col xs={9}>
          <EventCalendar events={events} groups={true} />
        </Col>
        <Col>
          <Container fluid>
            <Row className="mb-3 d-flex justify-content-center align-items-center">
              <Col
                xs={3}
                className="d-flex justify-content-center align-items-center mx-auto"
              >
                <ListGroup>
                  {members.map((member) => (
                    <ListGroup.Item
                      className="overflow-auto d-flex align-items-center"
                      style={{ width: '350px', height: '35px' }}
                    >
                      <Row className="d-flex">
                        <Col className="me-3" style={{ width: '275px' }}>
                          {member[1]}{' '}
                        </Col>
                        <Col
                          className="d-flex justify-content-end"
                          style={{ witdh: '100px' }}
                        >
                          {edit && (
                            <CloseButton
                              onClick={() => {
                                handleShow();
                                setDelete(member);
                              }}
                            ></CloseButton>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col className="d-flex justify-content-center align-items-center mx-auto">
                {edit && <AddGroupMembersForm></AddGroupMembersForm>}
              </Col>
              <Col></Col>
            </Row>
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Remove Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove user</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  setMembers(members.filter((m) => m !== del_email));
                }}
              >
                Delete user
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </DefaultLayout>
  );
}
