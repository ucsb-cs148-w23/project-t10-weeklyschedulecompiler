import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/GroupsPage.css';
import React from 'react';

const start = 'd-flex justify-content-start align-items-center';
const center = 'd-flex justify-content-center align-items-center';
const end = 'd-flex justify-content-end align-items-center';

export default function DefaultLayout({ children, header, component }) {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row>
          <Col className={start} xs={4}>
            <div className='backbutton'>
            <h5
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/groups');
              }}
            >
              Go back
            </h5>
            </div>
          </Col>
          <Col className={center}>
            <h1 className="layout-header">{header}</h1>
          </Col>
          <Col xs={4} className={end}>
            {component}
          </Col>
        </Row>
      </Container>
      {children}
    </>
  );
}