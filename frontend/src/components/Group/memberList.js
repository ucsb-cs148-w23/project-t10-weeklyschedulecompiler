import { ListGroup, Row, Col, CloseButton } from 'react-bootstrap';

export default function MemberList(props) {
  const members = props.members;
  return (
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
            ></Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
