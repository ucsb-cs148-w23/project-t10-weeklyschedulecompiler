import { ListGroup, Row, Col, CloseButton } from 'react-bootstrap';
import {
  hideGroupMemberEvents,
  updateGroupMemberEvents,
} from '../../lib/fetchEvents';
import React from 'react';

export default function MemberList(props) {
  const members = props.members;
  return (
    <ListGroup>
      {members.map((member) => (
        <ListGroup.Item
          className="overflow-auto d-flex align-items-center"
          style={{ width: '700px', height: '35px' }}
        >
          <Row className="d-flex">
            <Col className="me-3" style={{ width: '275px' }}>
              {member[1]}{' '}
            </Col>
            <Col
              className="d-flex justify-content-center"
              style={{ witdh: '100px' }}
            >
              <p
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  right: '200px',
                }}
                onClick={() => {
                  console.log(props.groupId);
                  console.log(member[0]);
                  hideGroupMemberEvents(props.groupId, member[0]);
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 1500);
                }}
              >
                Hide
              </p>
            </Col>
            <Col>
              <p
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  right: '50px',
                }}
                onClick={() => {
                  updateGroupMemberEvents(props.groupId, member[0]);
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 1500);
                }}
              >
                Refresh
              </p>
              {props.admin && props.edit && (
                <CloseButton
                  onClick={() => {
                    props.handleShow();
                    props.setDelUser({
                      name: member[1],
                      email: member[2],
                      id: member[0],
                    });
                  }}
                ></CloseButton>
              )}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
