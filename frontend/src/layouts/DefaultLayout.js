import { Col, Container, Row } from 'react-bootstrap';
import '../style/DefaultLayout.css';

const start = 'd-flex justify-content-start align-items-center';
const center = 'd-flex justify-content-center align-items-center';
const end = 'd-flex justify-content-end align-items-center';

export default function DefaultLayout({ children, header, component }) {
  return (
    <>
      <Container>
        <Row>
          <Col className={start} xs={4}>
            <h5
              style={{ cursor: 'pointer' }}
              onClick={() => {
                console.log('Goes back a page');
              }}
            >
              Go back
            </h5>
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
