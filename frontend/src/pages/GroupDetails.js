import DefaultLayout from '../layouts/DefaultLayout';
import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const CLASSNAME = 'd-flex justify-content-center align-items-center';

let nextId = 0;

export default function GroupDetails() {
  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);

  return (
    <DefaultLayout className={CLASSNAME}>
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <Col>Group Details</Col>
          <Col>
            <Button
              onClick={() => {
                setEdit((prevEdit) => !prevEdit);
              }}
            >
              Edit
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={9}>
            <ul>
              {members.map((member) => (
                <li key={member.id}>
                  {member.name}{' '}
                  {edit && (
                    <Button
                      onClick={() => {
                        setMembers(members.filter((m) => m.id !== member.id));
                        nextId -= 1;
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            {edit && (
              <Button
                onClick={() => {
                  setMembers([
                    ...members,
                    { id: nextId++, name: 'new member' },
                  ]);
                }}
              >
                Add
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}
