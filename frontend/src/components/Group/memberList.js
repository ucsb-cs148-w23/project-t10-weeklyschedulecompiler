import { ListGroup, Row, Col, CloseButton } from 'react-bootstrap';
import { updateGroupMemberEvents } from '../../lib/fetchEvents';
import { useEffect, React } from 'react';

export default function MemberList(props) {
  const members = props.members;

  return (
    <ListGroup>
      {members.map((member) => (
        <ListGroup.Item
          className="overflow-auto d-flex align-items-center"
          style={{ width: '400px', height: '35px' }}
        >
          <Row className="d-flex">
            <Col className="me-3" style={{ width: '275px' }}>
              {member[1]}{' '}
            </Col>
            <Col
              className="d-flex justify-content-end"
              style={{ witdh: '50px' }}
            >
              {props.hideId.indexOf(member[0]) > -1 ? (
                <p
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '150px',
                  }}
                  onClick={() => {
                    props.setHideId((Id) =>
                      Id.filter((Id) => Id !== member[0])
                    );
                  }}
                >
                  Show
                </p>
              ) : (
                <p
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '150px',
                  }}
                  onClick={() => {
                    props.setHideId([...props.hideId, member[0]]);
                  }}
                >
                  Hide
                </p>
              )}
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
                  }, 1000);
                }}
              >
                Refresh
              </p>
              {props.admin && props.edit && (
                <CloseButton
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '10px',
                  }}
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
